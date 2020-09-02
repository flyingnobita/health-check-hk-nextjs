import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
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

export default function PrivacyDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button color="primary" onClick={handleClickOpen}> */}
      <Button onClick={handleClickOpen}>Privacy</Button>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Privacy Policy
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
            1 What This Privacy Policy Covers
          </Typography>
          <Typography gutterBottom>
            1.1 This policy covers how bodycheck.flyingnobita.com (the
            "Website") treats personal information that the Website collects and
            receives, including information related to your past use of our
            products and services. Personal information is information about you
            that is personally identifiable like your name, address, email
            address, or phone number, and that is not otherwise publicly
            available. This Privacy Policy does not apply to the practices of
            companies that the Website does not own or control, or to people
            that the Website does not employ or manage.
          </Typography>
          <Typography gutterBottom variant="h6">
            2 Information Collection and Use
          </Typography>
          <Typography gutterBottom>
            2.1 The Website collects personal information when visit the
            Website. The Website may combine information about you that we have
            with information we obtain from business partners or other
            companies. The Website automatically receives and records
            information from your computer and browser, including your IP
            address, the Website cookie information, software and hardware
            attributes, and the page you request. The Website uses the
            information for the following general purposes: to fulfill your
            requests for products and services, improve our services, contact
            you, conduct research, and provide anonymous reporting for internal
            and external clients.
          </Typography>
          <Typography gutterBottom variant="h6">
            3. Disclosure of information
          </Typography>
          <Typography gutterBottom>
            3.1 The Website does not rent, sell, or share personal information
            about you with other people or non-affiliated companies except to
            provide products or services you've requested, when we have your
            permission, or under the following circumstances:
          </Typography>
          <Typography gutterBottom>
            3.1.1 We provide the information to trusted partners who work on
            behalf of or with the Website under confidentiality agreements.
            These companies may use your personal information to help the
            Website communicate with you about offers from the Website and our
            marketing partners. However, these companies do not have any
            independent right to share this information, except to the extent
            required by law.
          </Typography>
          <Typography gutterBottom>
            3.1.2 We respond to subpoenas, court orders, or legal process, or to
            establish or exercise our legal rights or defend against legal
            claims.
          </Typography>
          <Typography gutterBottom>
            3.1.3 We believe it is necessary to share information in order to
            investigate, prevent, or take action regarding illegal activities,
            suspected fraud, situations involving potential threats to the
            physical safety of any person, violations of Price’s terms of use,
            or as otherwise required by law.
          </Typography>
          <Typography gutterBottom>
            3.1.4 In response to a court order under HKSAR Law (Ordinance V,
            Section 58).
          </Typography>
          <Typography gutterBottom>
            3.1.5 We transfer information about you if the Website is acquired
            by or merged with another company. In this event, the Website will
            notify you before information about you is transferred and becomes
            subject to a different privacy policy.
          </Typography>
          <Typography gutterBottom variant="h6">
            4 Cookie
          </Typography>
          <Typography gutterBottom>
            4.1 The Website uses cookies on our website.
          </Typography>
          <Typography gutterBottom variant="h6">
            5 Confidentiality and Security
          </Typography>
          <Typography gutterBottom>
            5.1 The Website limits accesses to information about you to
            employees who we believe reasonably need to come into contact with
            that information to provide products or services to you or in order
            to do their jobs. We have physical, electronic, and procedural
            safeguards that comply with our legal obligations to protect
            information about you.
          </Typography>
          <Typography gutterBottom variant="h6">
            6 Changes to this Privacy Policy
          </Typography>
          <Typography gutterBottom>
            6.1 The Website may amend this policy from time to time. If we make
            any substantial changes in the way we use your information we will
            notify you by posting a prominent notice on our pages.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
