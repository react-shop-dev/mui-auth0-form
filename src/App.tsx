import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './components/ui/Layout';
import AuthClientProvider from './client/AuthClientProvider';
import AuthCore from './auth/AuthCore';
import { Property } from 'csstype';

export interface AppProps {
  response: any;
  theme?: ThemeOptions;
  backgroundColor?: Property.Color;
}

const App = (props: AppProps) => {
  const { response, theme: themeProps, backgroundColor } = props;

  const theme = createTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout backgroundColor={backgroundColor}>
        {response instanceof Error ? (
          response.message
        ) : (
          <AuthClientProvider value={response}>
            <AuthCore />
          </AuthClientProvider>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
