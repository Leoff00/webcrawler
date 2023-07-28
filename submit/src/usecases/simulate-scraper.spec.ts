import puppeteer, { Browser, HTTPResponse, Page } from "puppeteer";
import { PuppeteerRoutines } from "../lib/routines";
import { expect, test, describe, beforeAll, afterAll } from "vitest";

/** Time of vitest handle the case */
const TIMEOUT_TEST_RUNNING = 25000;

describe("Login in page test case", () => {
  let browser: Browser;
  let page: Page;
  let response: HTTPResponse;
  let isLogged: boolean;

  const payload = {
    login: "konsiteste2",
    password: "konsiteste2",
    cpf: "124.440.495-00",
  };
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: "new" });
    page = await browser.newPage();
    response = await PuppeteerRoutines.loginPage(page, payload);
    isLogged = response.status() === 200;
  });

  afterAll(async () => {
    await browser.close();
  });

  test(
    "Should catch the benefit number",
    async () => {
      const benefit =
        isLogged && (await PuppeteerRoutines.collectBenefits(page, payload));

      expect(benefit).equal("1858068450");
    },
    { timeout: TIMEOUT_TEST_RUNNING }
  );
});
