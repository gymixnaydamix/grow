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

        # Verify Dashboard Overview (Skeleton and i18n check)
        await page.wait_for_selector('text=Active Users')
        await page.screenshot(path='/home/jules/verification/dashboard_final_en.png')
        print("Dashboard English verified.")

        # Verify Teacher Cockpit
        await page.click('text=Teacher Cockpit')
        await page.wait_for_selector('text=My Classes Overview')
        await page.screenshot(path='/home/jules/verification/teacher_cockpit.png')
        print("Teacher Cockpit verified.")

        # Verify Credentials
        await page.click('text=Credentials')
        await page.wait_for_selector('text=Certificates')
        await page.screenshot(path='/home/jules/verification/credentials_final.png')
        print("Credentials verified.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(verify())
