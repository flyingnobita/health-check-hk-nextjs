import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import React from "react";
import Emoji from "./Emoji";
import HospitalInfosCards from "./HospitalInfosCards";

export const onlineBookingLink = function (language, row) {
  if (row.booking) {
    if (language === "en") {
      return (
        <Link
          target="_blank"
          href={row.booking}
          underline="none"
          id={row.hospital}
          className="OnlineBooking"
        >
          <Emoji symbol="🔗" label="link" />
        </Link>
      );
    } else {
      return (
        <Link
          target="_blank"
          href={row.bookingCN}
          underline="none"
          id={row.hospital}
          className="OnlineBooking"
        >
          <Emoji symbol="🔗" label="link" />
        </Link>
      );
    }
  } else return null;
};

export default function HospitalInfos({ hospitalInfo, language }) {
  if (hospitalInfo.length > 0) {
    return (
      <React.Fragment>
        <HospitalInfosCards language={language} hospitalInfo={hospitalInfo} />
        {/* <HospitalInfosTable language={language} hospitalInfo={hospitalInfo} /> */}
      </React.Fragment>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div>
            <br />
            <LinearProgress color="primary" />
            <br />
          </div>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    );
  }
}
