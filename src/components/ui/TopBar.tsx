import { ComponentType } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardViewClasses } from './CardView';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { SxProps } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

export interface FormHeaderProps {
  showBackIcon?: boolean;
  handleClick?: () => void;
  logo?: ComponentType<SvgIconProps | any>;
  sx?: SxProps;
}

const FormHeader = ({ showBackIcon, handleClick, logo: Icon = LockIcon, sx }: FormHeaderProps) => {
  return (
    <Box className={CardViewClasses.topBar}>
      {showBackIcon && (
        <IconButton className={CardViewClasses.backArrow} onClick={handleClick}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Avatar sx={{ backgroundColor: deepOrange[500], ...sx }}>
        <Icon />
      </Avatar>
    </Box>
  );
};

export default FormHeader;
