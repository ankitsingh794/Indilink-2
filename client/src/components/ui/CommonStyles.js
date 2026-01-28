import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Modern Button Component
export const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${(props) => {
    if (props.variant === 'secondary') return COLORS.BG_SECONDARY;
    if (props.variant === 'outlined') return 'transparent';
    if (props.variant === 'danger') return COLORS.ERROR;
    if (props.variant === 'success') return COLORS.SUCCESS;
    if (props.variant === 'accent') return COLORS.ACCENT_GRADIENT;
    return COLORS.PRIMARY_GRADIENT;
  }};
  color: ${(props) => {
    if (props.variant === 'secondary') return COLORS.TEXT_PRIMARY;
    if (props.variant === 'outlined') return COLORS.PRIMARY;
    return COLORS.WHITE;
  }};
  border: ${(props) => {
    if (props.variant === 'outlined') return `2px solid ${COLORS.PRIMARY}`;
    return 'none';
  }};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.base};
  box-shadow: ${(props) => !props.unstyled ? theme.shadows.md : 'none'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => !props.unstyled ? theme.shadows.lg : 'none'};
    background: ${(props) => {
      if (props.variant === 'secondary') return COLORS.BG_TERTIARY;
      if (props.variant === 'outlined') return COLORS.BG_SECONDARY;
      if (props.variant === 'danger') return '#dc2626';
      if (props.variant === 'success') return '#059669';
      return props.variant === 'accent' ? COLORS.ACCENT_GRADIENT : '#5568d3';
    }};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${(props) => props.fullWidth && 'width: 100%;'}
  ${(props) => props.small && `padding: ${theme.spacing.xs} ${theme.spacing.md}; font-size: ${theme.fontSizes.sm};`}
  ${(props) => props.large && `padding: ${theme.spacing.md} ${theme.spacing.xl}; font-size: ${theme.fontSizes.lg};`}
  ${(props) => props.loading && 'opacity: 0.7; pointer-events: none;'}
`;

// Modern Card with depth
export const Card = styled.div`
  background: ${COLORS.BG_PRIMARY};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} ${theme.transitions.base};

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-4px);
  }

  ${(props) => props.interactive && `
    cursor: pointer;
    &:active {
      transform: translateY(-2px);
    }
  `}

  ${(props) => props.noPadding && 'padding: 0;'}
`;

// Container with responsive padding
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  width: 100%;
  animation: ${slideInLeft} ${theme.transitions.slow};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

// Modern Grid with gap
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${(props) => props.minWidth || '280px'}, 1fr));
  gap: ${(props) => props.gap || theme.spacing.lg};
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

// Flexible Flex component
export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  gap: ${(props) => props.gap || theme.spacing.md};
  flex-direction: ${(props) => props.direction || 'row'};
  flex-wrap: ${(props) => props.wrap ? 'wrap' : 'nowrap'};

  ${(props) => props.centered && `
    align-items: center;
    justify-content: center;
  `}
`;

// Text component with variants
export const Text = styled.p`
  font-size: ${(props) => props.size || theme.fontSizes.base};
  color: ${(props) => props.color || COLORS.TEXT_PRIMARY};
  font-weight: ${(props) => props.weight || theme.fontWeights.normal};
  margin: ${(props) => props.margin || theme.spacing.md};
  line-height: 1.6;
  
  ${(props) => props.muted && `color: ${COLORS.TEXT_SECONDARY};`}
  ${(props) => props.light && `color: ${COLORS.TEXT_LIGHT};`}
`;

