import puppeteer from "puppeteer";
import { constants } from "../constants";
import { SubmitDTO } from "../submitDTO";
import { PuppeteerRoutines } from "./routines";

/**
 * Puppeteer wrapper that handle puppeteer routines and inject
 * deps from lib/puppeteer routines and constants
 * @param submitDTO
 * @returns string - benefit of
 * @author Leoff00
 */
export async function scrapper(submitDTO: SubmitDTO): Promise<string> {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(constants.AGENT);
  await page.setExtraHTTPHeaders({
    Vary: "*",
  });

  await PuppeteerRoutines.loginPage(page, submitDTO);
  await page.goto(constants.URLS.EXTRACT);

  const benefit = await PuppeteerRoutines.collectBenefits(page, submitDTO);

  await PuppeteerRoutines.waitForExtractPageDelay();
  return benefit;
}
