import {
  Button,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik } from "formik";
import { RadioGroup, Select, TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingRight: "50px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  feedBackFromButton: {
    // color: "red",
  },
  fieldTitleLabel: {
    // color: "black",
    fontWeight: "bold",
    marginTop: "5px",
    marginBottom: "5px",
  },
  select: {
    // color: "black",
    marginTop: "5px",
  },
  underline: {
    "&:before": { borderBottom: "1px solid black" },
  },
  OutlineInput: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  OutlineInputLabel: {
    // color: "black",
  },
  grid: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

function AlertSubmitStatus({ handleAlertClose, serverState }) {
  if (serverState) {
    return (
      <Snackbar
        open={!!serverState}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={serverState.ok ? "success" : "warning"}
        >
          {serverState.msg}
        </Alert>
      </Snackbar>
    );
  } else {
    return null;
  }
}

function FeedbackForm({ hospitalInfo, language }) {
  const classes = useStyles();

  const [open, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const formInitialValues = {
    feedbackType: "bodyCheckPlans",
    hospital: "Canossa",
    description: "",
    email: "",
  };

  const handleValidate = (values) => {
    let errors = {};

    // check description
    if (!values.description.trim()) {
      language === "en"
        ? (errors.description = "Please put in details to help us correct")
        : (errors.description = "麻煩您幫手講解錯處等我們可以更正");
    }

    // check email
    if (values.email) {
      values.email.trim();
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())
      ) {
        language === "en"
          ? (errors.email = "Email doesn't seem right...")
          : (errors.email = "電郵有啲不對...");
      }
    }

    return errors;
  };

  const handleOnSubmit = (values, actions) => {
    const url = "https://formspree.io/mpzygwby";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(values),
    };

    fetch(url, options)
      .then((response) => {
        actions.setSubmitting(false);
        if (response.status === 200) {
          actions.resetForm();
          handleServerResponse(
            true,
            language === "en"
              ? "Your feedback has been submitted, thank you!"
              : "多謝您的意見!"
          );
        } else {
          handleServerResponse(
            false,
            language === "en"
              ? "There seems to be an error, please submit again."
              : "不好意思,請再提交"
          );
        }
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setServerState();
  };

  return (
    <Grid container>
      <Grid item xs={1} className={classes.grid} />
      <Grid item xs={10} align="center" className={classes.grid}>
        <Button onClick={handleDialogOpen}>
          {language === "en"
            ? "Spot an error? Have comments? Let us know!"
            : "有錯處? 有意見? 請話我知!"}
        </Button>
        <Dialog
          fullWidth={true}
          onClose={handleDialogClose}
          aria-labelledby="feedback-dialog"
          open={open}
        >
          <DialogTitle id="feedback-dialog-title" onClose={handleDialogClose}>
            {language === "en"
              ? "Spot an error? Have comments? Let us know!"
              : "有錯處? 有意見? 請話我知!"}
          </DialogTitle>
          <DialogContent dividers>
            <Formik
              initialValues={formInitialValues}
              validate={handleValidate}
              onSubmit={handleOnSubmit}
            >
              {({ values, submitForm, isSubmitting, errors, touched }) => (
                <Form>
                  {/* Form Title */}
                  <FormLabel
                    component="legend"
                    classes={{ root: classes.fieldTitleLabel }}
                  >
                    {language === "en" ? "What is the error?" : "錯處係邊?"}
                  </FormLabel>
                  {/* Error Type Radio Group */}
                  <Field component={RadioGroup} name="feedbackType" row>
                    <FormControlLabel
                      value="bodyCheckPlans"
                      control={<Radio disabled={isSubmitting} />}
                      label={
                        language === "en" ? "Body Check Plans" : "健康檢查計劃"
                      }
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value="others"
                      control={<Radio disabled={isSubmitting} />}
                      label={language === "en" ? "Others" : "其他"}
                      disabled={isSubmitting}
                    />
                  </Field>
                  {/* Hospital Select */}
                  {values.feedbackType === "bodyCheckPlans" && (
                    <React.Fragment>
                      <InputLabel
                        htmlFor="hospital"
                        classes={{ root: classes.fieldTitleLabel }}
                      >
                        {language === "en" ? "Which hospital?" : "邊間醫院？"}
                      </InputLabel>
                      <Field
                        component={Select}
                        name="hospital"
                        classes={{
                          root: classes.select,
                          icon: classes.select,
                        }}
                        id="hospitalSelect"
                        input={
                          <Input
                            classes={{
                              underline: classes.underline,
                            }}
                          />
                        }
                      >
                        {hospitalInfo.map((hospital) => (
                          <MenuItem
                            key={hospital.hospital}
                            value={hospital.hospital}
                            aria-label={hospital.hospital}
                            className="filter-selection"
                          >
                            {language === "en"
                              ? hospital.hospital
                              : hospital.hospitalCN}
                          </MenuItem>
                        ))}
                      </Field>
                      <br />
                      <br />
                    </React.Fragment>
                  )}
                  {/* Description */}
                  <Field
                    component={TextField}
                    label={
                      language === "en" ? "Describe the error" : "錯處描述"
                    }
                    placeholder={
                      language === "en"
                        ? "Please tell us what you see incorrect"
                        : "請詳情描述錯處"
                    }
                    name="description"
                    variant="outlined"
                    fullWidth
                    InputProps={{ notched: true, multiline: true }}
                    InputLabelProps={{
                      shrink: true,
                      classes: {
                        root: classes.OutlineInputLabel,
                      },
                    }}
                    classes={{
                      root: classes.OutlineInput,
                    }}
                    error={touched["description"] && !!errors["description"]}
                    helperText={touched["description"] && errors["description"]}
                  />

                  {/* Email */}
                  <br />
                  <br />
                  <Field
                    component={TextField}
                    label={
                      language === "en" ? "Email (optional)" : "電郵 (非必要)"
                    }
                    placeholder={
                      language === "en"
                        ? "We can contact you when it's corrected"
                        : "更正後可以通知您"
                    }
                    name="email"
                    variant="outlined"
                    fullWidth
                    InputProps={{ notched: true }}
                    InputLabelProps={{
                      shrink: true,
                      classes: {
                        root: classes.OutlineInputLabel,
                      },
                    }}
                    error={!!errors["email"]}
                    helperText={errors["email"]}
                  />

                  {/* Submit Button */}
                  <br />
                  <br />
                  <Button
                    variant="outlined"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {language === "en" ? "Submit" : "提交"}
                  </Button>
                  <br />
                  <br />

                  {/* Submit Progress Bar */}
                  {isSubmitting && (
                    <React.Fragment>
                      <LinearProgress />
                    </React.Fragment>
                  )}

                  {/* Submit Result Snackbar */}
                  <AlertSubmitStatus
                    serverState={serverState}
                    handleAlertClose={handleAlertClose}
                  />
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={1} className={classes.grid} />
    </Grid>
  );
}

FeedbackForm.propTypes = {
  hospitalInfo: PropTypes.array,
  language: PropTypes.string,
};

export default withStyles(styles)(FeedbackForm);
