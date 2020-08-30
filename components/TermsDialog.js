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
    color: theme.palette.grey[500],
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

export default function TermsDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Terms
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Terms of Use & Disclaimer
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Use of HK Body Checks' websites including but not limited to
            bodycheck.flyingnobita.com (the "Website") and all electronic mail
            or communication services provided by HK Body Checks ("HKBC"),
            including but not limited to any online group discussions,
            electronic newsletters is subject to the terms and conditions set
            forth below ("Terms of Use & Disclaimer"). Please read the Terms of
            Use & Disclaimer on the Website before using the Services. However
            by continuing to use the Services each subscriber, user and/or
            recipient of the Services irrevocably and unconditionally accepts
            and agrees to be bound by the Terms of Use & Disclaimer as the same
            may be amended from time to time and any amendment to the Terms of
            Use & Disclaimer shall be effective immediately upon posting on the
            Website.
          </Typography>
          <Typography gutterBottom variant="h6">
            1 General Rules
          </Typography>
          <Typography gutterBottom>
            1.1 By registering for and/or using or receiving the Services, you,
            being the subscriber, recipient or user of the Services, accept and
            agree to be bound by the Terms of Use & Disclaimer throughout the
            process and use of the Services from time to time. HKBC reserves the
            right to modify the Terms of Use & Disclaimer or any features of the
            Services at any time without prior notice or consent to any user to
            the Services and such modification shall be effective immediately
            upon either posting on the Website or notifying you as the case may
            be.
          </Typography>
          <Typography gutterBottom>
            1.2 You represent that you have read and agree to be bound by these
            Terms of Use & Disclaimer.
          </Typography>
          <Typography gutterBottom>
            1.3 The Website are offered and available to users who are 18 years
            of age or older. By using the Website, you represent and warrant
            that you meet the foregoing eligibility requirement. If you do not
            meet this requirement, you must not access or use the Website.
          </Typography>
          <Typography gutterBottom variant="h6">
            2 Content
          </Typography>
          <Typography gutterBottom>
            2.1 The information contained on the Website is compiled by HKBC for
            general reference and information purposes only. Whilst efforts will
            be made to improve accuracy, HKBC gives no express or implied
            guarantee or warranty as to the accuracy, completeness, timeliness
            or usefulness of the information on the Website or information
            provided through links to third party websites or that the
            information will be up-to-date.
          </Typography>
          <Typography gutterBottom>
            2.2 Information on the Website is not medical advice, diagnosis or
            treatment in general or for any particular individual case or
            patient and should not be treated as a substitute for professional
            medical advice, diagnosis or treatment.
          </Typography>
          <Typography gutterBottom>
            2.3 The material presented on our website is protected by the
            copyright laws of Hong Kong. It may not be distributed, reproduced,
            republished, cached, transmitted, modified, used for derivative
            works, sold or exploited in any way, except if you had Our prior
            written consent.
          </Typography>
          <Typography gutterBottom variant="h6">
            3 Limitations of Liability
          </Typography>
          <Typography gutterBottom>
            3.1 To the extent permitted by law, HKBC shall not be liable for any
            error in or omission from or any misstatement or misrepresentation
            in the information on the Website and HKBC expressly disclaims and
            excludes any obligation, responsibility or liability of whatever
            nature for any loss, damage, costs or expenses (whether direct,
            indirect or consequential) arising from or in respect of the
            Website, any content or service or any compilation, use, misuse or
            reliance of the Website or the information appearing on it or
            provided through links to third party websites.
          </Typography>
          <Typography gutterBottom>
            3.2 No warranty is given that the Website or the information on it
            will be available uninterrupted or free from delay, errors, virus or
            bugs. Further, HKBC excludes any liability of whatever nature for
            error, failure, interruption or delay in the performance of the
            Website at any time.
          </Typography>
          <Typography gutterBottom variant="h6">
            4 Third Party Links
          </Typography>
          <Typography gutterBottom>
            4.1 To facilitate access by users to information provided by or via
            other parties, the Website may provide or assist in providing links
            to third party websites through its pages. HKBC shall not be
            responsible for information on the Website appearing through links
            to third party websites. Provision of such links on the Website is
            solely for your convenience and does not give rise to any statement,
            representation, endorsement or warranty by HKBC with respect to such
            third party websites or any other product or service provided by or
            through such websites. Such information on those third party
            websites has been compiled and issued by those parties and that HKBC
            has no control over those third party websites or the information
            provided thereon. You should follow all access and security
            procedures provided by the Website and such policies and terms of
            use under such third party websites.
          </Typography>
          <Typography gutterBottom variant="h6">
            5 Use of Content
          </Typography>
          <Typography gutterBottom>
            5.1 HKBC allows you to link to the Website, provided that all the
            following conditions are fulfilled:
          </Typography>
          <Typography>
            5.1.a The link and the website on which the link appears must be for
            non-commercial purpose. For example, the link and the website on
            which the link appears must not be for sale or for advertising,
            offering, promoting or soliciting any business, trade, goods and/or
            services for benefit, gain, profit or reward.
          </Typography>
          <Typography>
            5.1.b You may link only to the homepage of the Website, i.e.
            bodycheck.flyingnobita.com, but not to any sub-pages or any texts,
            graphics, videos, audio clips, drawings, diagrams, photographs,
            compilation of data, or any other materials on the Website.
          </Typography>
          <Typography>5.1.c. No framing is permitted.</Typography>
          <Typography>
            5.1.d The link must not suggest, indicate, represent or create
            confusion (or a likelihood thereof) as to any form of association,
            approval or endorsement on the part of HKBC. The link must not
            appear on or be connected with any website which contains or links
            to any material which is libellous, defamatory, discriminatory,
            pornographic, obscene, or is in any way in breach of the laws of
            Hong Kong SAR or infringes any intellectual property rights, or is
            otherwise considered by HKBC in its sole discretion to be
            undesirable or contrary to HKBC's policies.
          </Typography>
          <Typography gutterBottom>
            5.2 This permission to link does not extend to any materials on the
            linked websites or any contents on the Website where the copyright
            or intellectual property of which belongs to a third party.
          </Typography>
          <Typography gutterBottom>
            5.3 HKBC may in its sole discretion require the removal of any link
            to the Website at any time for breach of this Terms of Use &
            Disclaimer or otherwise.
          </Typography>
          <Typography gutterBottom>
            5.4 HKBC is not responsible for the set-up of any link to the
            Website or for the contents of any website on which such links
            appear. This permission to link does not constitute any form of
            association, approval or endorsement on the part of HKBC. HKBC
            disclaims any liability arising from any use of any link to the
            Website whether in accordance with this Terms of Use & Disclaimer or
            otherwise.
          </Typography>
          <Typography gutterBottom variant="h6">
            6 Suspension and Termination
          </Typography>
          <Typography gutterBottom>
            6.1 HKBC may in its sole discretion terminate, suspend or withdraw
            the provision of the Website (or any part thereof) at any time
            without prior notice.
          </Typography>
          <Typography gutterBottom variant="h6">
            7 Privacy Policy
          </Typography>
          <Typography gutterBottom>
            7.1 You must agree and abide by the terms and conditions of the
            Privacy Policy in order to use the Website. The Privacy Policy is to
            protect the personal information of yours and other users. For more
            information, please refer to Price's Privacy Policy Statement found
            on the Website.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
