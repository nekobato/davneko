import { Audio, User } from "../models";

const syncOptions = {
  force: true,
  logging: console.log,
};

Promise.all([Audio.sync(syncOptions), User.sync(syncOptions)]).then(() => {
  console.log("synced");
});
