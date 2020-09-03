import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme) => ({
  searchBarIcon: {
    color: theme.palette.primary.dark,
  },
}));

function GetSearchBar({ language, searchTerm, handleSearch }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item>
        <SearchIcon className={classes.searchBarIcon} />
      </Grid>
      <Grid item>
        <TextField
          id="input-with-icon-grid"
          label={language === "en" ? "Search service" : "項目搜索"}
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: 250 }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default function SearchBar({
  language,
  searchTerm,
  handleSearch,
  wideScreen,
}) {
  if (wideScreen) {
    return (
      <Grid item>
        <Grid container spacing={1} alignItems="flex-end" justify="center">
          <GetSearchBar
            language={language}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} align="center">
        <Grid container spacing={1} alignItems="center" justify="center">
          <GetSearchBar
            language={language}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
        </Grid>
      </Grid>
    );
  }
}
