import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import TranslateIcon from "@material-ui/icons/Translate";
import React from "react";

const useStyles = makeStyles(() => ({
  appBarTitle: {
    flexGrow: 1,
    textAlign: "center",
  },
  icon: {
    color: "#FFFFFF",
  },
}));

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
  const classes = useStyles();

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <IconButton
          aria-label="hospital-info"
          onClick={props.handleHospitalInfoClick}
        >
          {props.page === "table" ? (
            <InfoIcon fontSize="small" className={classes.icon} />
          ) : (
            <HomeIcon fontSize="small" className={classes.icon} />
          )}
        </IconButton>
        <Typography variant="h6" className={classes.appBarTitle}>
          {props.language === "en" ? "Hong Kong Body Checks" : "香港健康檢查"}
        </Typography>
        {props.wideScreen ? (
          <GetLanguageSwitch
            language={props.language}
            handleLanguage={props.handleLanguage}
          />
        ) : (
          <IconButton
            aria-label="change_language"
            onClick={props.handleLanguageClick}
            className={classes.icon}
          >
            <TranslateIcon fontSize="small" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
