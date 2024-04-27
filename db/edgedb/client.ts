import { createClient, type Client } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

declare global {
  // eslint-disable-next-line no-var
  var edgedbClient: Client | undefined;
}

export const edgedbClient =
  global.edgedbClient ||
  createClient({
    // Note: when developing locally you will need to set tls security to
    // insecure, because the development server uses self-signed certificates
    // which will cause api calls with the fetch api to fail.
    tlsSecurity:
      process.env.NODE_ENV === "development" ? "insecure" : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global.edgedbClient = edgedbClient;
}

export const edgedbAuth = createAuth(edgedbClient, {
  baseUrl: "http://localhost:3000",
});
