import { styled } from '@mui/material/styles';
import { Property } from 'csstype';

const PREFIX = 'AuthLayout';

export const Layout = styled('div', {
  name: PREFIX,
  shouldForwardProp: prop => prop !== 'backgroundColor',
})<{ backgroundColor?: Property.Color }>(({ theme, backgroundColor }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  backgroundColor: backgroundColor || theme.palette.grey[200],
}));
