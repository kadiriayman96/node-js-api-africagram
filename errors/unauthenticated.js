import StatusCodes from "http-status-codes";

class UnAuthenticatedError extends Error {
  constructor(message) {
    this.name = "UnAuthenticated Personalisée";
    this.message = message || "Message => UnAuthenticated Personalisée";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

function UnAuthenticatedMessage(message) {
  throw new UnAuthenticatedError(message);
}

export default UnAuthenticatedMessage;
