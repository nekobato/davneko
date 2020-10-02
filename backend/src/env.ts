export default {
  local: {
    twitter: {
      callbackUrl: "http://localhost:8080/api/auth/twitter/callback",
      consumer: {
        key: "Pe6crn4ppuRFYogtPRLKw",
        secret: "H35Q7h96RDVSSRe8r4z1Fcu3pBYHJmMj2mkKccXWM",
      },
    },
  },
  development: {
    twitter: {
      callbackUrl:
        "https://prototype.nekorocket.space/api/auth/twitter/callback",
      consumer: {
        key: "Pe6crn4ppuRFYogtPRLKw",
        secret: "H35Q7h96RDVSSRe8r4z1Fcu3pBYHJmMj2mkKccXWM",
      },
    },
  },
  production: {
    twitter: {
      callbackUrl: "https://tektek.nekorocket.space/api/auth/twitter/callback",
      consumer: {
        key: "Pe6crn4ppuRFYogtPRLKw",
        secret: "H35Q7h96RDVSSRe8r4z1Fcu3pBYHJmMj2mkKccXWM",
      },
    },
  },
} as const;

export const audioBaseDir =
  "/Users/nekobatoken/Music/iTunes/iTunes Media/Music/";
