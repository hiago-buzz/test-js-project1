module.exports.queryString = obj => {
  const entries = Object.entries(obj).map(([key, value]) => {
    return `${key}=${value}`;
  });

  return entries.join('&');
};
