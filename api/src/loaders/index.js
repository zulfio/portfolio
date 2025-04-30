import databaseLoader from "./databaseLoader";
import { redisClient } from "./redisLoader";
import honoLoader from "./honoLoader";

async function loaders(app) {
  await databaseLoader();
  redisClient.connect();
  honoLoader(app);
}

export default loaders;
