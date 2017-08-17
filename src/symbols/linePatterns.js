module.exports = {
  esriSLSSolid: () => [],
  esriSLSDash: strokeWidth => [strokeWidth * 2, strokeWidth * 2],
  esriSLSDashDot: strokeWidth => [
    strokeWidth * 4,
    strokeWidth * 2,
    strokeWidth,
    strokeWidth * 2
  ],
  esriSLSDashDotDot: strokeWidth => [
    strokeWidth * 4,
    strokeWidth * 2,
    strokeWidth,
    strokeWidth * 2,
    strokeWidth,
    strokeWidth * 2
  ],
  esriSLSNull: () => [0, 10]
};
