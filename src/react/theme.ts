import { createTheme } from '@mui/material/styles';
import { amber, blue } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    mode: "dark",
    primary: amber,
    secondary: blue,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: "36px"
    }
  }
});


export default theme;