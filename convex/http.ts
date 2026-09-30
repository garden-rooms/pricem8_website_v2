import { httpRouter } from "convex/server";
import { handleResendInbound } from "./resendInbound";

const http = httpRouter();

http.route({
  path: "/resend/inbound",
  method: "POST",
  handler: handleResendInbound,
});

export default http;
