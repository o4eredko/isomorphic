import React from "react"

import { message } from "antd"
import Button from "src/ui/Button"
import PlatformActions from "src/RedButton/PlatformActions"
import SuperFetch from "src/lib/helpers/superFetch"
import PlatformTable from "src/RedButton/PlatformTable"
import isErrorStatus from "src/lib/helpers/isErrorStatus"
import { useHistory } from "react-router"


export default function BingTable(props) {
  const history = useHistory()
  const authCode = new URLSearchParams(window.location.search).get("code")
  const [oauthUrl, setOauthUrl] = React.useState()
  const [authenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {
    const handler = new PlatformActions(props.apiUrl)

    async function initBingOauth() {
      await handler.initUrlTable()
      const { data } = await SuperFetch.get(handler.urlTable["authenticate"], false)
      data.shouldUpdate ? setOauthUrl(data["oauthUrl"]) : setAuthenticated(true)
    }

    async function authenticate() {
      await handler.initUrlTable()
      const url = handler.urlTable["authenticate"]
      const body = { code: authCode }
      const { data, status } = await SuperFetch.post(url, false, body)
      history.push(window.location.pathname)
      if (!isErrorStatus(status))
        setAuthenticated(true)
      else
        message.error(data.detail)
    }

    authCode ? authenticate() : initBingOauth()
  }, [])

  return authenticated ? <PlatformTable { ...props } /> : (
    <div style={ { display: "flex", flexDirection: "column", alignItems: "flex-start" } }>
      To access Bing Ads API you need to log in to your account.
      <Button
        icon="windows"
        loading={ !oauthUrl }
        href={ oauthUrl }
        type="primary"
        style={ { lineHeight: "35px", marginTop: 10 } }
      >
        Log in with Microsoft
      </Button>
    </div>
  )
}