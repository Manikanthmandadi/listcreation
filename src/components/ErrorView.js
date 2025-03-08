import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
`;

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorView = ({ onRetry }) => (
  <ErrorContainer>
    <ErrorMessage>Failed to fetch data. Please try again.</ErrorMessage>
    <RetryButton onClick={onRetry}>Try Again</RetryButton>
  </ErrorContainer>
);

export default ErrorView;