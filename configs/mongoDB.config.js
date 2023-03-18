const getMongoConfig = async (configService) => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService) =>
  "mongodb+srv://" +
  configService.get("MONGO_DB_USER") +
  ":" +
  configService.get("MONGO_DB_PASSWORD") +
  "@" +
  configService.get("MONGO_DB_PROJECT") +
  ".mongodb.net/" +
  configService.get("MONGO_DB_NAME");

const getMongoHost = (env) => {
  if (
    env?.MONGO_DB_USER &&
    env?.MONGO_DB_PASSWORD &&
    env?.MONGO_DB_PROJECT &&
    env?.MONGO_DB_NAME
  ) {
    return (
      "mongodb+srv://" +
      env?.MONGO_DB_USER +
      ":" +
      env?.MONGO_DB_PASSWORD +
      "@" +
      env?.MONGO_DB_PROJECT +
      ".mongodb.net/" +
      env?.MONGO_DB_NAME
    );
  }
  return null;
};
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  getMongoConfig,
  getMongoString,
  getMongoHost,
  getMongoOptions,
};
