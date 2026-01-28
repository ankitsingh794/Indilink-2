import { createGlobalStyle } from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fontFamily.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${COLORS.TEXT_PRIMARY};
    background-color: ${COLORS.BG_PRIMARY};
    line-height: 1.6;
    font-size: ${theme.fontSizes.base};
  }

  code {
    font-family: ${theme.fontFamily.mono};
    background-color: ${COLORS.BG_TERTIARY};
    border-radius: ${theme.borderRadius.sm};
    padding: 2px 6px;
  }

  pre {
    background-color: ${COLORS.BG_TERTIARY};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
    overflow-x: auto;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  a {
    color: ${COLORS.PRIMARY};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${COLORS.PRIMARY_DARK};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Selection styling */
  ::selection {
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }

  /* Scrollbar styling - Modern */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.BG_TERTIARY};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.PRIMARY};
    border-radius: ${theme.borderRadius.full};
    transition: background ${theme.transitions.fast};
    
    &:hover {
      background: ${COLORS.PRIMARY_DARK};
    }
  }

  /* Firefox scrollbar */
  * {
    scrollbar-color: ${COLORS.PRIMARY} ${COLORS.BG_TERTIARY};
    scrollbar-width: thin;
  }

  /* Focus visible for accessibility */
  :focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;
