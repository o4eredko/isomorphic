import React, { useState, useEffect } from "react";
import { Icon, Typography }           from "antd";
import LayoutWrapper                  from "@iso/components/utility/layoutWrapper.js";
import PageHeader                     from '@iso/components/utility/pageHeader';
import TableWrapper                   from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                          from "@iso/components/uielements/table";
import Progress                       from "@iso/components/uielements/progress";
import Box                            from "@iso/components/utility/box";
import strCapitalize                  from "@iso/lib/stringCapitalize";
import SuperFetch                     from "@iso/lib/helpers/superFetch";
import socketIOClient                 from "socket.io-client";
import GenerationForm                 from "@iso/components/FeedMaker/GenerationForm";
import config                         from "@iso/config/feedmaker.config";
import Hamster                        from "@iso/assets/images/hamster.gif"

const { Title } = Typography;
const { Column } = Table;


export default () => {
  const [io, setIo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const io = socketIOClient(config.apiUrl);
    io.on("connect", generations => setData(generations), setLoading(false));
    io.on("update", generations => setData(generations));
    setIo(io);

    SuperFetch.get(`${ config.apiUrl }/gentypes`, true)
      .then(response => setGenTypes(response.data));
    setTimeout(setLoading, 1000, false)
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
              <Progress type="circle" width={ 30 } percent={ 100 } />
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
            title="Files Uploaded/Created"
            dataIndex="uploading"
            render={ ({ created, uploaded }) =>
              <Title level={ 4 } code={ true }>
                { `${ uploaded }/${ created }` }
              </Title>
            }
          />
          <Column render={ record =>
            <Icon
              style={ { fontSize: 20 } }
              spin={ true }
              type="delete"
              onClick={ () => io.emit("delete_generation", { generation_type: record.key }) }
            />
          } />
        </TableWrapper>
      </Box>
    </LayoutWrapper>
  );
}
