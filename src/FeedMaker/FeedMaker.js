import React, { useState, useEffect } from "react";

import { Icon, Typography, Popconfirm } from "antd";
import Table from "src/ui/Table";
import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Progress from "src/ui/Progress";
import strCapitalize from "src/lib/helpers/stringCapitalize";
import GenerationForm from "src/ui/Form/GenerationForm";

import socketConnect from "./socketio";
import Hamster from "src/assets/images/hamster.gif";
import config from "src/FeedMaker/config";
import SuperFetch from "src/lib/helpers/superFetch";
import isErrorStatus from "src/lib/helpers/isErrorStatus";
import { message } from "antd";


const { Title } = Typography;


export default () => {
  const [io, setIo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  async function onSubmit(value) {
    const url = `${ config.apiUrl }/${ genTypes[value] }`;
    const { data, status } = await SuperFetch.post(url, true);
    if (isErrorStatus(status))
      message.error(data.detail || "Something went wrong.");
  }

  useEffect(() => {
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
      <Box title="Generate new feed">
        <GenerationForm onSubmit={ onSubmit } genTypes={ genTypes } />
        <Table
          pagination={ false }
          loading={ loading }
          dataSource={ data }
          className="isoSimpleTable"
        >
          <Table.Column
            title="Generation Type"
            dataIndex="key"
            width={ 30 }
            render={ key => strCapitalize(key) }
          />
          <Table.Column
            title="Generation Date"
            dataIndex="generation_date"
            width={ 40 }
            render={ generation_date =>
              new Date(generation_date).toLocaleString().replace(",", "")
            }
          />
          <Table.Column
            title="Fetching from DB"
            dataIndex="fetching"
            align="center"
            render={ fetching => fetching ?
              <img src={ Hamster } alt="#" style={ { width: 40 } } /> :
              <Progress type="circle" percent={ 100 } width={ 40 } />
            }
          />
          <Table.Column
            title="Processing records"
            dataIndex="processing"
            render={ processing =>
              <Progress
                strokeColor={{
                  from: "#108ee9",
                  to: "#87d068"
                }}
                status={ processing === 100 ? "success" : "active" }
                percent={ processing }
              /> }
          />
          <Table.Column
            align="center"
            title="Files Amount"
            dataIndex="files_created"
            render={ files_created => <Title level={ 4 } code={ true }>{ files_created }</Title> }
          />
          <Table.Column
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
        </Table>
      </Box>
    </LayoutWrapper>
  );
}
