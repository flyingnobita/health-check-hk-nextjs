import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useTracking } from "react-tracking";
import {
  APP_URL,
  SHARE_MESSAGE_EN,
  SHARE_MESSAGE_CH,
  FACEBOOK_HASHTAG,
  TWITTER_HASHTAGS,
  EMAIL_SUBJECT_EN,
  EMAIL_SUBJECT_CH,
  EMAIL_BODY_EN,
  EMAIL_BODY_CH,
} from "./settings";
import track from "react-tracking";

const SHARE_ICON_SIZE = 32;
const SHARE_ICON_BORDER_RADIUS = 10;

const useStyles = makeStyles(() => ({
  icon: {
    color: "#FFFFFF",
  },
}));

function ShareButton({ language }) {
  const classes = useStyles();
  const tracking = useTracking();
  // const { trackEvent } = useTracking();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ShareIcon className={classes.icon} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="whatsappsharebutton" onClick={handleClose}>
          <WhatsappShareButton
            url={APP_URL}
            beforeOnClick={() => {
              tracking.trackEvent({ event: "Share", channel: "WhatsApp" });
            }}
            title={language === "en" ? SHARE_MESSAGE_EN : SHARE_MESSAGE_CH}
          >
            <WhatsappIcon
              size={SHARE_ICON_SIZE}
              borderRadius={SHARE_ICON_BORDER_RADIUS}
            />
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem key="facebooksharebutton" onClick={handleClose}>
          <FacebookShareButton
            url={APP_URL}
            beforeOnClick={() => {
              tracking.trackEvent({ event: "Share", channel: "Facebook" });
            }}
            quote={language === "en" ? SHARE_MESSAGE_EN : SHARE_MESSAGE_CH}
            hashtag={FACEBOOK_HASHTAG}
          >
            <FacebookIcon
              size={SHARE_ICON_SIZE}
              borderRadius={SHARE_ICON_BORDER_RADIUS}
            />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem key="telegramsharebutton" onClick={handleClose}>
          <TelegramShareButton
            url={APP_URL}
            beforeOnClick={() => {
              tracking.trackEvent({ event: "Share", channel: "Telegram" });
            }}
            title={language === "en" ? SHARE_MESSAGE_EN : SHARE_MESSAGE_CH}
          >
            <TelegramIcon
              size={SHARE_ICON_SIZE}
              borderRadius={SHARE_ICON_BORDER_RADIUS}
            />
          </TelegramShareButton>
        </MenuItem>
        <MenuItem key="twittersharebutton" onClick={handleClose}>
          <TwitterShareButton
            url={APP_URL}
            beforeOnClick={() => {
              tracking.trackEvent({ event: "Share", channel: "Twitter" });
            }}
            title={language === "en" ? SHARE_MESSAGE_EN : SHARE_MESSAGE_CH}
            hashtags={TWITTER_HASHTAGS}
          >
            <TwitterIcon
              size={SHARE_ICON_SIZE}
              borderRadius={SHARE_ICON_BORDER_RADIUS}
            />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem key="emailsharebutton" onClick={handleClose}>
          <EmailShareButton
            url={APP_URL}
            beforeOnClick={() => {
              tracking.trackEvent({ event: "Share", channel: "Email" });
            }}
            subject={language === "en" ? EMAIL_SUBJECT_EN : EMAIL_SUBJECT_CH}
            body={language === "en" ? EMAIL_BODY_EN : EMAIL_BODY_CH}
          >
            <EmailIcon
              size={SHARE_ICON_SIZE}
              borderRadius={SHARE_ICON_BORDER_RADIUS}
            />
          </EmailShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default track({})(ShareButton);
