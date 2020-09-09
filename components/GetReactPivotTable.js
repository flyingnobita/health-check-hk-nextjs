import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import FilterUI from "./FilterUI";
import ReactPivotTable from "./ReactPivotTable";

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
}));

export const GetReactPivotTable = (props) => {
  const classes = useStyles();

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
      <Grid item xs={10} className={props.pivotTableGrid}>
        <ReactPivotTable
          csv={props.filteredDataArray}
          language={props.language}
        />
      </Grid>
      <Grid item xs={1} />
    </React.Fragment>
  );
};
