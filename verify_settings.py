import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Login
        await page.goto('http://localhost:3000/login')
        await page.fill('input[type="email"]', 'admin@school.edu')
        await page.fill('input[type="password"]', 'admin123')
        await page.click('button[type="submit"]')

        # Wait for dashboard
        await page.wait_for_selector('text=active users')

        # Go to Settings
        await page.click('text=Platform Core')
        await page.click('text=Settings')

        # Wait for settings content
        await page.wait_for_selector('text=General Settings')
        await page.screenshot(path='/home/jules/verification/settings_general_final.png')
        print("Settings General verified.")

        # Switch to Security
        await page.click('text=Security')
        await page.wait_for_selector('text=Two-Factor Authentication')
        await page.screenshot(path='/home/jules/verification/settings_security_final.png')
        print("Settings Security verified.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(verify())
