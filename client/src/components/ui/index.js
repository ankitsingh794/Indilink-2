import React from 'react';
import styled from 'styled-components';
import { Alert as AlertBox, Text, Heading } from './CommonStyles';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';

export const Button = React.lazy(() => import('./Button'));
export const Modal = React.lazy(() => import('./Modal'));
export const Loading = React.lazy(() => import('./Loading'));
export const ErrorBoundary = React.lazy(() => import('./ErrorBoundary'));

export { AlertBox as Alert };

// Loading Skeleton
export const SkeletonLoader = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  width: 100%;
  height: ${(props) => props.height || '100px'};
  border-radius: ${theme.borderRadius.md};
`;

// Empty State
export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};

  ${Heading} {
    color: ${COLORS.TEXT_SECONDARY};
  }

  ${Text} {
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

// Divider
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.color || COLORS.BG_LIGHT};
  margin: ${(props) => props.margin || `${theme.spacing.lg} 0`};
`;

// Page Wrapper
export const PageWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, rgba(224, 178, 255, 0.1) 0%, rgba(255, 230, 230, 0.1) 100%);
`;

// Form Container
export const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
`;

export const ErrorMessage = styled.span`
  color: ${COLORS.RED};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  display: block;
`;

export const SuccessMessage = styled.span`
  color: ${COLORS.PRIMARY_GREEN};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  display: block;
`;
