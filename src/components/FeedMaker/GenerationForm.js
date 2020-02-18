import React, { useState }      from "react";
import Form                     from "@iso/components/uielements/form";
import Select, { SelectOption } from "@iso/components/uielements/select";
import { Icon }                 from "antd";
import Button                   from "@iso/components/uielements/button";
import message                  from "@iso/components/uielements/message";
import isErrorStatus            from "@iso/lib/helpers/isErrorStatus";
import strCapitalize            from "@iso/lib/stringCapitalize";
import SuperFetch               from "@iso/lib/helpers/superFetch";
import config                   from "@iso/config/feedmaker.config";


export default function GenerationForm(props) {
  const [selectGenType, setSelectGenType] = useState(null);
  const { genTypes } = props;

  async function handleFormSubmit(e) {
    e.preventDefault();
    const url = `${ config.apiUrl }/${ selectGenType }`;
    const { data, status } = await SuperFetch.post(url);
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
        { genTypes.map(value => (
          <SelectOption key={ value } value={ value }>{ strCapitalize(value) }</SelectOption>
        )) }
      </Select>
      <Button
        type="danger"
        htmlType="submit"
        disabled={ !selectGenType }
        style={ { margin: '8px 8px' } }
      >
        <Icon type="plus-circle" theme="filled" />
        Generate
      </Button>
    </Form>
  )
}
