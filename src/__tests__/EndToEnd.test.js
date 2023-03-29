import puppeteer from 'puppeteer';
const { ResizeObserver } = window;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

describe('Show/hide an event details', () => {
    
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch(
            // {
            //     headless: false,
            //     slowMo: 250, // slow down by 250ms
            //     ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
            //     }
          );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });
    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.details-btn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeDefined();  
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.details-btn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();  
    });
});

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch(
            // {
            //     headless: false,
            //     slowMo: 250, // slow down by 250ms
            //     ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
            //     }
          );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });
    afterAll(() => {
        browser.close();
    });

    test('Events from all cities are shown by default', async () => {
        const eventList = await page.$$('.EventList li');
        expect(eventList).toHaveLength(2);
    });

    test('User should see a list of suggestions when searching for specific city', async () => {
        await page.type('.city', 'Berlin');
        const suggestionList = await page.$$('.suggestions li');
        expect(suggestionList).toHaveLength(2);
        const targetCity = await page.$('.suggestions li');
        const targetCityText = await page.evaluate(el => el.textContent.trim(), targetCity);
        expect(targetCityText).toBe('Berlin, Germany');
    });

    test('User can select a city from suggested list', async () => {
        await page.click('.suggestions li');
        const eventLocation = await page.$('.event .event-location');
        const locationText = await page.evaluate(element => element.textContent, eventLocation);
        expect(locationText).toContain('Berlin');
    });
});