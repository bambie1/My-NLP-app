// const $ = require('jquery');
const validateUrl = require('../src/client/js/index')

test('should return true for a valid url', () => {
  const text = validateUrl('http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile')
  expect(text).toBe(true);
})

  // describe("Filter function", () => {
  //   test("it should filter by a search term (link)", () => {
  //     const input = [
  //       { id: 1, url: "https://www.url1.dev" },
  //       { id: 2, url: "https://www.url2.dev" },
  //       { id: 3, url: "https://www.link3.dev" }
  //     ];

  //     const output = [{ id: 3, url: "https://www.link3.dev" }];

  //     expect(filterByTerm(input, "link")).toEqual(output);
  //   });
  // });