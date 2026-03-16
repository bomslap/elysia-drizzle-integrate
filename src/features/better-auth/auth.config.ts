import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import db from "../../libs/drizzle/db";
import { openAPI } from "better-auth/plugins";
import { account, session, user } from "./auth.entity";

export const auth = betterAuth({
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [openAPI({
    path: "/docs"
  })]
});