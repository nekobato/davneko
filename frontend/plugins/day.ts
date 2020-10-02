import dayjs from "dayjs";

const dayUtils = {
  toDateString(str: string) {
    dayjs(str).format("{YYYY}年{MM}月{DD}日");
  },
};

export default function (_, inject) {
  inject("day", dayUtils);
}
