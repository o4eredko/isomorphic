import React from "react"

import Button from "src/ui/Button"
import CraftDrawer from "src/FacebookCrafter/components/CraftDrawer"
import Table from "src/ui/Table"
import Progress from "src/ui/Progress"

import LayoutWrapper from "src/utility/layoutWrapper"
import Box from "src/utility/box"
import PageHeader from "src/utility/pageHeader"

import { useSubscription } from "@apollo/react-hooks"
import { PROGRESS_SUBSCRIPTION } from "src/FacebookCrafter/gql"


export default function FacebookCrafter({ drawerVisibility, toggleDrawer }) {
  const { loading, data } = useSubscription(PROGRESS_SUBSCRIPTION);

  return (
    <LayoutWrapper>
      <PageHeader>Facebook Crafter</PageHeader>
      <Box>
        <Button
          type="danger"
          icon="plus-circle"
          onClick={ () => toggleDrawer(true) }
          style={ { marginBottom: 30 } }
        >
          Craft New Ads
        </Button>
        <Table
          pagination={ false }
          loading={ loading }
          dataSource={ data.progress }
          rowKey="name"
          className="isoSimpleTable"
        >
          <Table.Column
            title="Generation Name"
            dataIndex="name"
          />
          <Table.Column
            title="Progress"
            dataIndex="percents"
            align="center"
            render={ (value) =>
              <Progress status={ value === 100 ? "success" : "active" } percent={ value } />
            }
          />
          <Table.Column
            title="Crafting Started"
            dataIndex="started"
            render={ generation_date =>
              new Date(generation_date * 1000).toLocaleString().replace(",", "")
            }
          />
          <Table.Column
            title="Crafting Finished"
            dataIndex="finished"
            render={ generation_date =>
              generation_date ?
              new Date(generation_date * 1000).toLocaleString().replace(",", "") : "Pending..."
            }
          />
        </Table>
        <CraftDrawer { ...{ drawerVisibility, toggleDrawer } } />
      </Box>
    </LayoutWrapper>
  )
}
