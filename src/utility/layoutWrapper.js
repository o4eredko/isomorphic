import React from "react";
import styled from "styled-components";


const LayoutContentWrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;

export default props => {
  let className = "isoLayoutContentWrapper" + (props.className ? props.className : "");

  return (
    <LayoutContentWrapper className={ className }{ ...props }>
      { props.children }
    </LayoutContentWrapper>
  )
}
