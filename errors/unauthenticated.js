import StatusCodes from "http-status-codes";

class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.message = message || "Message => UnAuthenticated Personalisée";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default UnAuthenticatedError;
