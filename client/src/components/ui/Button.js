import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { COLORS } from '../../config/constants';

const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      type = 'button',
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        type={type}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

const StyledButton = styled.button`
  padding: ${(props) => {
    switch (props.size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.lg}`;
      default: return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};

  background-color: ${(props) => {
    switch (props.variant) {
      case 'secondary': return COLORS.BG_LIGHT;
      case 'danger': return COLORS.RED;
      case 'outline': return 'transparent';
      default: return COLORS.PRIMARY_GREEN;
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case 'secondary': return COLORS.TEXT_PRIMARY;
      case 'danger': return COLORS.WHITE;
      case 'outline': return COLORS.PRIMARY_GREEN;
      default: return COLORS.WHITE;
    }
  }};

  border: ${(props) => {
    if (props.variant === 'outline') return `2px solid ${COLORS.PRIMARY_GREEN}`;
    return 'none';
  }};

  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.md};
  width: ${(props) => props.fullWidth ? '100%' : 'auto'};

  &:hover:not(:disabled) {
    background-color: ${(props) => {
      switch (props.variant) {
        case 'secondary': return COLORS.TEXT_PRIMARY;
        case 'danger': return '#b00051';
        case 'outline': return COLORS.PRIMARY_GREEN;
        default: return COLORS.LIGHT_GREEN;
      }
    }};
    color: ${(props) => props.variant === 'outline' ? COLORS.WHITE : 'inherit'};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

export default Button;