// Heading with gradient support
export const Heading = styled.h1`
  font-size: ${(props) => {
    switch (props.level) {
      case 1: return theme.fontSizes['5xl'];
      case 2: return theme.fontSizes['4xl'];
      case 3: return theme.fontSizes['3xl'];
      case 4: return theme.fontSizes['2xl'];
      case 5: return theme.fontSizes.xl;
      default: return theme.fontSizes['5xl'];
    }
  }};
  color: ${(props) => props.color || COLORS.TEXT_PRIMARY};
  margin: ${(props) => props.margin || `${theme.spacing.lg} 0`};
  font-weight: ${theme.fontWeights.bold};
  line-height: 1.3;

  ${(props) => props.gradient && `
    background: ${COLORS.PRIMARY_GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
`;

// Modern Input with focus states
export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fontFamily.primary};
  background-color: ${COLORS.BG_PRIMARY};
  color: ${COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.fast};

  &::placeholder {
    color: ${COLORS.TEXT_LIGHT};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: ${COLORS.BG_TERTIARY};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) => props.error && `
    border-color: ${COLORS.ERROR};
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `}

  ${(props) => props.success && `
    border-color: ${COLORS.SUCCESS};
    &:focus {
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
  `}
`;

// Modern Textarea
export const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fontFamily.primary};
  background-color: ${COLORS.BG_PRIMARY};
  color: ${COLORS.TEXT_PRIMARY};
  resize: vertical;
  min-height: 120px;
  transition: all ${theme.transitions.fast};

  &::placeholder {
    color: ${COLORS.TEXT_LIGHT};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: ${COLORS.BG_TERTIARY};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) => props.error && `
    border-color: ${COLORS.ERROR};
  `}
`;

// Label
export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
  transition: color ${theme.transitions.fast};

  ${(props) => props.required && `
    &::after {
      content: ' *';
      color: ${COLORS.ERROR};
    }
  `}
`;

// Form Group
export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeIn} ${theme.transitions.slow};

  ${Label} {
    margin-bottom: ${theme.spacing.sm};
  }
`;

// Error message
export const ErrorMessage = styled.span`
  display: block;
  color: ${COLORS.ERROR};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  font-weight: ${theme.fontWeights.medium};
`;

// Success message
export const SuccessMessage = styled.span`
  display: block;
  color: ${COLORS.SUCCESS};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  font-weight: ${theme.fontWeights.medium};
`;

// Modern Badge with gradient
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${(props) => {
    if (props.color === 'danger') return COLORS.ERROR;
    if (props.color === 'success') return COLORS.SUCCESS;
    if (props.color === 'warning') return COLORS.WARNING;
    if (props.color === 'info') return COLORS.INFO;
    return COLORS.PRIMARY;
  }};
  color: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  white-space: nowrap;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }
`;

// Alert component
export const Alert = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  animation: ${fadeIn} ${theme.transitions.base};
  border: 1px solid;
  
  background-color: ${(props) => {
    switch (props.type) {
      case 'error': return 'rgba(239, 68, 68, 0.05)';
      case 'success': return 'rgba(16, 185, 129, 0.05)';
      case 'warning': return 'rgba(245, 158, 11, 0.05)';
      default: return 'rgba(79, 172, 254, 0.05)';
    }
  }};

  color: ${(props) => {
    switch (props.type) {
      case 'error': return COLORS.ERROR;
      case 'success': return COLORS.SUCCESS;
      case 'warning': return COLORS.WARNING;
      default: return COLORS.INFO;
    }
  }};

  border-color: ${(props) => {
    switch (props.type) {
      case 'error': return COLORS.ERROR;
      case 'success': return COLORS.SUCCESS;
      case 'warning': return COLORS.WARNING;
      default: return COLORS.INFO;
    }
  }};

  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-start;
`;

// Divider
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${COLORS.BG_TERTIARY};
  margin: ${(props) => props.margin || `${theme.spacing.lg} 0`};
`;

// Section wrapper
export const Section = styled.section`
  padding: ${(props) => props.padding || `${theme.spacing.xl} ${theme.spacing.lg}`};
  background: ${(props) => props.background || 'transparent'};
  animation: ${fadeIn} ${theme.transitions.slow};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

// Skeleton loading component
export const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    ${COLORS.BG_TERTIARY} 25%,
    ${COLORS.BG_SECONDARY} 50%,
    ${COLORS.BG_TERTIARY} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${theme.borderRadius.md};
  
  height: ${(props) => props.height || '20px'};
  width: ${(props) => props.width || '100%'};
`;

// Pulse animation utility
export const PulseElement = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
