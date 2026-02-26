import { randomString } from "../utils/helper.js";

export const users = [
  {
    username: "da.admin",
    password: "abc1234"
  },
];

export const invalidUsername = {
    username: randomString(8),
    password: "abc1234"
};

export const invalidPassword = {
    username: "da.admin",
    password: randomString(8)
};