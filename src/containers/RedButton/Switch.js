import Popconfirm          from '@iso/components/Feedback/Popconfirm';
import message             from '@iso/components/Feedback/Message';
import Spin                from '@iso/containers/Feedback/Spin/Spin.styles';
import Switch              from '@iso/components/uielements/switch';
import React, { useState } from 'react';

export default props => {
  const [loading, setLoading] = useState(false);

  const handleSwitch = async () => {
    setLoading(true);
    const actionText = props.active ? 'disabled' : 'enabled';

    try {
      await props.strategy(props.country, !props.active);
      message.success(`Platforms in ${ props.country } will be ${ actionText }.`);
      props.callback()
    } catch (err) {
      message.error(err.message || 'Something went wrong. Try again later.');
    }
    setLoading(false);
  };

  return (
    <Spin size="small" spinning={ loading }>
      <Popconfirm
        disabled={ props.active === null }
        placement="right"
        title="Are you sure?"
        okText="Do it!"
        cancelText="No"
        onConfirm={ handleSwitch }
      >
        <Switch disabled={ props.active === null } checked={ props.active } />
      </Popconfirm>
    </Spin>
  );
}