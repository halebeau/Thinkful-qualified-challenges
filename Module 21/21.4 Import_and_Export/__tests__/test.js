import APPLE_URL, { GOOGLE_URL, CHEGG_URL } from "../src/urls";
import getUrls from "../src/getUrls";
import init from "../src/index";

describe("import and exports", () => {
  test("should correctly export CHEGG_URL from urls.js", () => {
    expect(CHEGG_URL).toBeDefined();
  });
  
  test("should correctly export GOOGLE_URL from urls.js", () => {
    expect(GOOGLE_URL).toBeDefined();
  });
  
  test("should correctly export `getUrls()` as a default", () => {
    expect(getUrls).toBeDefined();
  });
  
  test("should correctly import `getUrls()` in index.js", () => {
    expect(init()).toEqual(getUrls);
  });
  
  test("should correctly import CHEGG_URL in getUrls.js", () => {
    expect(getUrls()).toEqual(expect.arrayContaining([CHEGG_URL]));
  });
  
  test("should correctly import GOOGLE_URL in getUrls.js", () => {
    expect(getUrls()).toEqual(expect.arrayContaining([GOOGLE_URL]));
  });
});