import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function Header(props) {
  const useStyles = makeStyles(() => ({
    appBarTitle: {
      flexGrow: 1,
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  const getTitle = function () {
    if (props.language === "en") {
      {
        if (props.wideScreen) {
          return "Hong Kong Body Checks";
        } else {
          return "HK Body Check";
        }
      }
    } else {
      return "香港健康檢查";
    }
  };

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarTitle}>
          {getTitle()}
        </Typography>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={0}>
            <Grid item>中</Grid>
            <Grid item>
              <Switch
                checked={props.language === "en"}
                onChange={props.handleLanguage}
                inputProps={{
                  "aria-label": "language switch",
                }}
                id="language-switch"
              />
            </Grid>
            <Grid item>EN</Grid>
          </Grid>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
