# NodeJS & Jest PCC Environment

This document describes configuration and usage for the NodeJS & Jest environment in Project Code Challenges (PCC).

The Node version is 12.x and test framework is Jest. The CodeRunner uses Jest’s default `testRegex` so test files can also be in `src/`.

An example project structure is:

```
├─ src
│  └─ example.js
└─ __tests__
   └─ example_test.js

```

The test path uses Jest's default `testRegex`:

`(/__tests__/.*|(\\.|/)(test|spec)).[jt]sx?$`
A custom `jest.config.js` can be given as long as it sets required options. See below for default `jest.config.js`:

```
module.exports = {
  verbose: false,
  testEnvironment: "node",

  // Use our test reporter
  reporters: [["jest-reporter", {}]],

};
```
