import React, { useState, useEffect } from "react";
import LayoutWrapper                  from "@iso/components/utility/layoutWrapper.js";
import PageHeader                     from '@iso/components/utility/pageHeader';
import TableWrapper                   from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                          from "@iso/components/uielements/table";
import Progress                       from "@iso/components/uielements/progress";
import Box                            from "@iso/components/utility/box";
import Spin                           from "@iso/components/uielements/spin";
import strCapitalize                  from "@iso/lib/stringCapitalize";
import SuperFetch                     from "@iso/lib/helpers/superFetch";
import socketIOClient                 from "socket.io-client";
import GenerationForm                 from "@iso/components/FeedMaker/GenerationForm";
import config                         from "@iso/config/feedmaker.config";

const { Column } = Table;


export default () => {
  const [loading, setLoading] = useState(true);
  const [genTypes, setGenTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const io = socketIOClient(config.apiUrl);
    io.on("connect", data => console.log(data));
    io.on("fetch_completed", data => console.log(data));
    SuperFetch.get(`${ config.apiUrl }/gentypes`, true)
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
