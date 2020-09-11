import { createMuiTheme } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
  typography: {
    fontFamily: `"Noto Sans HK", "Roboto", "Helvetica", 
    "Arial", sans-serif`,
  },
  palette: {
    primary: {
      light: "#8DD4D8",
      main: "#68C5CA",
      dark: "#43B5BC",
    },
    secondary: {
      main: "#68C5CA",
    },
    background: {
      default: "#fff",
    },
  },
});

const muiTheme = createMuiTheme(
  {
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          color: "white",
          backgroundColor: globalTheme.palette.primary.main,
        },
      },
      MuiToolbar: {
        gutters: {
          paddingLeft: "5px",
          paddingRight: "5px",
        },
      },
      // language toggle
      MuiSwitch: {
        colorSecondary: {
          color: "#E5E5E5",
          "&$checked": {
            "& + $track": {
              backgroundColor: "#E5E5E5",
            },
          },
        },
        thumb: {
          color: "#E5E5E5",
        },
        track: {
          color: "#E5E5E5",
        },
      },
      // plan types, gender, location, hospital
      MuiToggleButton: {
        root: {
          lineHeight: 1.3,
          color: globalTheme.palette.primary.main,
          "&$selected": {
            backgroundColor: globalTheme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: globalTheme.palette.primary.dark,
            },
          },
          "&:hover": {
            backgroundColor: globalTheme.palette.primary.light,
          },
        },
      },
      // Spot an Error?, Terms, Privacy
      MuiButton: {
        // backgroundColor: "#000",
        label: {
          color: globalTheme.palette.primary.main,
        },
      },
      MuiInputBase: {
        input: {
          color: globalTheme.palette.primary.dark,
          fontSize: "14px",
        },
      },
      MuiSlider: {
        markLabel: {
          fontSize: "0.75rem",
        },
      },
    },
    props: {
      MuiToggleButton: {
        disableRipple: true,
      },
      MuiButton: {
        disableRipple: true,
      },
    },
  },
  globalTheme
);

export default muiTheme;
