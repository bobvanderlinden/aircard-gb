const puppeteer = require('puppeteer');

async function click(page, selector) {
  await page.evaluate(selector => document.querySelector(selector).click(), selector);
}

let screenshotNr = 1
async function screenshot(page) {
  await page.screenshot({ path: `screenshot_${screenshotNr}.png` })
  screenshotNr++
}

(async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    try {
      await page.goto(process.env.NETGEAR_URL)

      console.log('Waiting for login form...')
      await page.waitForSelector('#button_login')
      await page.type('#session_password', process.env.NETGEAR_PASSWORD)
      await click(page, '#button_login')

      console.log('Waiting for sidebar...')
      await page.waitForSelector('#nav_messaging')
      await click(page, '#nav_messaging')

      console.log('Waiting for new message button...')
      await page.waitForSelector('#button_message_new')
      await page.focus('#button_message_new')
      await click(page, '#button_message_new')

      console.log('Waiting for compose form...')
      await page.waitForSelector('#sms_sendMsg_receiver')
      await page.type('#sms_sendMsg_receiver', '1280')
      await page.type('#sms_sendMsg_text', 'nog 1gb')
      await page.focus('#sms_compose button.section_submit')
      await click(page, '#sms_compose button.section_submit')

      console.log('Waiting for sent confirmation...')
      await page.waitForSelector('#sms_sentinfo')

      console.log('done!')
    } catch (err) {
      console.error(err)
      await page.screenshot({ path: 'screenshot_error.png' })
      throw err
    }
  } finally {
    await browser.close()
  }
})().then(result => {
  console.log(result)
}).catch(err => {
  console.error(err)
  process.exit(1)
});
