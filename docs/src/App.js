import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SymbolContainer from './SymbolContainer';

const App = () =>
  <MuiThemeProvider>
    <Card style={{ maxWidth: 600, margin: "10px auto" }}>
      <CardTitle title="esri-symbol-renderer" />
      <CardText>
        Renders Esri{" "}
        <a href="http://resources.arcgis.com/en/help/rest/apiref/renderer.html">
          Renderer and Symbol objects
        </a>{" "}
        from the REST API to html canvas elements. These can then be used to
        render custom legends. The goal is to fully support the
        range of rendering options without relying directly on the Esri JS API.
        Fully custom legends and table of contents components can be developed
        without the constraints of the dojo widgets, or even used in conjunction
        with another mapping API.
      </CardText>
      <SymbolContainer />
    </Card>
  </MuiThemeProvider>;

export default App;
