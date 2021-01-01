const puppeteer = require("puppeteer")

/**
 * Get the DOM for a URL (as a jQuery like DOM object for reading data).
 * 
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * 
 * @return {string} JSON encoded Cheerio with loaded html elements.
 */
exports.lambdaHandler = async (event, context) => {
    const targetUrl = event.queryStringParameters.targeturl

    if (targetUrl !== undefined) {
        try {
            browser = await puppeteer.launch({headless: true})
            page = await browser.newPage()
            await page.setUserAgent("Lambda scraper")
            await page.goto(targetUrl)
            const content =  await page.content()
            await browser.close()
    
            return {
                'statusCode': 200,
                'body': content
            }
        } catch(error) {
            console.log(error)
        }
    }
}
