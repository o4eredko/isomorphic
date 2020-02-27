import styled from "styled-components";
import { palette } from "styled-theme";


export const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: ${ palette("text", 0) };
  margin: 0;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${ palette("text", 3) };
  line-height: 24px;
`;
