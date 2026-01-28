import React from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = ({ fullScreen = false, message = 'Loading...' }) => {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  ${(props) => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 999;
  `}
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${COLORS.BG_LIGHT};
  border-top-color: ${COLORS.PRIMARY_GREEN};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const LoadingText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.base};
`;

export default Loading;
