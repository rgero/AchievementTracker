import { Sizes } from "../../utils/constants";
import styled from "styled-components";

const TextArea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 300px;
  height: 150px;

  @media only screen and (max-width: ${Sizes.minScreenSize}px) {
    width: 100%
  }
`;

export default TextArea;
