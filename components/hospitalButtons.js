import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function HospitalButtons({
  wideScreen,
  classes,
  language,
  locations,
  hospitals,
  handleHospital,
  handleHospitalSelect,
  hospitalInfo,
}) {
  if (hospitalInfo === undefined || hospitalInfo.length === 0) {
    return null;
  } else {
    if (wideScreen) {
      return (
        <Grid item className={classes.buttonGroup}>
          <ToggleButtonGroup
            value={hospitals}
            onChange={handleHospital}
            aria-label="hospitals"
          >
            {hospitalInfo
              .filter((hospital) => hospital.location === locations)
              .map((hospital) => (
                <ToggleButton
                  key={hospital.hospital}
                  value={hospital.hospital}
                  aria-label={hospital.hospital}
                  className="filter-selection"
                >
                  {language === "en"
                    ? hospital.buttonLabel
                    : hospital.hospitalCN}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} align="center">
          <Select
            labelId="select-hospital-label"
            id="select-hospital"
            multiple
            value={hospitals}
            onChange={handleHospitalSelect}
            input={<Input id="input-select-hospital" />}
            style={{ paddingTop: "10px" }}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      language === "en"
                        ? value
                        : hospitalInfo.find(
                            (hospital) => hospital.hospital === value
                          ).hospitalCN
                    }
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
          >
            {hospitalInfo
              .filter((hospital) => hospital.location === locations)
              .map((hospital) => (
                <MenuItem key={hospital.hospital} value={hospital.hospital}>
                  {language === "en" ? hospital.hospital : hospital.hospitalCN}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      );
    }
  }
}
