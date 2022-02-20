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

export function hasNextPage(results, page, LIMIT) {
  return results === page * LIMIT;
}

export function renameGT(companySize) {
  if (companySize === "GT-100") {
    return "more than 100";
  } else {
    return companySize;
  }
}
