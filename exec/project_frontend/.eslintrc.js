module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": [
      "error",
      require("os").EOL === "\r\n" ? "windows" : "unix",
    ],
    // eslint-disable-next-line no-dupe-keys
    "linebreak-style": 0,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
