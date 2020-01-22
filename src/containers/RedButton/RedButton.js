import React                from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent        from '@iso/components/utility/layoutContent';
import Tabs, { TabPane }    from '@iso/components/uielements/tabs';
import PlatformTable        from './PlatformTable';
import platforms            from './config';

export default function RedButton() {
  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Tabs>
          { platforms.map((platform, index) =>
            <TabPane key={ index } tab={ platform.name } disabled={ platform.disabled }>
              <PlatformTable platform={ platform } />
            </TabPane>
          ) }
        </Tabs>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}
