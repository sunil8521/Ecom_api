class errorHandle extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default errorHandle;
export const ErrorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
