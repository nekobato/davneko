import { AxiosRequestConfig } from "axios";

export default function ({ $axios, redirect }: any) {
  $axios.defaults.baseURL = process.env.baseApiUrl;

  $axios.onRequest((config: AxiosRequestConfig) => {
    if (!config.headers.uid) {
      const authDataFromLS = JSON.parse(window.localStorage.getItem("auth"));
      if (authDataFromLS) {
        $axios.defaults.headers = authDataFromLS;
        config.headers = authDataFromLS;
      } else {
        redirect("/auth/signin");
      }
    }
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect("/auth/signin");
    }
  });
}
