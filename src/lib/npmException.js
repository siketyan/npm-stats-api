/**
 * Custom Exception definitions
 *
 * @param {Object} err: object from npm API status code and response body
 * @returns void
 */
function NpmException(err) {
  this.message = err.message;
  this.name = 'NpmException';

  if (!err.response) {
    this.statusCode = 500;
    this.body = {
      ...err
    };
  } else if (Number(err.status) >= 400) {
    const { error } = err.response;
    this.statusCode = err.status;
    this.body = {
      path: error.path,
      ...JSON.parse(error.text),
    };
  }
}

module.exports = NpmException;