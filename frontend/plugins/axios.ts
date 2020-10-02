import { AxiosRequestConfig } from "axios";

export default function ({ $axios, redirect }: any) {
  $axios.defaults.baseURL = process.env.baseApiUrl;

  $axios.onRequest((config: AxiosRequestConfig) => {
    if (!config.headers.Authorization) {
      const authToken = window.localStorage.getItem("auth");
      console.log(authToken);
      if (authToken) {
        $axios.defaults.headers = {
          Authorization: `Bearer ${authToken}`,
        };
        config.headers = {
          Authorization: `Bearer ${authToken}`,
        };
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
