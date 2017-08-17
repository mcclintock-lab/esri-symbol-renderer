export const chooseLabel = (a, b) => {
  if (typeof a === 'string') {
    if (a.replace(/\s/g, '').length === 0) {
      return b;
    } else {
      return a;
    }
  } else if (typeof b === 'string') {
    return b;
  } else {
    return "";
  }
}
