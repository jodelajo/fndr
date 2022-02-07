export const APIUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_MODE
    : process.env.REACT_APP_PRO_MODE;
