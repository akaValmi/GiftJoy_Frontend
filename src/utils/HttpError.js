export class HTTPError extends Error {
  constructor(response, errorData) {
    super(`HTTP Error: ${response.status}`);
    this.response = response;
    this.errorData = errorData;
  }
}
