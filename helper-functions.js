function isJsonable(v) {
  try {
    return JSON.stringify(v) === JSON.stringify(JSON.parse(JSON.stringify(v)));
  } catch (e) {
    return false;
  }
}

function isDict(v) {
  return (
    !!v &&
    typeof v === "object" &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date) &&
    isJsonable(v)
  );
}

function dictToString(dict) {
  let res = "{";
  let keys = Object.keys(dict);
  if (keys.length > 0) {
    res += keys[0];
    res += ": ";
    res += dict[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      res += " , ";
      res += keys[i];
      res += ": ";
      res += dict[keys[i]];
    }
  }
  res += "}";
  return res;
}
