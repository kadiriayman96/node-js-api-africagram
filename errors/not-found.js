import StatusCodes from "http-status-codes";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.message = message || "Message => Not Found Personalisée";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
