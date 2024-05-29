import StatusCodes from "http-status-codes";

class NotFound extends Error {
  constructor(message) {
    this.name = "Not Found Personalisée";
    this.message = message || "Message => Not Found Personalisée";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

function NotFoundMessage(message) {
  throw new NotFound(message);
}

export default NotFoundMessage;
