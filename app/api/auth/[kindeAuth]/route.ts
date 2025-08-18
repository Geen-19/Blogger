import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// In CI/build environments, Kinde env vars may be missing. Provide a no-op hand
// ler to avoid build-time failures collecting page data for this route.
export const GET = process.env.KINDE_ISSUER_URL
  ? handleAuth()
  : async () => new Response("Auth is not configured", { status: 503 });
