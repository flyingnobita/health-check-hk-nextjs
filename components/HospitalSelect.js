import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";

export default function HospitalSelect({
  language,
  locations,
  hospitals,
  handleHospitalSelect,
  hospitalInfo,
  planTypes,
  hospitalLocationMap,
}) {
  if (hospitalInfo === undefined || hospitalInfo.length === 0) {
    return null;
  } else {
    const locationList = hospitalLocationMap.get(planTypes);
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
            <div>
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
                />
              ))}
            </div>
          )}
        >
          {locationList[locations].map((hospital) => {
            return (
              <MenuItem key={hospital} value={hospital}>
                {language === "en"
                  ? hospital
                  : hospitalInfo.find(
                      (hospitalInInfo) => hospitalInInfo.hospital === hospital
                    ).hospitalCN}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    );
  }
}
