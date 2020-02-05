import React, { useState }  from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent        from '@iso/components/utility/layoutContent';
import Tabs, { TabPane }    from '@iso/components/uielements/tabs';
import PlatformTable        from './PlatformTable';
import platforms            from './config';

export default function RedButton() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Tabs onChange={ key => setActiveTab(parseInt(key)) }>
          { platforms.map((platform, index) =>
            <TabPane key={ index } tab={ platform.name } disabled={ platform.disabled }>
              <PlatformTable isActive={ activeTab === index } platform={ platform } />
            </TabPane>
          ) }
        </Tabs>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}
