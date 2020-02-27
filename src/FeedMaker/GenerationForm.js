import React, { useState } from "react";

import { Icon, message, Form, Select, Button } from "antd";

import isErrorStatus from "src/lib/helpers/isErrorStatus";
import strCapitalize from "src/lib/helpers/stringCapitalize";
import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/FeedMaker/config";


export default function GenerationForm(props) {
  const [selectGenType, setSelectGenType] = useState(null);
  const { genTypes } = props;

  async function handleFormSubmit(e) {
    e.preventDefault();
    const url = `${ config.apiUrl }/${ selectGenType }`;
    const { data, status } = await SuperFetch.post(url, true);
    if (isErrorStatus(status))
      message.error(data.detail || "Something went wrong.");
  }

  return (
    <Form onSubmit={ handleFormSubmit } style={ { marginBottom: 30 } }>
      <Select
        showSearch
        style={ { width: 320 } }
        placeholder="Select generation type"
        onChange={ value => setSelectGenType(value) }
      >
        { genTypes.map(value =>
          <Select.Option key={ value } value={ value }>{ strCapitalize(value) }</Select.Option>
        ) }
      </Select>
      <Button
        type="danger"
        htmlType="submit"
        disabled={ !selectGenType }
        style={ { margin: "8px 8px" } }
      >
        <Icon type="plus-circle" theme="filled" />
        Generate
      </Button>
    </Form>
  )
}
