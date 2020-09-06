import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import React from "react";

export function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  sliderTypography: {
    width: 250,
  },
}));

export default function PriceSelector({ prices, handlePrice, planTypes }) {
  const classes = useStyles();

  const marks = [
    {
      value: 0,
      label: "$0",
    },
    {
      value: 10000,
      label: "$10k",
    },
    {
      value: 20000,
      label: "$20k",
    },
    {
      value: 30000,
      label: "$30k",
    },
  ];

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
        aria-label="Price Selector"
        // disabled={planTypes !== "General"}
      />
    </div>
  );
}
