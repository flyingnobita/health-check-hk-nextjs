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

const useStyles = makeStyles({
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
    paddingBottom: 8,
  },
});

export default function HospitalInfosCards({ language, hospitalInfo }) {
  const classes = useStyles();

  return (
    // page wide container
    <Grid container className={classes.cardsContainer}>
      <Grid item xs={1} className={classes.hospitalInfoGrid} />
      <Grid item xs={10} className={classes.hospitalInfoGrid}>
        {/* container for all cards */}
        <Grid container spacing={3}>
          {hospitalInfo.map((row) => (
            <Grid item key={row.hospital}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {language === "en" ? row.hospital : row.hospitalCN}
                  </Typography>
                  {/* container for icon & content */}
                  <Grid container>
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
                      <Typography
                        variant="body2"
                        component="p"
                        className={`${classes.cardTelephone} ${classes.cardTelephoneNumber}`}
                      >
                        {row.telephone}
                      </Typography>
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
                      <Typography
                        variant="body2"
                        component="p"
                        className={`${classes.cardAddress} ${classes.cardAddressText}`}
                      >
                        {language === "en" ? (
                          <Link
                            target="_blank"
                            href={row.addressLink}
                            underline="none"
                            id={row.hospital}
                            className="Address"
                          >
                            {row.address ? row.address : ""}
                          </Link>
                        ) : (
                          <Link
                            target="_blank"
                            href={row.addressLink}
                            underline="none"
                            id={row.hospital}
                            className="Address"
                          >
                            {row.addressCN ? row.addressCN : ""}
                          </Link>
                        )}
                      </Typography>
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
                  <Grid container justify="space-around">
                    <Grid item>
                      {language === "en" ? "📅 Booking: " : "📅 網上預約: "}
                      {onlineBookingLink(language, row)}
                    </Grid>
                    <Grid item>
                      {language === "en" ? "🌐 Website: " : "🌐 網頁: "}
                      {language === "en" ? (
                        <Link
                          target="_blank"
                          href={row.website}
                          underline="none"
                          id={row.hospital}
                          className="Website"
                        >
                          <Emoji symbol="🔗" label="link" />
                        </Link>
                      ) : (
                        <Link
                          target="_blank"
                          href={row.websiteCN}
                          underline="none"
                          id={row.hospital}
                          className="Website"
                        >
                          <Emoji symbol="🔗" label="link" />
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} className={classes.hospitalInfoGrid} />
    </Grid>
  );
}
