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

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarTitle}>
          {props.language === "en" ? "HK Body Checks" : "香港健康檢查"}
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
