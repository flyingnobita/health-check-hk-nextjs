import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Emoji from "./Emoji";
import { onlineBookingLink } from "./HospitalInfos";

const useStyles = makeStyles((theme) => ({
  cardsContainer: {
    paddingTop: "16px",
  },
  card: {
    minWidth: 275,
    maxWidth: 400,
    width: 240,
    minHeight: 220,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  cardTelephone: {
    marginTop: 8,
    marginBottom: 8,
  },
  cardTelephoneNumber: {
    marginLeft: 4,
  },
  cardAddress: {
    marginBottom: 8,
  },
  cardAddressText: {
    marginLeft: 4,
  },
  cardHours: {
    marginBottom: 4,
  },
  cardHoursText: {
    marginLeft: 4,
  },
  cardActions: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
}));

export default function HospitalInfosCards({ language, hospitalInfo }) {
  const classes = useStyles();

  return (
    // page wide container
    <Grid container className={classes.cardsContainer}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {/* container for all cards */}
        <Grid container spacing={3} justify="center">
          {hospitalInfo.map((row) => (
            <Grid item key={row.hospital}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {language === "en" ? row.hospital : row.hospitalCN}
                  </Typography>
                  {/* container for icon & content */}
                  <Grid container alignItems="center">
                    <Grid item xs={1} align="center">
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.cardTelephone}
                      >
                        📞
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Link
                        href={"tel:" + row.telephone}
                        className={`${classes.cardTelephone} ${classes.cardTelephoneNumber}`}
                      >
                        {row.telephone}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* container for icon & content */}
                  <Grid container>
                    <Grid item xs={1} align="center">
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.cardAddress}
                      >
                        📍
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Link
                        target="_blank"
                        href={row.addressLink}
                        underline="none"
                        id={row.hospital}
                        className={`${classes.cardAddress} ${classes.cardAddressText}`}
                      >
                        {language === "en"
                          ? row.address
                            ? row.address
                            : ""
                          : row.addressCN
                          ? row.addressCN
                          : ""}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* container for icon & content */}
                  <Grid container>
                    <Grid item xs={1} align="center">
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.cardHours}
                      >
                        🕗
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography
                        variant="body2"
                        component="div"
                        className={`${classes.cardHours} ${classes.cardHoursText}`}
                      >
                        {language === "en"
                          ? row.hospitalHours.split(", ").map((i, key) => {
                              return <div key={key}>{i}</div>;
                            })
                          : row.hospitalHoursCN.split(", ").map((i, key) => {
                              return <div key={key}>{i}</div>;
                            })}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions className={classes.cardActions}>
                  <Grid container justify="space-between">
                    {row.booking ? (
                      <React.Fragment>
                        <Grid item>
                          {language === "en" ? "📅 Booking: " : "📅 網上預約: "}
                          {onlineBookingLink(language, row)}
                        </Grid>
                      </React.Fragment>
                    ) : (
                      <Grid item />
                    )}
                    <Grid item>
                      {language === "en" ? "🌐 Website: " : "🌐 網頁: "}
                      <Link
                        target="_blank"
                        href={language === "en" ? row.website : row.websiteCN}
                        underline="none"
                        id={row.hospital}
                        className="Website"
                      >
                        <Emoji symbol="🔗" label="link" />
                      </Link>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
