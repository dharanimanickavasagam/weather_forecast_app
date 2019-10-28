import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./tabPanel";

class TabSelector extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  generateID = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  render() {
    const { value } = this.state;
    const { tabData } = this.props;

    return (
      <React.Fragment>
        <Tabs value={value} onChange={this.handleChange} centered>
          {tabData.map((tabDatum, index) => (
            <Tab
              key={tabDatum.label}
              label={tabDatum.label}
              {...this.generateID(index)}
            />
          ))}
        </Tabs>

        {tabData.map((tabDatum, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            style={{ textAlign: "center" }}
          >
            {tabDatum.component}
          </TabPanel>
        ))}
      </React.Fragment>
    );
  }
}

export default TabSelector;
