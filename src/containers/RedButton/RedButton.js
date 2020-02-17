import React, { useState }  from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent        from '@iso/components/utility/layoutContent';
import Tabs, { TabPane }    from '@iso/components/uielements/tabs';
import PlatformTable        from './PlatformTable';
import platforms            from './config';

export default function RedButton() {
  let firstActiveTab = platforms.findIndex(platform => !platform.disabled);
  const [activeTab, setActiveTab] = useState(firstActiveTab);
  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Tabs onChange={ key => setActiveTab(parseInt(key)) }>
          { platforms.map((platform, index) =>
            <TabPane key={ index } tab={ platform.name } disabled={ platform.disabled }>
              <PlatformTable isActive={ activeTab === index } apiUrl={ platform.apiUrl } />
            </TabPane>
          ) }
        </Tabs>
      </LayoutContent>
    </LayoutContentWrapper>
  );
}
