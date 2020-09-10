import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PropTypes from "prop-types";
import React from "react";

export default function PriceToggleButtonGroup({
  priceToggleValues,
  handlePriceToggle,
  language,
  superWideScreen,
}) {
  return (
    <ToggleButtonGroup
      value={priceToggleValues}
      onChange={handlePriceToggle}
      aria-label="price"
      size={superWideScreen ? "medium" : "small"}
      exclusive
    >
      <ToggleButton value="Low" aria-label="low" className="filter-selection">
        {language === "en" ? "LOW" : "低"}
      </ToggleButton>
      <ToggleButton value="Mid" aria-label="mid" className="filter-selection">
        {language === "en" ? "MID" : "中"}
      </ToggleButton>
      <ToggleButton value="High" aria-label="high" className="filter-selection">
        {language === "en" ? "HIGH" : "高"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

PriceToggleButtonGroup.propTypes = {
  priceToggleValues: PropTypes.string,
  handlePriceToggle: PropTypes.func,
  language: PropTypes.string,
  superWideScreen: PropTypes.bool,
};
