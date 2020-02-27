import React from "react";
import { useDispatch } from "react-redux";

import { Popover } from "antd";
import IntlMessages from "src/utility/intlMessages";
import authAction from "src/Authorization/redux/actions";

import TopbarDropdownWrapper from "src/Dashboard/Topbar/TopbarDropdown.styles";
import userpic from "src/assets/images/steve_jobs.png";


const { logout } = authAction;

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <div className="isoDropdownLink" onClick={ () => dispatch(logout()) }>
        <IntlMessages id="topbar.logout" />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={ content }
      trigger="click"
      visible={ visible }
      onVisibleChange={ handleVisibleChange }
      arrowPointAtCenter={ true }
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={ userpic } />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
