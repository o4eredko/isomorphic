import React from "react";
import { palette } from "styled-theme";
import styled from "styled-components";


const LayoutContent = styled.div`
  width: 100%;
  padding: 35px;
  background-color: #ffffff;
  border: 1px solid ${ palette("border", 0) };
  height: 100%;
`;

export default props => {
  let className = "isoLayoutContent" + (props.className ? props.className : "");
  return (
    <LayoutContent className={ className }{ ...props }>
      { props.children }
    </LayoutContent>
  )
};
