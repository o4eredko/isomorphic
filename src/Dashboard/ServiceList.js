import React from "react"
import styled from "styled-components"

import Link from "src/lib/helpers/Link"
import { Card, Tag, Row, Col } from "antd"
import { routes } from "src/Dashboard/DashboardRoutes"

import LayoutContentWrapper from "src/utility/layoutWrapper"
import LayoutContent from "src/utility/layoutContent"
import PageHeader from "src/utility/pageHeader"
import dashboardUrl from "src/lib/helpers/dashboardUrl"
import { variables as colors } from "src/assets/styles/variables"
import SuperFetch from "src/lib/helpers/superFetch"

import redButtonConfig from "src/RedButton/config"
import feedmakerConfig from "src/FeedMaker/config"
import googleCrafterConfig from "src/GoogleCrafter/config/googleCrafter.config"
import facebookCrafterConfig from "src/FacebookCrafter/config/index.config"


const StyledCard = styled(Card)`
  margin-bottom: 20px!important;
  height: 100%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .16);
  border-radius: 4px!important;
  
  &:hover {
    box-shadow: none;
    background-color: ${ colors.PRIMARY_BUTTON_COLOR };
    color: white;
    .ant-card-head-title {
      color: white
    }
  }
  
  .ant-card-head-title {
    color: ${ colors.HEADER_COLOR }
  }
`

const enabledTag = { extra: [<Tag color="#87d068" key="1">enabled</Tag>] }
const disabledTag = { extra: [<Tag color="#f50" key="1">disabled</Tag>] }

const pingUrls = {
  googleRedButton: redButtonConfig.google.apiUrl,
  yandexRedButton: redButtonConfig.yandex.apiUrl,
  facebookRedButton: redButtonConfig.facebook.apiUrl,
  bingRedButton: redButtonConfig.bing.apiUrl,
  feedmaker: feedmakerConfig.pingUrl,
  googleCrafter: googleCrafterConfig.pingUrl,
  facebookCrafter: facebookCrafterConfig.pingUrl,
  policyBan: "http://skyline.jo:8228/ping",
}


export default function ServiceList() {
  const [serviceState, setServiceState] = React.useState({})

  React.useEffect(() => {
    const pingRequests = Object.entries(pingUrls).map(([key, url]) =>
      SuperFetch.get(url, true)
        .then(({ status }) => ({ [key]: status === 200 }))
        .catch((error) => {
          console.log(key, error);
          return { [key]: false }
        })
    )
    Promise.all(pingRequests).then(responses => {
      let states = {}
      for (const response of responses)
        states = { ...states, ...response }
      setServiceState(states)
    })
  }, [])

  const cards = {
    googleRedButton: {
      title: "Google Red Button",
      content: "Toggle all active campaigns for the given country in Google Ads.",
      url: dashboardUrl(routes.red_button.path),
    },
    facebookRedButton: {
      title: "Facebook Red Button",
      content: "Toggle all active campaigns for the given country in Facebook Marketing.",
      url: dashboardUrl(routes.red_button.path),
    },
    yandexRedButton: {
      title: "Yandex Red Button",
      content: "Toggle all active campaigns for the given country in Yandex Direct.",
      url: dashboardUrl(routes.red_button.path),
    },
    bingRedButton: {
      title: "Bing Red Button",
      content: "Toggle all active campaigns for the given country in Bing Ads.",
      url: dashboardUrl(routes.red_button.path),
    },
    feedmaker: {
      title: "Feedmaker",
      content: "Generate CSV files from database.",
      url: dashboardUrl(routes.feedmaker.path),
    },
    googleCrafter: {
      title: "Google Crafter",
      content: "Craft campaigns in Google Ads.",
      url: dashboardUrl(routes.google_crafter_settings.path),
    },
    facebookCrafter: {
      title: "Facebook Crafter",
      content: "Craft campaigns in Facebook Marketing.",
      url: dashboardUrl(routes.facebook_crafter.path),
    },
    policyBan: {
      title: "Policy Ban",
      content: "Block words and check that the word was blocked",
      url: "http://skyline.jo:8228/docs"
    }
  }

  return (
    <LayoutContentWrapper>
      <PageHeader>Available Microservices</PageHeader>
      <LayoutContent>

        <Row gutter={ 24 }>
          { Object.entries(cards).map(([key, data]) => (
            <Col sm={ 24 } md={ 12 } lg={ 8 } key={ key }>
              <Link to={ data.url }>
                <StyledCard
                  title={ data.title } loading={ !(key in serviceState) }
                  { ...(serviceState[key] ? enabledTag : disabledTag) }
                >
                  { data.content }
                </StyledCard>
              </Link>
            </Col>
          )) }
        </Row>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}
