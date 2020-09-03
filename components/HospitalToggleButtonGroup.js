import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";

function toDisableHospital(hospitalInfo, planType, hospital) {
  const hospitalInInfo = hospitalInfo.find((h) => h.hospital === hospital);
  return !hospitalInInfo.planType.includes(planType);
}

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    margin: 10,
  },
}));

export default function HospitalToggleButtonGroup({
  language,
  locations,
  hospitals,
  handleHospital,
  hospitalInfo,
  planTypes,
}) {
  const classes = useStyles();

  if (hospitalInfo === undefined || hospitalInfo.length === 0) {
    return null;
  } else {
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
                    disabled={toDisableHospital(
                      hospitalInfo,
                      planTypes,
                      hospital.hospital
                    )}
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
                    disabled={toDisableHospital(
                      hospitalInfo,
                      planTypes,
                      hospital.hospital
                    )}
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
              transitionDelay: locations === "newTerritories" ? "500ms" : "0ms",
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
                    disabled={toDisableHospital(
                      hospitalInfo,
                      planTypes,
                      hospital.hospital
                    )}
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
  }
}