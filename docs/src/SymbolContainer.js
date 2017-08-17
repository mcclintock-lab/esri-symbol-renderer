import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import { List, ListItem } from "material-ui/List";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Renderer from "./Renderer";
import {Tabs, Tab} from 'material-ui/Tabs';
import testCases from "./testCases.json";
import TextField from 'material-ui/TextField';
import {CardText} from 'material-ui/Card';
import Button from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SearchResult from './SearchResult';

class SymbolContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      includeDefaultValues: false,
      blackFillPatterns: true,
      scale: 1,
      searching: false,
      searchResults: []
    };
  }

  render() {
    return (
      <div>
        <List>
          <Subheader>Options</Subheader>
          <ListItem
            primaryText="blackFillPatterns"
            secondaryText="Render black fill patterns to match limitations of Esri JS API"
            rightToggle={
              <Toggle
                toggled={this.state.blackFillPatterns}
                onToggle={this.handleBlackFillPatternsToggled}
              />
            }
          />
          <ListItem
            primaryText="includeDefaultValues"
            secondaryText="Unique Value and Class Breaks renderers contain often unnecessary symbology"
            rightToggle={
              <Toggle
                toggled={this.state.includeDefaultValues}
                onToggle={this.handleIncludeDefaultValuesToggled}
              />
            }
          />
          <ListItem
            primaryText="scale"
            secondaryText="Base scale is 30px, matching ArcGIS.com legends"
            rightToggle={
              <SelectField
                value={this.state.scale}
                onChange={this.handleScaleSelected}
              >
                <MenuItem value={0.8} primaryText=".8x" />
                <MenuItem value={1} primaryText="1x" />
                <MenuItem value={2} primaryText="2x" />
                <MenuItem value={3} primaryText="3x" />
              </SelectField>
            }
          />
        </List>
        <br />
        <Tabs
        >
          <Tab label="Examples">
            <br />
            {testCases.map(testCase =>
              <Renderer key={testCase.label} data={testCase} {...this.state} />
            )}
          </Tab>
          <Tab label="Service Tester">
            <CardText>
              <TextField
                defaultValue="http://data1-bluehalo.seasketch.org/arcgis/rest/services/Montserrat/All_Data_Montserrat/MapServer"
                floatingLabelText="ESRI REST Service URL"
                style={{width: "100%"}}
                 ref="url"
              />
              <Button label="Search" disabled={this.state.searching} primary={true} onClick={this.handleSearch}/>
            </CardText>
            { this.state.searching ? <LinearProgress mode="indeterminate" /> : null }
            <List>
              {
                this.state.searchResults.map((result) => <SearchResult key={Math.random() + result.name} {...result} rendererOptions={{blackFillPatterns: this.state.blackFillPatterns, includeDefaultValues: this.state.includeDefaultValues, scale: this.state.scale}} />)
              }
            </List>
          </Tab>
        </Tabs>
      </div>
    );
  }

  handleIncludeDefaultValuesToggled = (e, checked) =>
    this.setState({ includeDefaultValues: checked });

  handleBlackFillPatternsToggled = (e, checked) =>
    this.setState({ blackFillPatterns: checked });

  handleScaleSelected = (e, i, value) => {
    this.setState({ scale: value });
  };

  handleSearch = () => {
    let urlString = this.refs.url.getValue();
    if (urlString.length) {
      let url = new URL(urlString);
      url.searchParams.set('f', 'json');
      this.setState({
        searching: true,
        searchResults: []
      });
      if (/MapServer/.test(url) || /FeatureService/.test(url)) {
        url.pathname = url.pathname + "/layers";
      }
      fetch(url)
      .then((response) => {
        response.json().then((doc) => {
          if (doc.layers) {
            this.setState({
              searchResults: doc.layers.filter((l) => 'drawingInfo' in l),
              searching: false
            });
          } else if (doc.drawingInfo) {
            this.setState({
              searchResults: [doc],
              searching: false
            });
          }
        });
      });
    }
  }
}

export default SymbolContainer;
