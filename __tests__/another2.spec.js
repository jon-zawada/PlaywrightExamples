const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to a webpage
  await page.goto('https://example.com');

  // Wait for specific elements to appear
  await Promise.all([
    page.waitForSelector('h1'),
    page.waitForSelector('p'),
  ]);

  // Interact with elements on the page
  await page.fill('input[type="text"]', 'Playwright');
  await page.click('button');

  // Capture a screenshot
  await page.screenshot({ path: 'example.png' });

  // Evaluate page content
  const title = await page.title();
  console.log('Title:', title);

  // Get the value of an attribute
  const href = await page.getAttribute('a', 'href');
  console.log('Link Href:', href);

  // Extract text content
  const paragraphText = await page.textContent('p');
  console.log('Paragraph Text:', paragraphText);

  // Scroll to a specific element
  await page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });

  // Hover over an element
  await page.hover('a');

  // Handle dialogues
  page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.dismiss();
  });

  // Perform keyboard actions
  await page.keyboard.press('Enter');

  // Assert URL
  const url = page.url();
  console.log('URL:', url);

  // Assert page content
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Example Domain');

  await browser.close();
})();
