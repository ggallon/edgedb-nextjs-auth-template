import { redirect } from "next/navigation";
import { edgedbAuth } from "@/db/edgedb/client";
import type { ext } from "@/db/edgedb/types";

export const { GET, POST } = edgedbAuth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      console.error("sign in failed", error);
    }

    if (!tokenData) {
      console.log("email verification required");
    }

    if (isSignUp) {
      await edgedbAuth
        .getSession()
        .client.withRetryOptions({ attempts: 1 })
        .transaction(async (tx) => {
          const emailFactor = await tx.queryRequiredSingle<
            Pick<ext.auth.EmailFactor, "email">
          >(
            `SELECT ext::auth::EmailFactor {
              email
            } FILTER .identity = (global ext::auth::ClientTokenIdentity)`,
          );
          await tx.execute(
            `INSERT User {
              name := '',
              email := <str>$email,
              userRole := 'user',
              identity := (global ext::auth::ClientTokenIdentity)
            }`,
            { email: emailFactor.email },
          );
        });
    }

    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
