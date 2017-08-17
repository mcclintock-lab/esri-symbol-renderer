Renders Esri [Renderer and Symbol objects](http://resources.arcgis.com/en/help/rest/apiref/renderer.html) from the REST API to html canvas elements. These can then be used to render custom legends. The goal is to fully support the range of rendering options without relying directly on the Esri JS API. Fully custom legends and table of contents components can be developed without the constraints of the dojo widgets, or even used in conjunction with another mapping API.

## Usage

```javascript
const renderSymbols = require('esri-symbol-renderer');

let options = {
  scale: 2,
  blackFillPatterns: false
};

renderSymbols({ "type" : "classBreaks", ... }, options, (err, items) => {
  for (var legendItem of items) {
    console.log(legendItem);
  }  
});

>> { label: "10.0 - 1000.000000", canvas: <Canvas>}
>> { label: "1000.000001 - 5000.000000", canvas: <Canvas>}
>> { label: "8000.000001 - 10000.000000", canvas: <Canvas>}

```

### Environment

Works in the browser using native apis, and in node via `node-canvas`. For use
in node, you'll need to provide the canvas renderer as an option.

```javascript
const Canvas = require('canvas-prebuilt');
renderSymbols(json, {canvas: Canvas}, callback);
```

### Options

  * `scale` can be used to increase the size of the output canvas. Defaults to `1.0`. Base scale is 30px to match ArcGIS.com legends.
  * `includeDefaultValues` will include default symbols for uniqueValue and classBreaks renderers. Defaults to `false`.
  * `blackFillPatterns` defaults to `true`. Fill patterns such as esriSFSForwardDiagonal [will not display "correctly" in the Esri JS API](https://geonet.esri.com/thread/32433?commentID=205321#comment-205321). Assuming you are using the Esri API you will want to keep this set to true to match map output. If using anothe rendering method you may want to set to false to get appropriate fill colors.
  * `canvas` can be set to the `node-canvas` Canvas constructor for use in node.

## Examples

[Checkout the playground](http://mcclintock-lab.github.io/esri-symbol-renderer/) for renderings of test cases as well as a tool to render services by url.
