import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShotclockView from './ShotclockView';

const theme = createTheme({
  palette: { mode: 'dark' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ShotclockView />
    </ThemeProvider>
  );
}

export default App;
