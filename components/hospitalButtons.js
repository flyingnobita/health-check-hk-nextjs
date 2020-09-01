import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Zoom from "@material-ui/core/Zoom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";

export default function HospitalButtons({
  wideScreen,
  classes,
  language,
  locations,
  hospitals,
  handleHospital,
  handleHospitalSelect,
  hospitalInfo,
  planTypes,
}) {
  if (hospitalInfo === undefined || hospitalInfo.length === 0) {
    return null;
  } else {
    if (wideScreen) {
      return (
        <React.Fragment>
          <Grid item className={classes.buttonGroup} xs={12} align="center">
            <Zoom
              direction="left"
              mountOnEnter
              unmountOnExit
              in={locations === "hkIsland"}
              // timeout={{ appear: 1000, enter: 1000, exit: 400 }}
              style={{
                transitionDelay: locations === "hkIsland" ? "500ms" : "0ms",
              }}
            >
              <ToggleButtonGroup
                value={hospitals}
                onChange={handleHospital}
                aria-label="hospitals"
              >
                {hospitalInfo
                  .filter((hospital) => hospital.location === "hkIsland")
                  .map((hospital) => (
                    <ToggleButton
                      key={hospital.hospital}
                      value={hospital.hospital}
                      aria-label={hospital.hospital}
                      className="filter-selection"
                      disabled={
                        planTypes === "Child" &&
                        !["Adventist - Stubbs", "Matilda"].includes(
                          hospital.hospital
                        )
                      }
                    >
                      {language === "en"
                        ? hospital.buttonLabel
                        : hospital.hospitalCN}
                    </ToggleButton>
                  ))}
              </ToggleButtonGroup>
            </Zoom>
            <Zoom
              direction="left"
              mountOnEnter
              unmountOnExit
              in={locations === "kowloon"}
              // timeout={{ appear: 1000, enter: 1000, exit: 400 }}
              style={{
                transitionDelay: locations === "kowloon" ? "500ms" : "0ms",
              }}
            >
              <ToggleButtonGroup
                value={hospitals}
                onChange={handleHospital}
                aria-label="hospitals"
              >
                {hospitalInfo
                  .filter((hospital) => hospital.location === "kowloon")
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
            </Zoom>
            <Zoom
              direction="left"
              mountOnEnter
              unmountOnExit
              in={locations === "newTerritories"}
              // timeout={{ appear: 1000, enter: 1000, exit: 400 }}
              style={{
                transitionDelay:
                  locations === "newTerritories" ? "500ms" : "0ms",
              }}
            >
              <ToggleButtonGroup
                value={hospitals}
                onChange={handleHospital}
                aria-label="hospitals"
              >
                {hospitalInfo
                  .filter((hospital) => hospital.location === "newTerritories")
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
            </Zoom>
          </Grid>
        </React.Fragment>
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
