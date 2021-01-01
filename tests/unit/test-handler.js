'use strict';

const app = require('../../app.js')
const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
let event, context

describe('Test scraping a web page', function () {
    it('verifies successful response', async () => {
        event = {queryStringParameters: {targeturl: "https://www.google.com"}}
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');
    });

    it('contains raw HTML of scraped page', async () => {
        event = {queryStringParameters: {targeturl: "https://www.google.com"}}
        const result = await app.lambdaHandler(event, context)

        assert.equal(true, result.body.includes('!DOCTYPE'))
        assert.equal(true, result.body.includes('<html'))
        assert.equal(true, result.body.includes('</html>'))
    })
});
