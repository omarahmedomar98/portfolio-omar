import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on the Blog link in the navigation to open the blog section in the default language.
        frame = context.pages[-1]
        # Click on the Blog link in the navigation to open the blog section in default language
        elem = frame.locator('xpath=html/body/nav/div/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Open the first blog post titled 'AI in Accounting: The Great Renaissance and the Fading of Traditional Boundaries' to verify MDX content rendering.
        frame = context.pages[-1]
        # Click 'View Post' on the first blog post to open it and check MDX content rendering
        elem = frame.locator('xpath=html/body/div[2]/main/div/div/div/a/div[3]/span[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Switch to the alternative language (Arabic) and open the corresponding blog post to verify localized content and formatting.
        frame = context.pages[-1]
        # Click on the Arabic language switcher to change blog language to Arabic
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on the Blog link in Arabic navigation to open the blog posts list and open another blog post to verify consistent MDX rendering and localization.
        frame = context.pages[-1]
        # Click on the Blog link in Arabic navigation to open blog posts list
        elem = frame.locator('xpath=html/body/nav/div/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Open the first blog post in Arabic titled 'مستقبل التكنولوجيا المالية (FinTech): رحلة في عقل الاقتصاد الرقمي 2025' to verify MDX content rendering and localization.
        frame = context.pages[-1]
        # Click 'عرض المقال' on the first Arabic blog post to open it and check MDX content rendering
        elem = frame.locator('xpath=html/body/div[2]/main/div/div/div/a/div[3]/span[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Check if there are any other supported languages available to switch to and verify blog post rendering in those languages, or conclude the test if no more languages.
        frame = context.pages[-1]
        # Click on the English language switcher to check for other supported languages and verify blog post rendering in English again or other languages if available
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Blog').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=AI in Accounting: The Great Renaissance and the Fading of Traditional Boundaries').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=مستقبل التكنولوجيا المالية (FinTech): رحلة في عقل الاقتصاد الرقمي 2025').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    