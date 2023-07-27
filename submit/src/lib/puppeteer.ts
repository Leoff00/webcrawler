import puppeteer from "puppeteer";
import { constants } from "../constants";
import { SubmitDTO } from "../submitDTO";

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export async function scrapper(submitDTO: SubmitDTO): Promise<string> {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(constants.AGENT);
  await page.setExtraHTTPHeaders({
    Vary: "*",
  });
  await page.goto(constants.URLS.MAIN);

  await delay(constants.TIMEOUT.REDIRECT_DELAY);

  const loginEl = await page.waitForSelector("input#user", {
    timeout: constants.TIMEOUT.WAIT_FOR_DELAY,
  });
  await loginEl.focus();
  await loginEl.type(submitDTO.login, {
    delay: constants.TIMEOUT.TYPING_DELAY,
  });

  await delay(100);

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
  await page.goto(constants.URLS.EXTRACT);

  await delay(constants.TIMEOUT.REDIRECT_DELAY);
  const ion = await page.waitForSelector(".backdrop-no-scroll");
  await ion.click({
    delay: constants.TIMEOUT.WAIT_CLICK_DELAY,
    offset: constants.MOUSE_POS,
  });

  await delay(constants.TIMEOUT.WAIT_FOR_EXTRACT_PAGE_DELAY);

  await page.$$eval("ion-button", (buttons: HTMLButtonElement[]) => {
    const btn = buttons[19];
    btn.click();
  });

  const inputCpf = await page.$('[placeholder="Digite o número do CPF . . ."]');
  await page.evaluate(
    (input: HTMLInputElement, cpf: string) => {
      input.value = cpf;
    },
    inputCpf,
    submitDTO.cpf
  );

  await page.$$eval(
    'ion-button[expand="full"]',
    (buttons: HTMLButtonElement[]) => {
      const btn = buttons[18];
      btn.click();
    }
  );

  await delay(constants.TIMEOUT.WAIT_FOR_EXTRACT_PAGE_DELAY);

  let res: string = "";
  const result = await page.$("ion-label");
  res = await result.evaluate((label: HTMLLabelElement) => {
    return label.innerText;
  }, result);

  console.log(res);
  return res;
}
