const { chromium, webkit, firefox } = require('playwright');

(async () => {
  const browser = await chromium.launch({
      //headless: false,
      //devtools: true
  });
  const page = await browser.newPage();

  // Subscribe to 'request' and 'response' events.
  page.on('request', request =>
      console.log('>>', request.method(), request.url()));
  page.on('response', response =>
      console.log('<<', response.status(), response.url()));
  await page.goto('https://youtube.com');

  await browser.close();
})();