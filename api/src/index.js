import { Hono } from "hono";
import loaders from "./loaders";
import { UPLOAD_MAX_SIZE } from "./config";

const app = new Hono({ strict: false });
loaders(app);

export default {
  port: process.env.APP_PORT || 5000,
  fetch: app.fetch,
  maxRequestBodySize: UPLOAD_MAX_SIZE,
};
