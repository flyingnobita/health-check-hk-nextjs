import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TranslateIcon from "@material-ui/icons/Translate";
import React from "react";

function GetIconButton(props) {
  return (
    <IconButton
      aria-label="change_language"
      onClick={props.handleLanguageClick}
      className={props.classes.languageIcon}
    >
      <TranslateIcon fontSize="small" />
    </IconButton>
  );
}

function GetLanguageSwitch(props) {
  return (
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
  );
}

export default function Header(props) {
  const useStyles = makeStyles(() => ({
    appBarTitle: {
      flexGrow: 1,
      textAlign: "center",
    },
    languageIcon: {
      color: "#E5E5E5",
    },
  }));
  const classes = useStyles();

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarTitle}>
          {props.language === "en" ? "Hong Kong Body Checks" : "香港健康檢查"}
        </Typography>
        {props.wideScreen ? (
          <GetLanguageSwitch
            language={props.language}
            handleLanguage={props.handleLanguage}
          />
        ) : (
          <GetIconButton
            handleLanguageClick={props.handleLanguageClick}
            classes={classes}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
