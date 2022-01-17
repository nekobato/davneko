import { Audio, User, Directory, Task } from "../models";

const syncOptions = {
  force: true,
  logging: console.log,
};

Promise.all([
  Audio.sync(syncOptions),
  User.sync(syncOptions),
  Directory.sync(syncOptions),
  Task.sync(syncOptions),
]).then(() => {
  console.log("synced");
});
