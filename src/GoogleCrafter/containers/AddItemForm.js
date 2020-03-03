import React from "react";

import { Form, Select, Slider } from "antd";
import Input, { NumberInput } from "src/ui/Input";
import Button from "src/ui/Button";

import nonRequiredFields from "src/GoogleCrafter/config/nonRequiredFields";
import {
  formItemLayout, formItemLayoutWithOutLabel
} from "src/GoogleCrafter/css/AddSettingsItem.style";


const { Item } = Form;
const { Option } = Select;
const { Group } = Input;
const requiredRules = [{ required: true, message: "This field is required" }];

let id = 0;

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedKeys: {} }
  }

  submitForm = () => {
    const { validateFields } = this.props.form;
    return validateFields((err, values) => values);
  };


  addDynamicField = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const keys = getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    setFieldsValue({ keys: nextKeys });
  };

  selectDynamicField = (key, value) => {
    this.setState(({ selectedKeys }) => {
      return {
        selectedKeys: { ...selectedKeys, [key]: value }
      }
    });
  };

  removeDynamicField = (k) => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const copiedSelectedKeys = { ...this.state.selectedKeys };
    delete copiedSelectedKeys[k];
    this.setState({ selectedKeys: copiedSelectedKeys });

    const keys = getFieldValue("keys");
    setFieldsValue({ keys: keys.filter(key => key !== k) });
  };

  renderDynamicFields = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const selectedValues = Object.values(this.state.selectedKeys);

    return (<>
      { keys.map((key, index) => (
        <Item
          key={ key } required={ false }
          label={ index === 0 ? "Dynamic fields" : "" }
          { ...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
        >
          <Group compact>
            <Item style={ { width: "48%", marginRight: "1%" } }>
              { getFieldDecorator(`dynamic[${ key }].key`, {
                validateTrigger: ["onChange", "onBlur"],
                rules: requiredRules
              })(
                <Select
                  style={ { width: "100%" } }
                  placeholder="key" showSearch autoFocus
                  onChange={ value => this.selectDynamicField(key, value) }
                >
                  { nonRequiredFields
                    .filter(item => !selectedValues.includes(item))
                    .map(field => <Option key={ field } value={ field }>{ field }</Option>)
                  }
                </Select>
              ) }
            </Item>
            <Item style={ { width: "48%", marginRight: "1%" } }>
              { getFieldDecorator(`dynamic[${ key }].value`)(
                <Input placeholder="value" />
              ) }
            </Item>
            <i className="ion-android-delete deleteIcon"
               onClick={ () => this.removeDynamicField(key) }
            />
          </Group>
        </Item>
      )) }
    </>)
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" { ...formItemLayout }>
        <Item label="Name" hasFeedback>
          { getFieldDecorator("name", { rules: requiredRules })(<Input placeholder="name" />) }
        </Item>

        <Item label="Account">
          <Group compact>
            <Item name="account_name" hasFeedback>
              { getFieldDecorator("account_name", { rules: requiredRules })(
                <Input placeholder="name" />
              ) }
            </Item>
            <Item hasFeedback>
              { getFieldDecorator("account_group")(<Input placeholder="account_group" />) }
            </Item>
          </Group>
        </Item>

        <Item label="Campaign Name" hasFeedback>
          { getFieldDecorator("campaign_name", { rules: requiredRules })(
            <Input placeholder="campaign name" />
          ) }
        </Item>
        <Item label="Campaign Budget" hasFeedback>
          { getFieldDecorator("campaign_budget", { rules: requiredRules })(
            <NumberInput
              min={ 0 }
              formatter={ value => `$ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
              parser={ value => value.replace(/\$\s?|(,*)/g, "") }
            />
          ) }
        </Item>

        <Item label="Ad Group Name" hasFeedback>
          { getFieldDecorator("ad_group_name", { rules: requiredRules })(
            <Input placeholder="ad group name" />
          ) }
        </Item>
        <Item label="Ad Group Keywords" hasFeedback>
          { getFieldDecorator("ad_group_keywords", { rules: requiredRules })(
            <Input placeholder="ad group keywords" />
          ) }
        </Item>
        <Item label="Ad Group bid" hasFeedback>
          { getFieldDecorator("ad_group_bid", { rules: requiredRules })(
            <NumberInput min={ 0 } placeholder="bid" />
          ) }
        </Item>
        <Item label="Ad Group bid Range">
          { getFieldDecorator(["ad_group_bid_min", "ad_group_bid_max"], { initialValue: [0, 1] })(
            <Slider range />
          ) }
        </Item>

        <Item label="Ad headlines">
          <Group compact>
            <Item>
              { getFieldDecorator("ad_headline2", { rules: requiredRules })(
                <Input placeholder="headline 1" />
              ) }
            </Item>
            <Item>
              { getFieldDecorator("ad_headline1", { rules: requiredRules })(
                <Input placeholder="headline 2" />
              ) }
            </Item>
          </Group>
        </Item>
        <Item label="Ad Description Line 1">
          { getFieldDecorator("ad_description_line", { rules: requiredRules })(
            <Input placeholder="ad description line" />
          ) }
        </Item>
        <Item label="Ad Final url">
          { getFieldDecorator("ad_final_url", { rules: requiredRules })(
            <Input placeholder="http://some_test_url" />
          ) }
        </Item>

        <Item label="Ad Paths">
          <Group compact>
            <Item>
              { getFieldDecorator("ad_path1", { rules: requiredRules })(
                <Input placeholder="path 1" />
              ) }
            </Item>
            <Item>
              { getFieldDecorator("ad_path2", { rules: requiredRules })(
                <Input placeholder="path 2" />
              ) }
            </Item>
          </Group>
        </Item>

        <Item label="Ad Status/Type">
          <Group compact>
            <Item>
              { getFieldDecorator("ad_status", { rules: requiredRules })(
                <Input placeholder="ad status" />
              ) }
            </Item>
            <Item>
              { getFieldDecorator("ad_type", { rules: requiredRules })(
                <Input placeholder="ad type" />
              ) }
            </Item>
          </Group>
        </Item>

        <Item wrapperCol={ { xs: { span: 18, offset: 6 } } }>
          <Button block icon="plus" type="dashed" onClick={ this.addDynamicField }>
            Add field
          </Button>
        </Item>

        { this.renderDynamicFields() }

      </Form>
    )
  }
}

export default Form.create({ name: "add_item_form" })(AddItemForm);
