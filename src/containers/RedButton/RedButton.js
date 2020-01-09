import React, { Component } from 'react';
import Tabs, { TabPane }    from '@iso/components/uielements/tabs';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent        from '@iso/components/utility/layoutContent';
import IntlMessages         from '@iso/components/utility/intlMessages';
import platforms            from './config';

export default class RedButton extends Component {
  render() {
    return (
      <LayoutContentWrapper style={ { height: '100vh' } }>
        <LayoutContent>
          <Tabs defaultActiveKey="0">
            { platforms.map((platform, index) =>
              <TabPane key={ index } tab={ platform.name } disabled={ platform.disabled }>
                { platform.name }
              </TabPane>
            ) }
          </Tabs>
        </LayoutContent>
      </LayoutContentWrapper>
    )
  }
}
