import StatusCodes from "http-status-codes";

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = "Bad Request Personalisée";
    this.message = message || "Message => Bad Request Personalisée";
    
    this.statusCode = StatusCodes.BadRequestError;
  }
}

function BadRequestMessage(message) {
  throw new BadRequestError(message);
}

export default BadRequestMessage;
