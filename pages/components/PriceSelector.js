import { Grid } from "@material-ui/core";
import React from "react";
import Slider from "@material-ui/core/Slider";
import { ValueLabelComponent } from "./MaterialUI";

export function PriceSelector({
  classes,
  prices,
  marks,
  handlePrice,
  wideScreen,
}) {
  if (wideScreen) {
    return (
      <Grid item className={classes.buttonGroup}>
        <div className={classes.sliderTypography}>
          <Slider
            ValueLabelComponent={ValueLabelComponent}
            value={prices}
            step={1000}
            marks={marks}
            min={0}
            max={30000}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>${value / 1000}k</div>}
            aria-labelledby="range-slider"
          />
        </div>
      </Grid>
    );
  } else {
    return (
      <Grid item className={classes.buttonGroup} xs={12} align="center">
        <div className={classes.sliderTypography}>
          <Slider
            ValueLabelComponent={ValueLabelComponent}
            value={prices}
            step={1000}
            marks={marks}
            min={0}
            max={30000}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>${value / 1000}k</div>}
            aria-labelledby="range-slider"
          />
        </div>
      </Grid>
    );
  }
}
