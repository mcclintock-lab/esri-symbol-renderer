const renderSymbols = require("../src/index.js");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });
const Canvas = require("canvas-prebuilt");
const testCases = require('./testCases.json');

for (var i = 0; i < testCases.length; i++) {
  let testCase = testCases[i];
  test(testCase.label, (done) => {
    renderSymbols(testCase, {scale: 1, canvas: Canvas}, (err, legendItems) => {
      var expectedItems = 1;
      switch (testCase.type) {
        case 'simple':
          expectedItems = 1
          break;
        case 'uniqueValue':
          expectedItems = testCase.uniqueValueInfos.length;
          break;
        case 'classBreaks':
          expectedItems = testCase.classBreakInfos.length;
          break;
        default:
          throw new Error(`Unexpected renderer type ${testCase.type}`);
          return;
      }
      expect(legendItems.length).toBe(expectedItems);
      if (expectedItems === 1) {
        expect(legendItems[0].label).toBe(testCase.label);
      }
      for (var i = 0; i < expectedItems; i++) {
        var item = legendItems[i];
        expect(item.canvas).toBeDefined();
        expect(item.canvas.getContext).toBeDefined();
        expect(item.canvas.toBuffer()).toMatchImageSnapshot();
      }
      done();
    });
  });
}
