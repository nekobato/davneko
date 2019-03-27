import axios from "axios";

export const fetchDir = path => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/path", {
        params: { path: path },
        responseType: "json"
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const fetchDirRecursive = file => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/pathr", {
        params: { path: file.path },
        responseType: "json"
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
