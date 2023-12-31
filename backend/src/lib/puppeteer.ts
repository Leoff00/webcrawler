import puppeteer, { ProtocolError } from "puppeteer";
import { constants } from "../constants";
import { SubmitDTO } from "../submitDTO";
import { PuppeteerRoutines } from "./routines";
import { logTypes } from "../logger";

/**
 * Puppeteer wrapper that handle puppeteer routines and inject
 * deps from lib/puppeteer routines and constants
 * @param submitDTO
 * @returns Promise<string> - benefit searched
 * @author Leoff00
 */
export async function scrapper(submitDTO: SubmitDTO): Promise<string> {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: process.env.PUPPETEER_PATH || null,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(constants.AGENT);
    await page.setExtraHTTPHeaders({
      Vary: "*",
    });

    await PuppeteerRoutines.loginPage(page, submitDTO);

    const benefit = await PuppeteerRoutines.collectBenefits(page, submitDTO);

    await browser.close();

    return benefit;
  } catch (error: unknown) {
    const err = error as ProtocolError;
    logTypes.errorLog.error(`[PUPPETEER] - ${err}`);
  }
}
