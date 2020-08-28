import { createMuiTheme } from "@material-ui/core/styles";

export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: `"-apple-system", "BlinkMacSystemFont",
    "Segoe UI", "Noto Sans HK", "Roboto", "Helvetica", 
    "Arial", sans-serif`,
  },
  palette: {
    background: {
      default: "#1d3557",
    },
    // pivot table column and row header text color
    // text: {
    // primary: "#f1faee",
    // },
    primary: {
      main: "#1d3557",
      contrastText: "#f1faee",
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#457b9d",
      },
    },
    // price filter
    MuiSlider: {
      thumb: {
        color: "#a8dadc",
      },
      track: {
        color: "#a8dadc",
      },
      rail: {
        color: "#457b9d",
      },
      markLabel: {
        color: "#457b9d",
      },
      markLabelActive: {
        color: "#f1faee",
      },
    },
    // location, hospital, gender
    MuiToggleButton: {
      root: {
        color: "#f1faee",
        "&$selected": {
          backgroundColor: "#f1faee",
          "&:hover": {
            backgroundColor: "#457b9d",
            color: "#f1faee",
          },
        },
        "&:hover": {
          backgroundColor: "#457b9d",
        },
      },
    },
    // (not used) select dropdown for the language select button
    MuiSelect: {
      select: {
        "&:not([multiple]) option": {
          color: "black",
          backgroundColor: "#f1faee",
        },
        color: "#f1faee",
      },
      icon: {
        color: "#f1faee",
      },
    },
    // language toggle
    MuiSwitch: {
      colorSecondary: {
        color: "#f1faee",
        "&$checked": {
          "& + $track": {
            backgroundColor: "#e63946",
          },
        },
      },
      thumb: {
        color: "#f1faee",
      },
      track: {
        color: "#f1faee",
      },
    },
    // all hyper-links
    MuiLink: {
      root: {
        color: "#e63946",
      },
    },
    MuiInputLabel: {
      root: {
        color: "#f1faee",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${"#f1faee"}`,
        },
        "&:hover:not($disabled):before": {
          borderBottom: `2px solid ${"#f1faee"}`,
        },
      },
    },
    MuiButton: {
      label: {
        color: "#f1faee",
      },
    },
  },
});
