import React from "react";
import { ContentHolderWrapper } from "src/utility/contentHolder.style";


export default props => (
  <ContentHolderWrapper className="isoExampleWrapper" style={ props.style }>
    { props.children }
  </ContentHolderWrapper>
);
