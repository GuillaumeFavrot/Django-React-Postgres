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

    it("contains the 'API Tester' text", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        const text1 = await page.$eval(".main-title", (e: Element) => e.textContent);
        expect(text1).toContain("API Tester");
        await new Promise((r) => setTimeout(r, 2000));
        console.log("Test 1 passed")
    });

    afterAll(() => browser.close());
})

describe("App.js", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        jest.setTimeout(200000)
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("Add a new post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".add-post-form");
        await page.type(".add-post-form", "New Post");
        await page.click(".add-post-submit");
        await page.waitForSelector(".post-text");
        const text2 = await page.$eval(".post-text", (e: Element) => e.textContent);
        expect(text2).toContain("New Post");
        // await page.click(".post-delete");
        await new Promise((r) => setTimeout(r, 2000));
        console.log("Test 2 passed")
    })

    afterAll(() => browser.close());
})

describe("App.js", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        jest.setTimeout(200000)
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("Update a post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".get-posts");
        // await page.click(".add-post-form");
        // await page.type(".add-post-form", "New Post");
        // await page.click(".add-post-submit");
        await page.waitForSelector(".post-text");
        await page.click(".post-text");
        await page.click(".update-post-form");
        await page.type(".update-post-form", "Updated Post");
        await page.click(".update-post-submit");
        await page.waitForSelector(".post-text");
        const text3 = await page.$eval(".post-text", (e: Element) => e.textContent);
        expect(text3).toContain("Updated Post");
        // await page.click(".post-delete");
        await new Promise((r) => setTimeout(r, 2000));
        console.log("Test 3 passed")
    })

    afterAll(() => browser.close());
})

describe("App.js", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        jest.setTimeout(200000)
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("Delete a post", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".main-title");
        await page.click(".get-posts");
        // await page.click(".add-post-form");
        // await page.type(".add-post-form", "New Post 2");
        // await page.click(".add-post-submit");
        await page.waitForSelector(".post-text");
        await page.click(".post-delete");
        expect(screen.queryByText("Updated Post")).not.toBeInTheDocument();
        await new Promise((r) => setTimeout(r, 2000));
        console.log("Test 4 passed")
    })

    afterAll(() => browser.close());
});

   

