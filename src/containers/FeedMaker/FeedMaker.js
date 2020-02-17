import React, { useState, useEffect } from "react";
import LayoutWrapper                  from "@iso/components/utility/layoutWrapper.js";
import PageHeader                     from '@iso/components/utility/pageHeader';
// import LayoutContentWrapper     from "@iso/components/utility/layoutWrapper";
import LayoutContent                  from "@iso/components/utility/layoutContent";
import Select, { SelectOption }       from "@iso/components/uielements/select";
import Button                         from "@iso/components/uielements/button";
import { direction }                  from "@iso/lib/helpers/rtl";
import SuperFetch                     from "@iso/lib/helpers/superFetch";
import { Icon }                       from "antd";
import Form                           from "@iso/components/uielements/form";
import TableWrapper                   from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                          from "@iso/components/uielements/table";
import Progress                       from "@iso/components/uielements/progress";

const { Column } = Table;


export default () => {
  const margin = {
    margin: '8px 8px',
  };

  const [genTypes, setGenTypes] = useState([]);
  const [generations, setGenarations] = useState([]);

  useEffect(() => {
    // SuperFetch.get("http://localhost:8080/gentypes").then(response => setGenTypes(response.data));
  }, []);

  function handleFormSubmit(e) {
    // setGenerations(e.target)
  }

  return (
    <LayoutWrapper>
      <PageHeader>Feed Maker</PageHeader>
      <LayoutContent>
        <Form onSubmit={ handleFormSubmit }>
          <Select
            showSearch
            style={ { width: 320 } }
            placeholder="Select generation type"
          >
            { genTypes.map(value =>
              <SelectOption value={ value }>{ value.toUpperCase() }</SelectOption>)
            }
            <SelectOption value="eggs">Johnn</SelectOption>
          </Select>
          <Button type="danger" style={ margin }>
            <Icon type="plus-circle" theme="filled" />
            Generate
          </Button>
        </Form>
        <TableWrapper
          pagination={ false }
          loading={ false }
          dataSource={ [] }
          className="isoSimpleTable"
        >
          <Column
            title="Generation Type"
            dataIndex="gentype"
            key="gentype"
            render={ () => {
            } }
          />
          <Column
            title="Status"
            dataIndex="loaded"
            key="loaded"
            render={ () => {
            } }
          />
          <Column
            title="Active"
            dataIndex="active"
            key="active"
            align="center"
            render={ () => {
            } }
          />
        </TableWrapper>
      </LayoutContent>
    </LayoutWrapper>
  );
}
