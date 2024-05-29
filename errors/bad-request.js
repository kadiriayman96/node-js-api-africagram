import StatusCodes from "http-status-codes";

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.message = message || "Message => Bad Request Personalisée";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequestError;
