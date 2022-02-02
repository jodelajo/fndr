export const convertLocationObjectToArray = (locations) => {
  return Object.keys(locations).map((name) => {
    const obj = {};
    obj[name] = locations[name];
    return obj;
  });
};

export function isEndOfPage(e) {
  return (
    window.innerHeight + e.target.documentElement.scrollTop + 1 >=
    e.target.documentElement.scrollHeight
  );
}
