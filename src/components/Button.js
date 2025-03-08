import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ primary }) => (primary ? '#007bff' : '#6c757d')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Button = ({ children, primary, onClick, disabled }) => (
  <StyledButton primary={primary} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

export default Button;