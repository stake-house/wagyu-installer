import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Black, LightBlue, LightGreen } from '../colors';

type FooterProps = {
  backLink: string;
  backLabel: string;
  nextLink: string;
  nextLabel: string;
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  height: 70;
  flex-grow: 1;
  min-width: 100vw;
`;

const StyledButton = styled(Link)`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  height: 24;
  background-color: ${LightBlue};
  padding: 16 24;
  border-radius: 10%;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;
  margin: 60;

  &:hover {
    background-color: ${LightGreen};
  }
`;

export const Footer = (props: FooterProps) => {
  return (
    <FooterContainer>
      {props.backLink ? (
        <StyledButton to={props.backLink}>{props.backLabel}</StyledButton>
      ) : (
        <div />
      )}
      {props.nextLink ? (
        <StyledButton to={props.nextLink}>{props.nextLabel}</StyledButton>
      ) : (
        <div />
      )}
    </FooterContainer>
  );
};
