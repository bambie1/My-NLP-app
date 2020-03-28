const { urlCheck } = require('../src/client/js/urlCheck')

test('checks url', () => {
  const positive = urlCheck("http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile");
  expect(positive).toBe(true);
});

test('checks url', () => {
  const negative = urlCheck("wwwkkp.com");
  expect(negative).toBe(false);
});