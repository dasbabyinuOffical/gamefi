const sleep = async (timeout) => {
  return new Promise(() => {
    setTimeout(() => {}, timeout);
  });
};

export { sleep };
