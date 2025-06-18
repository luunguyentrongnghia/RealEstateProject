const { networkInterfaces } = require("os");

const getIpAddress = () => {
  const nets = networkInterfaces();
  const results = {};
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return Object.values(results)[0];
};
exports.gerenateKeyRedis = (filter) => {
  const filterStringKey = JSON.stringify(filter)
    .replace(/[^a-zA-Z0-9]/g, "")
    .split("")
    .sort((a, b) => b.localeCompare(a))
    .join("");
  const IPAddres = getIpAddress();
  return filterStringKey + IPAddres;
};
