import styled from "styled-components";


const AntProgress = ComponentName => styled(ComponentName)`
  &.ant-progress-line {
    .ant-progress-outer {
      padding-right: calc(2em + 16px);
      margin-right: calc(-2em - 16px);
    }

    .ant-progress-text {
      text-align: "left";
      margin: "0 0 0 0.75em";
    }
  }
`;

export default AntProgress;
