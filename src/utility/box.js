import React from "react";
import { palette } from "styled-theme";
import styled from "styled-components";
import BoxTitleWrapper from "src/utility/boxTitle";


const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  border: 1px solid ${ palette("border", 0) };
  margin: 0 0 30px;

  &:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

export default props => (
  <BoxWrapper
    className={ `${ props.className ? props.className : "" } isoBoxWrapper` }
    style={ props.style }
    { ...props }
  >
    <BoxTitleWrapper title={ props.title } subtitle={ props.subtitle }{ ...props } />
    { props.children }
  </BoxWrapper>
);
