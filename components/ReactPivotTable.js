import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import PivotTable from "../components/react-pivottable/PivotTable";

export default class ReactPivotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.tableData = [];
  }

  readCSV() {
    if (
      typeof this.props.csv === "object" ||
      this.props.csv instanceof Object
    ) {
      var pros_csv = [];
      pros_csv = this.props.csv;
      this.tableData = pros_csv;
    }
  }

  render() {
    if (this.props.csv) {
      this.readCSV();

      return (
        <PivotTable
          data={this.tableData}
          cols={
            this.props.language === "en"
              ? ["Plan Type", "Gender", "Hospital", "Price", "Plan Name"]
              : ["計劃類別", "性別", "醫院", "價錢", "計劃名稱"]
          }
          rows={
            this.props.language === "en"
              ? ["Service Type", "Service Subtype", "Service Name"]
              : ["項目類別", "項目次類別", "項目名稱"]
          }
          aggregatorName="CountA"
          onChange={(s) => this.setState(s)}
          {...this.state}
        />
        // </Box>
      );
    } else {
      return (
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <div>
              <br />
              <LinearProgress color="primary" />
              <br />
            </div>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      );
    }
  }
}
