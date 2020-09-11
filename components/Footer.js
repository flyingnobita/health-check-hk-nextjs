import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { HEAD_TITLE_EN, LAST_UPDATED } from "../components/settings";
import PrivacyDialog from "./PrivacyDialog";
import TermsDialog from "./TermsDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#000",
    paddingTop: "4px",
    paddingBottom: "16px",
  },
  gridDialogButton: {
    flexGrow: 0,
    paddingTop: "4px",
  },
  informationSourceButton: {
    padding: 0,
    textTransform: "none",
  },
  copyrightLastUpdateContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  copyrightLastUpdateContainerNarrow: {
    paddingTop: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  copyrightContainer: {
    paddingTop: "20px",
    paddingBottom: "10px",
  },
  copyrightText: {
    textAlign: "center",
    lineHeight: 1,
    color: theme.palette.primary.main,
    fontSize: "10pt",
  },
  lastUpdated: {
    textAlign: "center",
    lineHeight: 1,
    color: theme.palette.primary.main,
    fontSize: "12px",
    paddingBottom: "px",
  },
}));

const Copyright = (props) => (
  <Typography component="div" className={props.copyright}>
    © {HEAD_TITLE_EN}
  </Typography>
);

const InformationSourceButton = (props) => (
  <Button
    onClick={props.handleInformationSource}
    className={props.informationSourceButton}
    style={{
      fontSize: "12px",
    }}
  >
    {props.language === "en"
      ? "Information Source: Hospital Websites"
      : "資料來源: 醫院網頁"}
  </Button>
);

const LastUpdated = (props) => (
  <Typography component="span" className={props.lastUpdated}>
    {props.language === "en" ? "Last Updated: " : "最後更新: "} {LAST_UPDATED}
  </Typography>
);

export default function Footer({
  language,
  handleInformationSource,
  minFooterText,
}) {
  const classes = useStyles();

  let footerText;
  if (minFooterText) {
    footerText = (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.copyrightLastUpdateContainer}
      >
        <Grid item>
          <Copyright copyright={classes.copyrightText}></Copyright>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-end"
            className={classes.copyrightLastUpdateContainer}
          >
            <InformationSourceButton
              language={language}
              handleInformationSource={handleInformationSource}
              informationSourceButton={classes.informationSourceButton}
            ></InformationSourceButton>
            <LastUpdated
              language={language}
              lastUpdated={classes.lastUpdated}
            ></LastUpdated>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    footerText = (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.copyrightLastUpdateContainerNarrow}
      >
        <Grid item>
          <InformationSourceButton
            language={language}
            handleInformationSource={handleInformationSource}
            informationSourceButton={classes.informationSourceButton}
          ></InformationSourceButton>
        </Grid>
        <Grid item>
          <LastUpdated
            language={language}
            lastUpdated={classes.lastUpdated}
          ></LastUpdated>
        </Grid>
        <Grid item className={classes.copyrightContainer}>
          <Copyright copyright={classes.copyrightText}></Copyright>
        </Grid>
      </Grid>
    );
  }

  return (
    <Paper className={classes.paper} square>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs className={classes.gridDialogButton}>
          <TermsDialog />
        </Grid>
        <Grid item xs className={classes.gridDialogButton}>
          <PrivacyDialog />
        </Grid>
      </Grid>
      {footerText}
    </Paper>
  );
}
