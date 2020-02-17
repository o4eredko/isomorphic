import React, { useState, useEffect } from "react";
import LayoutWrapper                  from "@iso/components/utility/layoutWrapper.js";
import PageHeader                     from '@iso/components/utility/pageHeader';
import Select, { SelectOption }       from "@iso/components/uielements/select";
import Button                         from "@iso/components/uielements/button";
import SuperFetch                     from "@iso/lib/helpers/superFetch";
import { Icon }                       from "antd";
import Form                           from "@iso/components/uielements/form";
import TableWrapper                   from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                          from "@iso/components/uielements/table";
import Progress                       from "@iso/components/uielements/progress";
import Box                            from "@iso/components/utility/box";
import Spin                           from "@iso/components/uielements/spin";
import strCapitalize                  from "@iso/lib/stringCapitalize";
import socketIOClient                 from "socket.io-client";


const { Column } = Table;

const margin = {
  margin: '8px 8px',
};

export default () => {
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const io = socketIOClient('http://localhost:8080');
    io.on("connect", data => console.log(data));
    SuperFetch.get("http://localhost:8080/gentypes", true)
      .then(response => setGenTypes(response.data));
    setData([
      {
        key: "google_ru",
        gentype: "google_ru",
        fetching: true,
        processing: 63,
        uploading: 24,
      },
      {
        key: "yandex_ua",
        gentype: "yandex_ua",
        fetching: false,
        processing: 29,
        uploading: 12,
      },
    ]);
  }, []);

  function handleFormSubmit(e) {
    // setGenerations(e.target)
  }

  return (
    <LayoutWrapper>
      <PageHeader>Feed Maker</PageHeader>
      <Box title="Generate new feed">
        <Form onSubmit={ handleFormSubmit } style={ { marginBottom: 30 } }>
          <Select
            showSearch
            style={ { width: 320 } }
            placeholder="Select generation type"
          >
            { genTypes.map(value => (
              <SelectOption key={ value } value={ value }>
                { strCapitalize(value) }
              </SelectOption>
            )) }
          </Select>
          <Button type="danger" style={ margin }>
            <Icon type="plus-circle" theme="filled" />
            Generate
          </Button>
        </Form>
        <TableWrapper
          pagination={ false }
          loading={ false }
          dataSource={ data }
          className="isoSimpleTable"
        >
          <Column
            title="Generation Type"
            dataIndex="gentype"
            key="gentype"
            width={ 30 }
            render={ genType => strCapitalize(genType) }
          />
          <Column
            title="Fetching from DB"
            dataIndex="fetching"
            key="fetching"
            align="center"
            render={ fetching => fetching ?
              <Spin spinning={ fetching } /> :
              <Progress type="circle" width={ 30 } percent={ 100 } />
            }
          />
          <Column
            title="Processing records"
            dataIndex="processing"
            key="processing"
            render={ processing => <Progress status="active" percent={ processing } /> }
          />
          <Column
            title="Uploading Files"
            dataIndex="uploading"
            key="uploading"
            render={ uploading => <Progress status="active" percent={ uploading } /> }
          />
        </TableWrapper>
      </Box>
    </LayoutWrapper>
  );
}
