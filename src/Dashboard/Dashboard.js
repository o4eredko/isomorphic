import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Layout } from "antd";

import useWindowSize from "src/lib/hooks/useWindowSize";
import appActions from "src/App/redux/actions";
import Sidebar from "src/Dashboard/Sidebar/Sidebar";
import Topbar from "src/Dashboard/Topbar/Topbar";
import DashboardRoutes from "src/Dashboard/DashboardRoutes";

import siteConfig from "src/config/site.config";
import { DashboardContainer, DashboardGlobalStyles } from "src/Dashboard/Dashboard.styles";


const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "70px 0 0",
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(state => state.App.height);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={ { height: height } }>
        <Topbar />
        <Layout style={ styles.layout }>

          <Sidebar />
          <Layout className="isoContentMainLayout" style={ { height: appHeight } }>
            <Content className="isomorphicContent" style={ styles.content }>
              <DashboardRoutes />
            </Content>
            <Footer style={ styles.footer }>{ siteConfig.footerText }</Footer>
          </Layout>

        </Layout>
      </Layout>
    </DashboardContainer>
  );
}