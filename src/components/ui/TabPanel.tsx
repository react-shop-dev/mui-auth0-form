import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  sx?: SxProps;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, ...sx }}>{children}</Box>}
    </div>
  );
};
