import "babel-polyfill"
import 'regenerator-runtime/runtime'
jest.mock('node-fetch');
const fetch = require("node-fetch");

const { Response } = jest.requireActual('node-fetch');
const { getNLP } = require ('../src/client/js/handleSubmit');

const mock = {
    "article": "Remember Edward Snowden? ...",
    "author": "Cat Zakrzewski",
    "feeds": [],
    "image": "",
    "keywords": [],
    "publishDate": "2015-04-06T17:45:49+00:00",
    "title": "John Oliver Just Changed The Surveillance Reform Debate",
    "videos": []
};

test('getNLP calls fetch and returns news JSON', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mock))));

    const responseData = await getNLP("Me", 1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(responseData).toEqual(mock);
});