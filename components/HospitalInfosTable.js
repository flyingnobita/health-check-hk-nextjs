import { Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import Emoji from "./Emoji";
import { onlineBookingLink } from "./HospitalInfos";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  hospitalInfoGrid: {
    paddingTop: "20px",
    paddingBottom: "5px",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    padding: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[50],
    },
  },
}))(TableRow);

export default function HospitalInfosTable({ language, hospitalInfo }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} className={classes.hospitalInfoGrid} />
      <Grid item xs={10} className={classes.hospitalInfoGrid}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="Hospital Infomation"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  {language === "en" ? "Hospital" : "醫院"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {language === "en" ? "🕗 Operating Hours" : "🕗 開放時間"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {language === "en" ? "📞 Telephone" : "📞 電話"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {language === "en" ? "📍 Address" : "📍 地址"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {language === "en" ? "📅 Online Booking" : "📅 網上預約"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {language === "en" ? "🌐 Website" : "🌐 網頁"}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitalInfo.map((row) => (
                <StyledTableRow key={row["hospital"]}>
                  <StyledTableCell component="th" scope="row">
                    {language === "en" ? row.hospital : row.hospitalCN}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {language === "en"
                      ? row.hospitalHours
                      : row.hospitalHoursCN}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.telephone}
                  </StyledTableCell>
                  <StyledTableCell align="left">
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
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {onlineBookingLink(language, row)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={1} className={classes.hospitalInfoGrid} />
    </Grid>
  );
}
