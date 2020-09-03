import { Grid } from "@material-ui/core";
import React from "react";
import FilterUI from "./FilterUI";
import ReactPivotTable from "./ReactPivotTable";

export const GetReactPivotTable = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={12} className={props.filterGrid}>
        <FilterUI
          wideScreen={props.wideScreen}
          language={props.language}
          hospitals={props.hospitals}
          handleHospital={props.handleHospital}
          handleHospitalSelect={props.handleHospitalSelect}
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
          handlePrice={props.handlePrice}
          searchTerm={props.searchTerm}
          handleSearch={props.handleSearch}
          hospitalInfo={props.hospitalInfo}
          hospitalLocationMap={props.hospitalLocationMap}
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