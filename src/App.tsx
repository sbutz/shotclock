import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShotclockView from './ShotclockView';
import { customAlphabet } from "nanoid";
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorView from './ErrorView';
import ShareView from './ShareView';
import PlayerView from './PlayerView';

const nanoid = customAlphabet("123456789ABCDEFGHIJKLMNPQRSTUVWXYZ", 5);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${nanoid()}`} />,
  },
  {
    path: "/:id",
    element: <ShotclockView />,
  },
  {
    path: "s/:id",
    element: <ShareView />,
  },
  {
    path: "v/:id",
    element: <PlayerView />,
  },
  {
    path: "*",
    element: <ErrorView/>,
  },
]);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
