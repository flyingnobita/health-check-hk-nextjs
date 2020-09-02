import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

function GetSearchBar({ classes, language, searchTerm, handleSearch }) {
  return (
    <React.Fragment>
      <Grid item>
        <SearchIcon className={classes.searchBarIcon} />
      </Grid>
      <Grid item>
        <TextField
          id="input-with-icon-grid"
          label={language === "en" ? "Search service" : "項目搜索"}
          InputProps={{ className: classes.input }}
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: 250 }}
        />
      </Grid>
    </React.Fragment>
  );
}

export function SearchBar({
  classes,
  language,
  searchTerm,
  handleSearch,
  wideScreen,
}) {
  if (wideScreen) {
    return (
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={classes.search}
        ></Grid>
        <GetSearchBar
          classes={classes}
          language={language}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} align="center">
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          className={classes.search}
        >
          <GetSearchBar
            classes={classes}
            language={language}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
        </Grid>
      </Grid>
    );
  }
}
