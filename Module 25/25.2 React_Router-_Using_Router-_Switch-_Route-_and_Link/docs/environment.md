# Execution Environment
Two separate environments exist for this challenge. The test environment, which is remotely executed within a NodeJS runtime, and the web preview environment, which is bundled using CodeSandbox's Sandpack. The `package.json` does not control both environments.

## Test Environment
The code for this project is tested using Node 12 with Jest as the test framework.  JSX is supported as well as ES6 imports. The code is executed in a remote environment, not within your browser. Any `console.log` statements executed while running tests will not send logs to your browser, but the output will be shown at the bottom of your tests. Jest does not support inline `console.log` statements, this is why logs come after all test output.

Any package that is already loaded into the runner environment is able to be used; there is no `package.json` file that manages what is executed within tests. Candidates are not able to import any packages that are not already installed.

Stylesheets and other assets can be imported. See `jest.config.js` and the `__mocks__` directory to see what is loaded in their place. By default, these imports are essentially just ignored and don't do anything, when running tests.

## Web Preview Environment
The web preview environment uses Sandpack to bundle assets. The `package.json` file is used to determine what gets loaded into this environment. There are no special config files, everything is inferred from `package.json`.

Customization is possible here, though you need to be careful not to use different versions within the web preview environment than what is loaded within the test environment. In some cases you can load additional dependencies if it is only cosmetic (styling) or meant for building preview assets, but those dependencies may not be available within the runner environment and can cause issues with your tests.
