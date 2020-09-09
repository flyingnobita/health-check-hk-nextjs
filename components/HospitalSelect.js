import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { filterHospitals } from "./indexHelper";

const useStyles = makeStyles((theme) => ({
  selectGrid: {
    marginBottom: "10px",
  },
  chipDiv: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function getHospitalList(filtered) {
  let filteredHospitalsList = [];
  if (filtered.length > 0) {
    filteredHospitalsList = [
      ...new Set(filtered.map((item) => item["Hospital"])),
    ];
  } else {
    filteredHospitalsList = [];
  }
  return filteredHospitalsList;
}

export default function HospitalSelect({
  language,
  locations,
  hospitals,
  handleHospitalSelect,
  handleDeleteHospitalSelect,
  planTypes,
  genders,
  processedPlansRecords,
}) {
  const classes = useStyles();

  if (
    processedPlansRecords === undefined ||
    processedPlansRecords.length === 0
  ) {
    return null;
  } else {
    let filtered = filterHospitals(
      processedPlansRecords,
      planTypes,
      genders,
      locations
    );
    let filteredHospitalsList = getHospitalList(filtered);

    return (
      <Grid item xs={12} align="center" className={classes.selectGrid}>
        <Select
          labelId="select-hospital-label"
          id="select-hospital"
          multiple
          value={hospitals}
          onChange={handleHospitalSelect}
          input={<Input id="input-select-hospital" />}
          style={{ paddingTop: "10px" }}
          renderValue={(selected) => (
            <div className={classes.chipDiv}>
              {selected.map((value) => (
                <Chip
                  variant="outlined"
                  key={value}
                  color="primary"
                  onDelete={() => handleDeleteHospitalSelect(value)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  label={
                    language === "en"
                      ? value
                      : filtered.find(
                          (hospital) => hospital["Hospital"] === value
                        )["Hospital CN"]
                  }
                />
              ))}
            </div>
          )}
        >
          {filteredHospitalsList.map((hospital) => {
            return (
              <MenuItem key={hospital} value={hospital}>
                {language === "en"
                  ? hospital
                  : filtered.find(
                      (filteredHospital) =>
                        filteredHospital["Hospital"] === hospital
                    )["Hospital CN"]}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    );
  }
}
