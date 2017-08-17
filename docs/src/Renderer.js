import React, { Component } from "react";
import renderSymbols from "esri-symbol-renderer";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import LegendItem from "./LegendItem";
import Avatar from 'material-ui/Avatar';
import Error from 'material-ui/svg-icons/alert/error';
import {chooseLabel} from './utils';

class Renderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbols: []
    };
  }

  componentDidMount() {
    this.updateSymbols(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateSymbols(nextProps);
  }

  updateSymbols(props) {
    renderSymbols(props.data, { ...props }, (err, symbols) => {
      this.setState({
        symbols: symbols || [],
        error: err
      });
    })
  }

  render() {
    return (
      <List>
        {this.state.symbols.length > 1 || this.state.error ? <Subheader>{chooseLabel(this.props.data.label, this.props.defaultLabel)}</Subheader> : null}
        { this.state.error ? <ListItem primaryText={this.state.error.toString()} leftAvatar={<Avatar backgroundColor="orange" icon={<Error />} />} /> : null}
        {this.state.symbols.map(symbol => <LegendItem key={chooseLabel(symbol.label, this.props.defaultLabel)} {...symbol} defaultLabel={this.props.defaultLabel} />)}
      </List>
    );
  }
}

export default Renderer;
