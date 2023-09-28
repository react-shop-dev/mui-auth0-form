import { ReactElement } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Icons: Record<string, ReactElement | null> = {
  apple: <AppleIcon htmlColor="black" />,
  amazon: null,
  bitbucket: null,
  facebook: <FacebookIcon />,
  'google-openid': <GoogleIcon />,
  github: <GitHubIcon />,
  'google-oauth2': <GoogleIcon htmlColor="tomato" />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
  paypal: null,
  twitter: <TwitterIcon />,
};
