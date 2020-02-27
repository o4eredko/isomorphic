import React, { useState, useEffect } from "react";

import { Icon, Typography, Popconfirm, Table } from "antd";
import LayoutWrapper from "src/utility/layoutWrapper";
import LayoutContent from "src/utility/layoutContent";
import PageHeader from "src/utility/pageHeader";
import Progress from "src/ui/Progress";
// import Box from "src/utility/box";
import strCapitalize from "src/lib/helpers/stringCapitalize";
import GenerationForm from "src/FeedMaker/GenerationForm";
import socketConnect from "./socketio";

import Hamster from "src/assets/images/hamster.gif";
import config from "src/FeedMaker/config";
import TableWrapper from "src/ui/Table";


const { Title } = Typography;
const { Column } = Table;


export default () => {
  const [io, setIo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(PageHeader);
    let isMounted = true;
    socketConnect(config.apiUrl).then(io => {
      io.on("connect", data => {
        if (!data) return;
        const { gen_types, generations } = data;
        if (isMounted) {
          setGenTypes(gen_types);
          setData(generations);
          setLoading(false)
        }
      });
      io.on("update", generations => setData(generations));
      setIo(io);
    });
    return () => isMounted = false;
  }, []);

  return (
    <LayoutWrapper>
      <PageHeader>Feed Maker</PageHeader>
      <LayoutContent>
        Generate new feed
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
              new Date(generation_date).toLocaleString().replace(",", "")
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
      </LayoutContent>
    </LayoutWrapper>
  );
}
