const parseEmptyInt = (str: string) => {
  if (!str) {
    return null;
  } else {
    return parseInt(str, 10);
  }
}

const parseEmptyFloat = (str: string) => {
  if (!str) {
    return null;
  } else {
    return parseFloat(str);
  }
}

const parseEmptyString = (str: string) => {
  if (str) {
    return str;
  } else {
    return null;
  }
}

export {
  parseEmptyInt,
  parseEmptyFloat,
  parseEmptyString,
}
