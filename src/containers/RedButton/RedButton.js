import React, { Component } from 'react';
import Tabs, { TabPane }    from '@iso/components/uielements/tabs';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent        from '@iso/components/utility/layoutContent';
import platforms            from './config';
import PlatformTable        from './PlatformTable';

export default class RedButton extends Component {
  render() {
    const enabledPlatforms = platforms.filter(platform => !platform.disabled);
    let firstActivePlatform = null;
    if (enabledPlatforms.length) firstActivePlatform = platforms.indexOf(enabledPlatforms[0]);

    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Tabs defaultActiveKey={ firstActivePlatform.toString() }>
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
}
