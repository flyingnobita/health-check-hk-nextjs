import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ScreenRotationIcon from "@material-ui/icons/ScreenRotation";
import TranslateIcon from "@material-ui/icons/Translate";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { HEAD_TITLE_CN, HEAD_TITLE_EN } from "../components/settings";
import ShareButton from "./ShareButton";

const useStyles = makeStyles((theme) => ({
  appBarTitle: {
    flexGrow: 1,
    textAlign: "center",
  },
  icon: {
    color: "white",
  },
  alertBanner: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  screenRotationIcon: {
    marginRight: "10px",
  },
  alert: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
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
  const [open, setOpen] = React.useState(true);

  let screenRotationAlert;
  if (!props.wideScreen) {
    if (typeof window !== "undefined") {
      if (window.innerHeight > window.innerWidth) {
        screenRotationAlert = (
          <div className={classes.alertBanner}>
            <Collapse in={open}>
              <Alert
                icon={false}
                severity="info"
                className={classes.alert}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <ScreenRotationIcon
                      className={classes.screenRotationIcon}
                    />
                  </Grid>
                  <Grid item>
                    {props.language === "en"
                      ? "Please rotate your screen for best view"
                      : "請旋轉您的手機，網頁會更易睇"}
                  </Grid>
                </Grid>
              </Alert>
            </Collapse>
          </div>
        );
      }
    }
  }

  return (
    <React.Fragment>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <IconButton
            aria-label="hospital-info"
            onClick={props.handleHospitalInfoClick}
          >
            {props.page === "table" ? (
              <InfoIcon className={classes.icon} />
            ) : (
              <HomeIcon className={classes.icon} />
            )}
          </IconButton>
          <Typography variant="h6" className={classes.appBarTitle}>
            {props.language === "en" ? HEAD_TITLE_EN : HEAD_TITLE_CN}
          </Typography>
          <ShareButton language={props.language} />
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
      {/* {screenRotationAlert} */}
    </React.Fragment>
  );
}
