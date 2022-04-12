module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'linebreak-style': 0,
	  'prettier/prettier': ['error', { endOfLine: 'auto'} ],
  },
};
