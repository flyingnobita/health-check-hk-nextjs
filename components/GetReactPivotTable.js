import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import FilterUI from "./FilterUI";
import ReactPivotTable from "./ReactPivotTable";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  filterGrid: {
    background: theme.palette.grey[50],
    paddingTop: "10px",
  },
  pivotTableGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "20px",
    paddingBottom: "10px",
    overflow: "auto",
  },
  pageButton: {
    marginBottom: "10px",
  },
}));

export const GetReactPivotTable = (props) => {
  const classes = useStyles();
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/", undefined, { shallow: true });
  // }, []);

  console.log("GetReactPivotTable");
  console.log(props.hospitalInfo);

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.filterGrid}>
        <FilterUI
          wideScreen={props.wideScreen}
          superWideScreen={props.superWideScreen}
          language={props.language}
          hospitals={props.hospitals}
          handleHospital={props.handleHospital}
          handleHospitalSelect={props.handleHospitalSelect}
          handleDeleteHospitalSelect={props.handleDeleteHospitalSelect}
          locations={props.locations}
          handleLocation={props.handleLocation}
          handleLocationSelect={props.handleLocationSelect}
          genders={props.genders}
          handleGender={props.handleGender}
          handleGenderSelect={props.handleGenderSelect}
          planTypes={props.planTypes}
          handlePlanType={props.handlePlanType}
          handlePlanTypeSelect={props.handlePlanTypeSelect}
          prices={props.prices}
          priceToggleValues={props.priceToggleValues}
          handlePrice={props.handlePrice}
          handlePriceToggle={props.handlePriceToggle}
          searchTerm={props.searchTerm}
          handleSearch={props.handleSearch}
          hospitalInfo={props.hospitalInfo}
          processedPlansRecords={props.processedPlansRecords}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={10} className={classes.pivotTableGrid} align="center">
        <Link
          href={{
            pathname: "/hospitalInfoPage",
            query: {
              hospitalInfo: JSON.stringify(props.hospitalInfo),
              language: props.language,
            },
          }}
          as="/hospitalInfoPage"
          passHref
        >
          <Button
            aria-label={"hospital-info-page"}
            onClick={props.handleHospitalInfoClick}
            className={classes.pageButton}
            startIcon={<LocalHospitalIcon />}
          >
            <Typography variant="body1">
              {props.language === "en" ? "BOOKING INFO" : "預約資料"}
            </Typography>
          </Button>
        </Link>
        <ReactPivotTable
          csv={props.filteredDataArray}
          language={props.language}
        />
      </Grid>
      <Grid item xs={1} />
    </React.Fragment>
  );
};
