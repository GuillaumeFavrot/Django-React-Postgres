import puppeteer, { Browser, Page } from "puppeteer";
import { screen } from "@testing-library/react";
import '@testing-library/jest-dom'

describe("App.js", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        jest.setTimeout(200000)
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 500));
    });

    it("contains the 'API Tester' text", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        const text = await page.$eval(".main-title", (e: Element) => e.textContent);
        expect(text).toContain("API Tester");
    });

    it("Add a new post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".add-post-form");
        await page.type(".add-post-form", "New Post");
        await page.click(".add-post-submit");
        await page.waitForSelector(".post-text");
        const text = await page.$eval(".post-text", (e: Element) => e.textContent);
        expect(text).toContain("New Post");
    })

    it("Update a post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".get-posts");
        await page.waitForSelector(".post-text");
        await page.click(".post-text");
        await page.click(".update-post-form");
        await page.type(".update-post-form", "Updated Post");
        await page.click(".update-post-submit");
        await page.waitForSelector(".post-text");
        const text = await page.$eval(".post-text", (e: Element) => e.textContent);
        expect(text).toContain("Updated Post");
    })

    it("Delete a post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".get-posts");
        await page.waitForSelector(".post-text");
        await page.click(".post-delete");
        expect(screen.queryByText("Updated Post")).not.toBeInTheDocument();
    })

    afterAll(() => browser.close());
});

   

