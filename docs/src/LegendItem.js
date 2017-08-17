import React from "react";
import { ListItem } from "material-ui/List";
import { chooseLabel } from "./utils";

const LegendItem = props =>
  <ListItem
    innerDivStyle={{
      paddingLeft: props.canvas.width * 2,
      paddingTop: props.canvas.height * 0.5,
      paddingBottom: props.canvas.height * 0.5
    }}
    leftAvatar={<img alt="symbol" src={props.canvas.toDataURL()} />}
    primaryText={chooseLabel(props.label, props.defaultLabel)}
  />;

export default LegendItem;
