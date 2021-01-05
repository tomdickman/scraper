const puppeteer = require("puppeteer")

/**
 * Get the content of a rendered web page.
 * 
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * 
 * @return {Object} JSON encoded response object with status code and extracted content or error message.
 */
exports.lambdaHandler = async (event, context) => {
    const targetUrl = event.queryStringParameters.targeturl

    if (targetUrl !== undefined) {
        try {
            browser = await puppeteer.launch({args: ['--no-sandbox'], headless: true})
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
    } else {
        return {
            'statusCode': 400,
            'body': 'No valid URL provided'
        }
    }
}
