import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Renderer from './Renderer';

class SearchResult extends Component {

  render() {
    let { drawingInfo, name } = this.props;
    return <Renderer data={drawingInfo.renderer} defaultLabel={name} {...this.props.rendererOptions} />;
  }

}

export default SearchResult;
