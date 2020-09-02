import { Grid } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

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
        >
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
        </Grid>
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
          <Grid item>
            <SearchIcon />
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
        </Grid>
      </Grid>
    );
  }
}
