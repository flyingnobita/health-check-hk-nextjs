import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ScreenRotationIcon from "@material-ui/icons/ScreenRotation";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { HEAD_TITLE_CN, HEAD_TITLE_EN } from "../components/settings";
import ShareButton from "./ShareButton";

const useStyles = makeStyles((theme) => ({
  languageIcon: {
    color: "white",
  },
  screenRotationIcon: {
    marginRight: "10px",
  },
  rotationAlert: {
    backgroundColor: "black",
    color: theme.palette.primary.main,
    borderRadius: "0px",
  },
}));

function GetLanguageSwitch(props) {
  return (
    <Typography component="div" style={{ padding: "12px" }}>
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

  let screenRotationAlert = null;
  if (!props.minLandscape) {
    screenRotationAlert = (
      <React.Fragment>
        <Collapse in={open}>
          <Alert
            icon={false}
            severity="info"
            className={classes.rotationAlert}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ScreenRotationIcon className={classes.screenRotationIcon} />
              {props.language === "en"
                ? "Please rotate your screen for best view"
                : "請旋轉您的手機，網頁會更易睇"}
            </div>
          </Alert>
        </Collapse>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              {props.minLandscape ? (
                <GetLanguageSwitch
                  language={props.language}
                  handleLanguage={props.handleLanguage}
                />
              ) : (
                <IconButton
                  aria-label="change_language"
                  onClick={props.handleLanguageClick}
                  className={classes.languageIcon}
                >
                  <Typography variant="body1">
                    {props.language === "en" ? "中" : "EN"}
                  </Typography>
                </IconButton>
              )}
            </Grid>
            <Grid item style={{ flexGrow: 1 }} align="center">
              <Button variant="text" onClick={props.handleHospitalInfoClick}>
                <Typography variant="h6" style={{ color: "white" }}>
                  {props.language === "en" ? HEAD_TITLE_EN : HEAD_TITLE_CN}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ShareButton language={props.language} />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {screenRotationAlert}
    </React.Fragment>
  );
}
