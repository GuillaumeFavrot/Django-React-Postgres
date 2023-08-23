/* istanbul ignore file */
import puppeteer, { Browser, Page } from 'puppeteer';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe("App.js", () => {
    let browser: Browser;
    let page: Page;
    
    jest.setTimeout(30000)

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();            
    });

    it('contains the "API Tester" text', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('h1[aria-label="main-title"]');
        const text1 = await page.$eval('h1[aria-label="main-title"]', (e: Element) => e.textContent);
        expect(text1).toContain('API Tester');
        await new Promise((r) => setTimeout(r, 2000));
    });

    it('Add a new post', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('h1[aria-label="main-title"]');
        await page.click('input[aria-label="post-add-input"]');
        await page.type('input[aria-label="post-add-input"]', 'New Post');
        await page.click('button[aria-label="post-add-submit"]');
        await new Promise((r) => setTimeout(r, 2000));
        await page.waitForSelector('p[aria-label="post-text"]');
        const text2 = await page.$eval('p[aria-label="post-text"]', (e: Element) => e.textContent);
        expect(text2).toContain('New Post');
    })

    it("Update a post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector('h1[aria-label="main-title"]');
        await new Promise((r) => setTimeout(r, 500));
        await page.waitForSelector('p[aria-label="post-text"]');
        await page.click('p[aria-label="post-text"]');
        await page.click('input[aria-label="post-update-input"]');
        await page.type('input[aria-label="post-update-input"]', "Updated Post");
        await page.click('button[aria-label="post-update-submit"]');
        await new Promise((r) => setTimeout(r, 500));
        await page.waitForSelector('p[aria-label="post-text"]');
        const text3 = await page.$eval('p[aria-label="post-text"]', (e: Element) => e.textContent);
        expect(text3).toContain('Updated Post');
    })

    it('Delete a post', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForSelector('h1[aria-label="main-title"]');
        await new Promise((r) => setTimeout(r, 500));
        await page.waitForSelector('p[aria-label="post-text"]');
        await page.click('button[aria-label="post-delete"]');
        expect(screen.queryByText('Updated Post')).not.toBeInTheDocument();
    })

    afterAll(() => browser.close());
})

   

