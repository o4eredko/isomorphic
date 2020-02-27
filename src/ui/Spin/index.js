import React from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { palette } from "styled-theme";


const AntSpin = props => <Spin { ...props } />;

export default styled(AntSpin)`
  && {
    .ant-spin-dot {
      i {
        background-color: ${ palette("primary", 0) };
      }
    }
  }
`;
