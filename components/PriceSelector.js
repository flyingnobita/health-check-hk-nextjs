import Slider from "@material-ui/core/Slider";
import React from "react";
import { ValueLabelComponent } from "./FilterUI";

export function PriceSelector({
  classes,
  prices,
  marks,
  handlePrice,
  planTypes,
}) {
  return (
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
        disabled={planTypes !== "General"}
      />
    </div>
  );
}
