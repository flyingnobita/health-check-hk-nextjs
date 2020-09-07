import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PropTypes from "prop-types";
import React from "react";
import { GENDER_SPECIFIC_PLAN_TYPES } from "./settings";

export default function GenderToggleButtonGroup({
  genders,
  handleGender,
  language,
  planTypes,
  superWideScreen,
}) {
  return (
    <ToggleButtonGroup
      value={genders}
      exclusive
      onChange={handleGender}
      aria-label="genders"
      size={superWideScreen ? "medium" : "small"}
    >
      <ToggleButton
        value="Male"
        aria-label="male"
        className="filter-selection"
        disabled={!GENDER_SPECIFIC_PLAN_TYPES.includes(planTypes)}
      >
        {language === "en" ? "MALE" : "男"}
      </ToggleButton>
      <ToggleButton
        value="Female"
        aria-label="female"
        className="filter-selection"
        disabled={!GENDER_SPECIFIC_PLAN_TYPES.includes(planTypes)}
      >
        {language === "en" ? "FEMALE" : "女"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

GenderToggleButtonGroup.propTypes = {
  genders: PropTypes.string,
  handleGender: PropTypes.func,
  language: PropTypes.string,
  planTypes: PropTypes.string,
  superWideScreen: PropTypes.bool,
};
