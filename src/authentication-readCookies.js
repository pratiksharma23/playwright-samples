const { chromium } = require('playwright')
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    //headless: false
  })
  const context = await browser.newContext()

  const cookies = fs.readFileSync('cookies.json', 'utf8')

  const deserializedCookies = JSON.parse(cookies)
  await context.addCookies(deserializedCookies)

  const page = await context.newPage()

  await page.goto(`https://github.com/pratiksharma23}`)

  await browser.close()
})()
