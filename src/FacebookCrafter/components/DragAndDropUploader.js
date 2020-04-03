import React from "react"
import { Upload, message } from "antd"

import styled from "styled-components"
import { variables as colors } from "src/assets/styles/variables"
import { IoIosCloudUpload } from "react-icons/io"


const { Dragger } = Upload

const DraggerWrapper = styled.div`
  margin-top: 10px;

  .ant-upload, .ant-upload-text {
    color: ${ colors.PRIMARY_BUTTON_COLOR }!important  
  }
  .ant-upload-text {
    font-size: 12px!important
  }
`

export default function DragAndDropUploader({ uploadCallback }) {
  function getCsv(file) {
    console.dir(file)
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = event => {
      message.success(`${ file.name } file uploaded successfully.`)
      uploadCallback(event.target.result)
    }
    reader.onerror = error => message.error(error);
    return false;
  }

  return (
    <DraggerWrapper>
      <Dragger
        className="uploader"
        name="crafts"
        accept=".csv"
        beforeUpload={ getCsv }
        showUploadList={ false }
      >
        <div className="ant-upload-drag-icon"><IoIosCloudUpload /></div>
        <p className="ant-upload-text">
          Drag & drop or browse your csv
        </p>
      </Dragger>
    </DraggerWrapper>
  )
}
