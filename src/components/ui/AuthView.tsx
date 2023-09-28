import {
  useState,
  SyntheticEvent,
  ReactNode,
  isValidElement,
  SetStateAction,
  ComponentType,
} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import { TabPanel } from '../ui/TabPanel';
import TopBar from '../ui/TopBar';
import CardView from '../ui/CardView';

export interface AuthViewProps {
  signInTitle?: string;
  signUpTitle?: string;
  formHeader?: ComponentType;
  signIn: ({
    redirectToForgotPassword,
  }: {
    redirectToForgotPassword: () => SetStateAction<void>;
  }) => ReactNode;
  signUp: () => ReactNode | null;
  forgotPassword?: ReactNode;
}

const AuthView = (props: AuthViewProps) => {
  const {
    signIn,
    signUp,
    signInTitle = 'Sign In',
    signUpTitle = 'Sign Up',
    formHeader: FormHeader = TopBar,
    forgotPassword,
  } = props;

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const forgotPasswordMode = value === 2;

  const signInProps = { redirectToForgotPassword: () => setValue(2) };

  const renderTabs = () => (
    <Box>
      {!forgotPasswordMode && (
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={signInTitle} />
          <Tab label={signUpTitle} />
        </Tabs>
      )}
      <TabPanel value={value} index={0}>
        {signIn(signInProps)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {signUp()}
      </TabPanel>
    </Box>
  );

  const renderForgotPassword = () =>
    isValidElement(forgotPassword) ? (
      <Slide
        in={forgotPasswordMode}
        direction="left"
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 300, exit: 0 }}
      >
        {forgotPassword}
      </Slide>
    ) : null;

  return (
    <CardView>
      <FormHeader showBackIcon={forgotPasswordMode} handleClick={() => setValue(0)} />
      <Grow in timeout={{ enter: 1000, exit: 0 }}>
        {isValidElement(signUp()) ? (
          renderTabs()
        ) : (
          <Box>
            <Box display="flex" justifyContent="center">
              <Tab label={signInTitle} disableRipple component="div" sx={{ fontSize: '18px' }} />
            </Box>
            <TabPanel value={value} index={0}>
              {signIn(signInProps)}
            </TabPanel>
          </Box>
        )}
      </Grow>
      {renderForgotPassword()}
    </CardView>
  );
};

export default AuthView;
