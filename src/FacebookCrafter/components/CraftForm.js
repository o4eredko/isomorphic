import React from "react"

import { Form, Select, Row, Col, message } from "antd"
import Input from "src/ui/Input"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"

import { GET_ACCOUNTS, GET_CAMPAIGNS, GET_AD_SETS, GET_COUNTRIES } from "src/FacebookCrafter/gql"
import Button from "src/ui/Button";


const { Item } = Form;
const { Option } = Select;
const requiredRules = [{ required: true, message: "This field is required" }];

const filterOption = (input, option) =>
  option.props.children.toLowerCase().includes(input.toLowerCase());


function CraftForm(
  { submitCallback, form: { validateFields, getFieldDecorator, setFieldsValue } }
) {
  const {
    loading: accountsLoading,
    error: accountsError,
    data: { accounts } = [],
  } = useQuery(GET_ACCOUNTS);

  const [getSourceCampaigns, {
    loading: sourceCampaignsLoading,
    error: sourceCampaignsError,
    data: { campaigns: sourceCampaigns } = [],
  }] = useLazyQuery(GET_CAMPAIGNS);

  const [getTargetCampaigns, {
    loading: targetCampaignsLoading,
    error: targetCampaignsError,
    data: { campaigns: targetCampaigns } = [],
  }] = useLazyQuery(GET_CAMPAIGNS);

  const [getAdSets, {
    loading: adSetsLoading,
    error: adSetsError,
    data: { adSets } = [],
  }] = useLazyQuery(GET_AD_SETS);

  const {
    loading: countriesLoading,
    error: countriesError,
    data: { countries } = [],
  } = useQuery(GET_COUNTRIES);

  for (const error of [accountsError, sourceCampaignsError, targetCampaignsError, adSetsError, countriesError]) {
    if (error) message.error(JSON.stringify(error, null, 2));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFields((err, values) => {
      if (!err) submitCallback(values);
    })
  };

  return (
    <Form layout="horizontal">
      <Item label="Generation Name">
        { getFieldDecorator("craftName", { rules: requiredRules })(
          <Input placeholder="Generation name" />
        ) }
      </Item>
      <Row gutters={ 24 }>
        <Col span={ 12 } style={ { paddingRight: 4 } }>
          <Item label="From">
            { getFieldDecorator("sourceAccountId", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                loading={ accountsLoading }
                placeholder="Account"
                onChange={ (value) => {
                  setFieldsValue({ sourceCampaignId: undefined });
                  getSourceCampaigns({ variables: { accountId: value } });
                } }
              >
                { accounts && accounts.map(({ id, name }) =>
                  <Option key={ id }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
          <Item>
            { getFieldDecorator("sourceCampaignId", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                placeholder="Campaign"
                loading={ sourceCampaignsLoading }
                onChange={ (value) => {
                  setFieldsValue({ sourceAdSetId: undefined });
                  getAdSets({ variables: { campaignId: value } });
                } }
              >
                { sourceCampaigns && sourceCampaigns.map(({ id, name }) =>
                  <Option key={ id } value={ id }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
          <Item>
            { getFieldDecorator("sourceAdSetId", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                placeholder="Ad Set"
                loading={ adSetsLoading }
              >
                { adSets && adSets.map(({ id, name }) =>
                  <Option key={ id } value={ id }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
        </Col>
        <Col span={ 12 } style={ { paddingLeft: 4 } }>
          <Item label="To">
            { getFieldDecorator("targetAccountId", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                loading={ accountsLoading }
                placeholder="Account"
                onChange={ (value) => {
                  setFieldsValue({ targetCampaignId: undefined });
                  getTargetCampaigns({ variables: { accountId: value } });
                } }
              >
                { accounts && accounts.map(({ id, name }) =>
                  <Option key={ id }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
          <Item>
            { getFieldDecorator("targetCampaignId", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                placeholder="Campaign"
                loading={ targetCampaignsLoading }
              >
                { targetCampaigns && targetCampaigns.map(({ id, name }) =>
                  <Option key={ id }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
          <Item>
            { getFieldDecorator("countryCode", { rules: requiredRules })(
              <Select
                showSearch filterOption={ filterOption }
                placeholder="Country"
                loading={ countriesLoading }
              >
                { countries && countries.map(({ name, countryCode }) =>
                  <Option key={ countryCode }>{ name }</Option>
                ) }
              </Select>
            ) }
          </Item>
        </Col>
      </Row>
      <Button block type="dashed" icon="upload" onClick={ handleSubmit }>Craft Ads</Button>
    </Form>
  )
}

export default Form.create({ name: "craftAdForm" })(CraftForm);
