import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { GENDER_SPECIFIC_PLAN_TYPES } from "./settings";

export default function GenderSelect({
  genders,
  handleGenderSelect,
  language,
  planTypes,
}) {
  if (GENDER_SPECIFIC_PLAN_TYPES.includes(planTypes)) {
    return (
      <Select
        labelId="select-gender-label"
        id="select-gender"
        value={genders}
        onChange={handleGenderSelect}
      >
        <MenuItem value={"Male"}>{language === "en" ? "MALE" : "男"}</MenuItem>
        <MenuItem value={"Female"}>
          {language === "en" ? "FEMALE" : "女"}
        </MenuItem>
      </Select>
    );
  } else {
    return (
      <Select
        labelId="select-gender-label"
        id="select-gender"
        value={genders}
        onChange={handleGenderSelect}
        disabled={true}
      >
        <MenuItem value={"Both"}>
          {language === "en" ? "BOTH" : "不分"}
        </MenuItem>
      </Select>
    );
  }
}
