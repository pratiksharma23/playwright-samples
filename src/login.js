const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    //headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://twitter.com/');

  await page.click('input[name="session[username_or_email]"]');

  await page.fill('input[name="session[username_or_email]"]', 'pratiksharma_23');

  await page.fill('input[name="session[password]"]', '');

  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://twitter.com/home' }*/),
    page.click('text="Log in"')
  ]);

  await context.close();
  await browser.close();
})();