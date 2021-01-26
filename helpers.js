const response = (status, statusCode, data) => {
  return {
    status,
    statusCode,
    data
  }
}

module.exports = {
  response
}