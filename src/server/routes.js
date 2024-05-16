const postPredictHandler = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/predict",
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 10485760,
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  }
];

module.exports = routes;
