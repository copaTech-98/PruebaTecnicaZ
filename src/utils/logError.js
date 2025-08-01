module.exports = {
  logError: (error) => {
    const logMsg = `[${new Date().toISOString()}] ${error.stack || error}\n`;
    fs.appendFileSync("error.log", logMsg);
  },
};
