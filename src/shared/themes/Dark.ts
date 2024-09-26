import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[800],
            light: blue[500],
            contrastText: "#ffffff"
        },
        secondary: {
            main: green[500],
            dark: green[400],
            light: green[300],
            contrastText: "#ffffff"
        },
        background: {
            default: '#202124',
            paper: '#303134'
        }
    }
})