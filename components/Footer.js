import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PrivacyDialog from "./PrivacyDialog";
import TermsDialog from "./TermsDialog";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#000",
    paddingTop: "4px",
    paddingBottom: "16px",
  },
  gridDialogButton: {
    flexGrow: 0,
  },
  copyright: {
    textAlign: "center",
    lineHeight: 1,
    color: "#68C5CA",
    fontSize: "10pt",
  },
}));

export default function Footer() {
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
      <Typography component="div" className={classes.copyright}>
        © Hong Kong Body Checks
      </Typography>
    </Paper>
  );
}
