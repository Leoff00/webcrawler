/**
 * Puppeteer object that handle the scraper routine constants
 * @author Leoff00
 */
export const constants = {
  MOUSE_POS: {
    x: 700,
    y: 400,
  },
  TIMEOUT: {
    REDIRECT_DELAY: 2000,
    SWITCH_FIELD_DELAY: 100,
    TYPING_DELAY: 25,
    WAIT_CLICK_DELAY: 250,
    WAIT_FOR_DELAY: 125,
    WAIT_FOR_CLICK_BTN_DELAY: 1000,
    WAIT_FOR_ONE_SECOND_DELAY: 1000,
    WAIT_FOR_EXTRACT_PAGE_DELAY: 3000,
  },
  URLS: {
    EXTRACT:
      "http://ionic-application.s3-website-sa-east-1.amazonaws.com/home/extrato",
    MAIN: "http://ionic-application.s3-website-sa-east-1.amazonaws.com",
  },
  AGENT:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 Edg/94.0.992.50",
};
