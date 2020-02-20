import React, { useState, useEffect } from "react";
import { Icon, Typography }           from "antd";
import LayoutWrapper                  from "@iso/components/utility/layoutWrapper.js";
import PageHeader                     from '@iso/components/utility/pageHeader';
import TableWrapper                   from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                          from "@iso/components/uielements/table";
import Progress                       from "@iso/components/uielements/progress";
import Box                            from "@iso/components/utility/box";
import strCapitalize                  from "@iso/lib/stringCapitalize";
import Popconfirm                     from '@iso/components/Feedback/Popconfirm';
import GenerationForm                 from "@iso/components/FeedMaker/GenerationForm";
import config                         from "@iso/config/feedmaker.config";
import Hamster                        from "@iso/assets/images/hamster.gif"
import socketConnect                  from "./socketio";

const { Title } = Typography;
const { Column } = Table;


export default () => {
  const [io, setIo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    socketConnect(config.apiUrl).then(io => {
      io.on("connect", data => {
        if (!data) return;
        const { gen_types, generations } = data;
        setGenTypes(gen_types);
        setData(generations);
        setLoading(false)
      });
      io.on("update", generations => setData(generations));
      setIo(io);
    });
  }, []);

  return (
    <LayoutWrapper>
      <PageHeader>Feed Maker</PageHeader>
      <Box title="Generate new feed">
        <GenerationForm genTypes={ genTypes } />
        <TableWrapper
          pagination={ false }
          loading={ loading }
          dataSource={ data }
          className="isoSimpleTable"
        >
          <Column
            title="Generation Type"
            dataIndex="key"
            width={ 30 }
            render={ key => strCapitalize(key) }
          />
          <Column
            title="Generation Date"
            dataIndex="generation_date"
            width={ 40 }
            render={ generation_date =>
              new Date(generation_date).toLocaleString().replace(',', '')
            }
          />
          <Column
            title="Fetching from DB"
            dataIndex="fetching"
            align="center"
            render={ fetching => fetching ?
              <img src={ Hamster } alt="#" style={ { width: 40 } } /> :
              <Progress type="circle" percent={ 100 } width={ 40 } />
            }
          />
          <Column
            title="Processing records"
            dataIndex="processing"
            render={ processing =>
              <Progress
                status={ processing === 100 ? "success" : "active" }
                percent={ processing }
              /> }
          />
          <Column
            align="center"
            title="Files Amount"
            dataIndex="files_created"
            render={ files_created => <Title level={ 4 } code={ true }>{ files_created }</Title> }
          />
          <Column
            align="center"
            dataIndex="is_done"
            render={ (is_done, record) => is_done ? (
              <Popconfirm
                placement="left"
                title="Are you sure?"
                okText="Do it!"
                cancelText="No"
                onConfirm={ () => io.emit("delete_generation", record.key) }
              >
                <Icon style={ { fontSize: 25 } } type="close-square" />
              </Popconfirm>
            ) : <img src={ Hamster } alt="#" width={ 40 } /> }
          />
        </TableWrapper>
      </Box>
    </LayoutWrapper>
  );
}
