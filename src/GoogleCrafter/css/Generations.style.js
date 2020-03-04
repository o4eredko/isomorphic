import styled from "styled-components";

import { Timeline, Table } from "antd";


export const StyledTimeline = styled(Timeline)`
  padding-top: 30px!important;
  width: 270px;
  .ant-timeline-item-last {
    padding-bottom: 0
  }
`;


export const StyledTable = styled(Table)`
  tr > td {
    padding 0 !important;
  }
`;
