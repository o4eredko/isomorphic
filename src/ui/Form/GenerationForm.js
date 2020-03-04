import React, { useState } from "react";

import { Form, Select, Button } from "antd";

import strCapitalize from "src/lib/helpers/stringCapitalize";


export default function GenerationForm({ genTypes, onSubmit }) {
  const [generationType, setGenerationType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(generationType);
  };

  return (
    <Form onSubmit={ handleSubmit } style={ { marginBottom: 30 } }>
      <Select
        showSearch
        style={ { width: 320 } }
        placeholder="Select generation type"
        onChange={ value => setGenerationType(value) }
      >
        { Object.entries(genTypes).map(([key, value]) => (
          <Select.Option key={ key } value={ key }>
            { strCapitalize(value) }
          </Select.Option>
        )) }
      </Select>
      <Button
        type="danger"
        htmlType="submit"
        icon="plus-circle"
        disabled={ !generationType }
        style={ { margin: "8px 8px" } }
      >
        Generate
      </Button>
    </Form>
  )
}
