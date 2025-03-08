import * as Ably from "ably";

export const ablyClient = new Ably.Realtime({
  key: "HiYSPw.1vBzlQ:D09SYsWI-sGeTicsQhX8xfK_dmnK3iUyn8z0ZpSWMU4", //process.env.ABLY_API_KEY,
});
