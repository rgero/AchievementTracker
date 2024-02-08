/* eslint-disable react/prop-types */

import Button from "../styles/Button";
import Heading from "./Heading";
import { Sizes } from "../constants/sizes";
import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: ${Sizes.minScreenSize}px){
    width: 80%;
  }
`;

const ConfirmDelete = ({ resourceName, disabled, onCloseModal, onConfirm }) => {
  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
