import React from "react"
import PageHeader from "src/utility/pageHeader"
import Input from "src/ui/Input"
import Box from "src/utility/box"
import { Select } from "antd"
import Button from "src/ui/Button"
import { Form } from "antd"


export default function RabbitWs() {
  const [exchange, setExchange] = React.useState()
  const [value, setValue] = React.useState("")
  const [messages, setMessages] = React.useState([])
  const [ws, setWs] = React.useState()

  React.useEffect(() => {
    document.cookie = `authorization=${ localStorage.getItem("access_token") }; path=/`;
    const connection = new WebSocket("ws://localhost:8888/ws")
    connection.onmessage = (event) => {
      event.preventDefault()
      console.log("Received message:", event.data);
      setMessages([...messages, event.data])
    }
    setWs(connection)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Sending ${ value } to ${ exchange }`)
    ws.send(JSON.stringify([
      { "exchange": exchange, "msg": value, "routing_key": "*" }
    ]))
    setValue(undefined)
    setExchange(undefined)
  }

  return (<>
    <PageHeader>Rabbit Ws</PageHeader>
    <Box>
      <Form layout="inline" onSubmit={ handleSubmit }>
        <Form.Item>
          <Select style={ { width: 300 } } placeholder="exchange" value={ exchange }
                  onChange={ setExchange }>
            <Select.Option value="server-send">server-send</Select.Option>
            <Select.Option value="EURUSD">EURUSD</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input value={ value } onChange={ (e) => setValue(e.target.value) } placeholder="value" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>

      <ul>
        { messages.map((message, idx) => (
          <li key={ idx }>{ message }</li>
        )) }
      </ul>
    </Box>
  </>)
}