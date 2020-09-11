import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Emoji from "./Emoji";
import HospitalInfosCards from "./HospitalInfosCards";

export const onlineBookingLink = function (language, row) {
  if (row.booking) {
    return (
      <Link
        target="_blank"
        href={language === "en" ? row.booking : row.bookingCN}
        underline="none"
        id={row.hospital}
        className="OnlineBooking"
      >
        <Emoji symbol="🔗" label="link" />
      </Link>
    );
  } else return null;
};

export default function HospitalInfos({ hospitalInfo, language }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/?hospitalInfo", undefined, { shallow: true });
  }, []);

  if (hospitalInfo.length > 0) {
    return (
      <React.Fragment>
        <HospitalInfosCards language={language} hospitalInfo={hospitalInfo} />
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
