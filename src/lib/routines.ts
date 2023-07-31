import { SubmitDTO } from "submitDTO";
import { constants } from "../constants";
import { HTTPResponse, Page } from "puppeteer";

/**
 * Timer delay to wait some routine
 * @returns Promise <unknown>
 * @author Leoff00
 */
function delay(time: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
/**
 * Class with static methods that handle the login routine
 * routine and collect benefits routine
 * @author Leoff00
 */
export class PuppeteerRoutines {
  /**
   * Method that do request to target and returns the http response
   * to notify that login was succesfully done.
   * @param page
   * @param submitDTO
   * @returns Promise<HTTPResponse> - The response of the request
   * @author Leoff00
   */
  static async loginPage(
    page: Page,
    submitDTO: SubmitDTO
  ): Promise<HTTPResponse> {
    const response = await page.goto(constants.URLS.MAIN);

    await delay(constants.TIMEOUT.REDIRECT_DELAY);

    const loginEl = await page.waitForSelector("input#user", {
      timeout: constants.TIMEOUT.WAIT_FOR_DELAY,
    });
    await loginEl.focus();
    await loginEl.type(submitDTO.login, {
      delay: constants.TIMEOUT.TYPING_DELAY,
    });

    await delay(constants.TIMEOUT.SWITCH_FIELD_DELAY);

    const pwdEl = await page.waitForSelector("input#pass", {
      timeout: constants.TIMEOUT.WAIT_FOR_DELAY,
    });
    await pwdEl.focus();
    await pwdEl.type(submitDTO.password, {
      delay: constants.TIMEOUT.TYPING_DELAY,
    });

    const btn = await page.waitForSelector("button#botao", {
      timeout: constants.TIMEOUT.WAIT_FOR_DELAY,
    });
    await btn.focus();
    await btn.click();

    await delay(constants.TIMEOUT.REDIRECT_DELAY);

    return response;
  }

  /**
   * Method that scrap the benefit in the browser context and return
   * back to the node environment
   * @param page
   * @param submitDTO
   * @returns Promise<string> - The benefit
   * @author Leoff00
   */
  static async collectBenefits(
    page: Page,
    submitDTO: SubmitDTO
  ): Promise<string> {
    await page.goto(constants.URLS.EXTRACT);

    await PuppeteerRoutines.waitForExtractPageDelay();
    const ion = await page.waitForSelector(".backdrop-no-scroll");
    await ion.click({
      delay: constants.TIMEOUT.WAIT_CLICK_DELAY,
      offset: constants.MOUSE_POS,
    });

    await delay(constants.TIMEOUT.WAIT_FOR_ONE_SECOND_DELAY);
    await page.$$eval("ion-button", (buttons: HTMLButtonElement[]) =>
      buttons[19].click()
    );

    const inputCpf = await page.$(
      '[placeholder="Digite o número do CPF . . ."]'
    );
    await page.evaluate(
      (input: HTMLInputElement, cpf: string) => (input.value = cpf),
      inputCpf,
      submitDTO.cpf
    );

    await page.$$eval(
      'ion-button[expand="full"]',
      (buttons: HTMLButtonElement[]) => buttons[18].click()
    );

    await delay(constants.TIMEOUT.WAIT_FOR_EXTRACT_PAGE_DELAY);

    const result = await page.$("ion-label");
    const benefit = await result.evaluate(
      (label: HTMLLabelElement) => label.innerText,
      result
    );

    await page.close();
    return benefit;
  }

  /**
   * Method that abstract more than one delay timeout
   * @returns Promise<void>
   * @author Leoff00
   */
  static async waitForExtractPageDelay(): Promise<void> {
    await delay(constants.TIMEOUT.REDIRECT_DELAY);
  }
}
