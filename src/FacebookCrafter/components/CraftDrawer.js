import React from "react"

import { useMutation } from "@apollo/react-hooks"
import { CRAFT_ADS } from "src/FacebookCrafter/gql"

import { message, Drawer, Icon, Tooltip, Row, Col } from "antd"
import CodeMirror from "src/ui/CodeMirror"
import CraftForm from "src/FacebookCrafter/components/CraftForm"
import DragAndDropUploader from "src/FacebookCrafter/components/DragAndDropUploader"

import config from "src/FacebookCrafter/config/index.config"
import styled from "styled-components"
import { variables as colors } from "src/assets/styles/variables"
import BoxTitle from "src/utility/boxTitle"
import { Wrapper } from "src/GoogleCrafter/css/AddSettingsItem.style"
import { TopBar } from "src/GoogleCrafter/css/AddSettingsItem.style"
import { IconSvg } from "src/GoogleCrafter/IconSvg"
import ArrowIcon from "src/assets/images/icon/04-icon.svg"
import { ContentWrapper } from "src/GoogleCrafter/css/AddSettingsItem.style"
import basicStyle from "src/assets/styles/constants"


const InfoIcon = styled(Icon)`
  margin-left: 10px;
  color: ${ colors.PRIMARY_BUTTON_COLOR }
`

const { rowStyle, colStyle, gutter } = basicStyle

export default function CraftAds({ drawerVisibility, toggleDrawer }) {
  const [csv, setCsv] = React.useState("")
  const [craftAds] = useMutation(CRAFT_ADS)

  async function handleSubmit(formData) {
    formData.csvData = csv
    console.dir(formData)
    const { error } = await craftAds({ variables: formData })
    if (error)
      message.error(JSON.stringify(error, null, 2))
    else {
      message.success("New Craft successfully started")
      toggleDrawer(false)
    }
  }

  return (
    <Drawer
      placement="right"
      closable={ false }
      onClose={ () => toggleDrawer(false) }
      visible={ drawerVisibility }
      width={ "60%" }
      destroyOnClose={ false }
    >
      <Wrapper>
        <TopBar>
          <IconSvg
            src={ ArrowIcon }
            border="none"
            padding={ 0 }
            alt="Arrow Icon"
            style={ { transform: "rotateY(180deg)" } }
            onClick={ () => toggleDrawer(false) }
          />
          Craft Ads
        </TopBar>
        <ContentWrapper style={ { maxHeight: "100%" } }>

          <Row style={ rowStyle } gutters={ 24 }>
            <Col style={ colStyle } xs={ 1 }>
              <Tooltip
                placement="top"
                title={ `Required fields: ${ config.requiredCsvFields.join(", ") }` }
              >
                <InfoIcon type="info-circle" />
              </Tooltip>
            </Col>
            <Col style={ colStyle } xs={ 23 }>
              <BoxTitle title="Put your csv data here:" />
            </Col>
          </Row>

          <CodeMirror
            className="small"
            value={ csv }
            onBeforeChange={ (editor, data, value) => setCsv(value) }
          />
          <DragAndDropUploader uploadCallback={ setCsv } />
          <CraftForm submitCallback={ handleSubmit } />

        </ContentWrapper>
      </Wrapper>
    </Drawer>
  )
}