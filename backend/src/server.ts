require("dotenv").config({ debug: true });

console.log(process.env.AUDIO_BASE_DIR);

// import errorHandler from "errorhandler";

import { app } from "./app";

// app.use(errorHandler());

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

export default server;
