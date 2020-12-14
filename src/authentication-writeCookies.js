const { chromium } = require('playwright')
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    //headless: false
  })
  const context = await browser.newContext()

  const page = await context.newPage()

  await page.goto('https://github.com/login')

  await page.type('#login_field', 'pratiksharma23') // change username
  await page.type('#password', '') // add password

  await page.waitForSelector('.js-cookie-consent-reject')
  await page.click('.js-cookie-consent-reject')
  await page.$eval('[name="commit"]', (elem) => elem.click())
  await page.waitForNavigation()

  const cookies = await context.cookies()
  const cookieJson = JSON.stringify(cookies)

  fs.writeFileSync('cookies.json', cookieJson)

  await browser.close()
})()
