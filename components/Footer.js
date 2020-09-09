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
  },
  informationSourceButton: {
    padding: 0,
    textTransform: "none",
  },
  copyrightLastUpdateContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  copyright: {
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
  },
}));

export default function Footer({ language, handleInformationSource }) {
  const classes = useStyles();

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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.copyrightLastUpdateContainer}
      >
        <Grid item>
          <Typography component="div" className={classes.copyright}>
            © {HEAD_TITLE_EN}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-end"
            className={classes.copyrightLastUpdateContainer}
          >
            <Button
              onClick={handleInformationSource}
              className={classes.informationSourceButton}
              style={{ fontSize: "12px" }}
            >
              {language === "en"
                ? "Information Source: Hospital Websites"
                : "資料來源: 醫院網頁"}
            </Button>
            <Typography component="span" className={classes.lastUpdated}>
              {language === "en" ? "Last Updated: " : "最後更新: "}{" "}
              {LAST_UPDATED}
            </Typography>
            <Typography
              component="span"
              className={classes.copyright}
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
