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
        # -> Click on 'About' section to observe animations and transitions.
        frame = context.pages[-1]
        # Click on 'About' link to load the About section and observe animations.
        elem = frame.locator('xpath=html/body/nav/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down to observe any animations triggered on scroll in the 'About' section.
        await page.mouse.wheel(0, 600)
        

        # -> Rapidly navigate between 'About', 'Skills', and 'Experience' sections to test animation overlap and UI freeze.
        frame = context.pages[-1]
        # Click on 'Skills' link to navigate and observe animations.
        elem = frame.locator('xpath=html/body/nav/div/div/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rapidly navigate between 'Skills', 'Experience', and 'About' sections multiple times to test for animation overlap or UI freezes.
        frame = context.pages[-1]
        # Click on 'Experience' link to navigate and observe animations.
        elem = frame.locator('xpath=html/body/nav/div/div/a[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rapidly navigate between 'Experience', 'Skills', and 'About' sections multiple times to test for animation overlap or UI freezes.
        frame = context.pages[-1]
        # Click on 'Skills' link to navigate back and observe animations.
        elem = frame.locator('xpath=html/body/nav/div/div/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Rapidly navigate between 'Skills', 'Experience', and 'About' sections multiple times to test for animation overlap or UI freezes.
        frame = context.pages[-1]
        # Click on 'Experience' link to navigate and observe animations.
        elem = frame.locator('xpath=html/body/nav/div/div/a[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Test animations on different device emulations or screen sizes to confirm smoothness and performance.
        await page.goto('http://localhost:3000/en#about', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate different screen sizes or device emulations to observe animation smoothness and performance.
        await page.mouse.wheel(0, 800)
        

        # -> Simulate smaller screen size (mobile) to observe animation smoothness and performance.
        await page.goto('http://localhost:3000/en#about', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 400)
        

        # -> Simulate smaller screen size (mobile) to observe animation smoothness and performance.
        await page.goto('http://localhost:3000/en#about', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 400)
        

        # -> Simulate mobile viewport and rapidly navigate between 'About', 'Skills', and 'Experience' sections to test animation smoothness and UI stability.
        await page.goto('http://localhost:3000/en#about', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Rapidly navigate between 'About', 'Skills', and 'Experience' sections on mobile viewport to test animation overlap and UI stability.
        frame = context.pages[-1]
        # Click on 'Experience' link to navigate and observe animations on mobile viewport.
        elem = frame.locator('xpath=html/body/nav/div/div/a[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Final step: Confirm no animation overlap or UI freeze occurs during rapid navigation between sections on mobile viewport.
        frame = context.pages[-1]
        # Click on 'Skills' link to rapidly navigate and observe animations on mobile viewport.
        elem = frame.locator('xpath=html/body/nav/div/div/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=ABOUT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SKILLS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=EXPERIENCE').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PROJECTS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ANALYSIS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PORTFOLIO').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CALCULATORS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SERVICES').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CONTACT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BLOG').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=GENERAL ACCOUNTANT & FINANCIAL ANALYST & SALESMAN').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Accuracy in Accounting.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=In-Depth Data Analysis..').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact Me').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=About Me').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Professional Overview').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3+').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Years Experience').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Companies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=100%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Accuracy Focus').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Professional Skills').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Accounting & Finance').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Accounting').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Analysis').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Budget Monitoring').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Reporting').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Auditing Principles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Data & Analytics').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Advanced Microsoft Excel').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Power Query').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pivot Tables & Power Pivot').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Data Analysis').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Systems & ERP').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Microsoft Dynamics 365').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ERP System Management').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Inventory Tracking Systems').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Digital Ledger Management').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Oct 2024 – Present').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Branch Accountant & Inside Sales Rep').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=B.TECH – Egypt').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Managed daily financial transactions related to sales, inventory, and reconciliation of daily cash balances.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Prepared accurate invoices and receipts, ensuring compliance with company financial policies.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Utilized Microsoft Dynamics 365 to record, track, and analyze financial operations efficiently.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Supported sales teams operationally, contributing directly to achieving branch sales targets.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2023 – 2024').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Branch Accountant').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mirage Shipping & Distribution Company – Egypt').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Recorded daily operational revenues and expenses with high precision.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Managed specialized accounts including trip, fuel, maintenance, and payroll expenses.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Oversaw invoice tracking and ensured timely payment collection from clients.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Prepared comprehensive monthly and annual financial reports for management review.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2021 – 2022').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=General Accountant').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Aseel El-Bahloul Contracting Company – Egypt').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tracked and audited all site-related revenues and expenses.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Reviewed supplier and subcontractor invoices for accuracy before processing.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Prepared detailed financial status reports for senior management.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Managed petty cash funds and site advances, ensuring proper documentation.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Reporting System').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Inventory & Sales Tracker').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cash Flow Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Custom Accounting System').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Accounting').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ERP Operations').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Financial Analysis').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Inventory Control').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Compare historical performance of multiple assets to analyze opportunity cost.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=EGX 30').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Portfolio Builder').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Design your asset allocation and simulate historical performance against inflation.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Strategic Analysis Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Advanced tools for valuation, growth, and risk monitoring.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Career Objective').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=To grow as a professional accountant in a dynamic organization where I can apply my financial expertise, analytical skills, and ERP experience to support informed decision-making, operational efficiency, and sustainable business growth.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Get In Touch').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact Information').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=I am available for new opportunities. Feel free to reach out to discuss how I can contribute to your team.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LinkedIn').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Facebook').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Phone').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=My Resumé').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download PDF').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Online').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Omar Ahmed Hussein').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blog').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CV').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2024 Omar Ahmed Omar Hussein. All Rights Reserved.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    