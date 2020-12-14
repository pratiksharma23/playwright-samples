const { chromium } = require('playwright');
const fs = require('fs');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch({
    //headless: false
  });
  const context = await browser.newContext({ acceptDownloads: true })

  const page = await context.newPage();
  await page.goto('https://minikube.sigs.k8s.io/docs/start/');
  await page.click('text="Windows"');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text="Windows installer"')
  ]);

  const path = await download.path()

  const newFile = fs.readFileSync(path)
  const testFile = fs.readFileSync('download/minikube-installer.exe')

  assert(newFile.equals(testFile))
  await context.close();
  await browser.close();
})();