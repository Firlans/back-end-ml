"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);

  server.route(routes);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
