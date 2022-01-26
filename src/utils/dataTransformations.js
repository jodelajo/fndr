export const convertLocationObjectToArray = (locations) => {
  return Object.keys(locations).map((name) => {
    const obj = {};
    obj[name] = locations[name];
    return obj;
  });
};
