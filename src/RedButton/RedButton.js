import React, { useState } from "react";

import LayoutContentWrapper from "src/utility/layoutWrapper";
import LayoutContent from "src/utility/layoutContent";
import Tabs, { TabPane } from "src/ui/Tabs";

import PlatformTable from "./PlatformTable";
import platforms from "./config";


export default function RedButton() {
  let firstActiveTab = platforms.findIndex(platform => !Boolean(platform["disabled"]));
  const [activeTab, setActiveTab] = useState(firstActiveTab);
  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Tabs onChange={ key => setActiveTab(parseInt(key)) }>
          { platforms.map((platform, index) => {
            const PlatformTableClass = platform.handler;
            return (
              <TabPane
                key={ index }
                tab={ platform.name }
                disabled={ Boolean(platform["disabled"]) }
              >
                <PlatformTableClass isActive={ activeTab === index } apiUrl={ platform.apiUrl } />
              </TabPane>
            )
          }) }
        </Tabs>
      </LayoutContent>
    </LayoutContentWrapper>
  );
}
