import { browser } from 'k6/experimental/browser';
import { sleep } from 'k6';

export default async function () {
  const page = browser.newPage();

  // 01. Go to the homepage
  try {
    await page.goto('https://mywebsite.com');

    page.waitForSelector('p[class="woocommerce-result-count"]"]');
    page.screenshot({ path: 'screenshots/01_homepage.png' });

    sleep(4);

    // 02. View products
    const element = page.locator('a[class="woocommerce-LoopProduct-link woocommerce-loop-product__link"]');
    await element.click();
    page.waitForSelector('button[name="add-to-cart"]');
    page.screenshot({ path: 'screenshots/02_view-product.png' });

    sleep(1);
  } finally {
    page.close();
  }
}