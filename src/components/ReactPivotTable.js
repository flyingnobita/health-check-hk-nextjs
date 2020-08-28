import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import PivotTable from "./react-pivottable/PivotTable";
// import "./react-pivottable/pivottable.css";
// import "./ReactPivotTable.css";

export default class ReactPivotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.tableData = [];
  }

  readCSV = () => {
    if (
      typeof this.props.csv === "object" ||
      this.props.csv instanceof Object
    ) {
      var pros_csv = [];
      pros_csv = this.props.csv;
      this.tableData = pros_csv;
    }
  };

  render() {
    if (this.props.csv) {
      this.readCSV();

      return (
        <Box
          display="inline-block"
          text-align="center"
          marginLeft="5vw"
          marginRight="5vw"
          overflow="auto"
          width="100"
          maxWidth="90vw"
          minWidth="0"
          maxHeight="90vh"
        >
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
        </Box>
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
