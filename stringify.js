const stringify = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') obj[key] = JSON.stringify(value);
    else obj[key] = stringify(value);
  }
  return obj;
};
