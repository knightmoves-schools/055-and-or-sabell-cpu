const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a function named taxable that takes two parameters state and taxExempt and returns the string "is taxable" if the state is IA and taxExempt is false', async function() {
      const result = await page.evaluate(() => {
        return taxable('IA', false);
      });

      expect(result).toBe('is taxable');
  });

  it('should not return the string "is taxable" if the state is IA and taxExempt is true ', async function() {
      const result = await page.evaluate(() => {
        return taxable('IA', true);
      });

      expect(result).not.toBe('is taxable');
  });

  it('should not return the string "is taxable" if the state is FL and taxExempt is false ', async function() {
      const result = await page.evaluate(() => {
        return taxable('FL', false);
      });

      expect(result).not.toBe('is taxable');     
  });

  it('should create a function named isVehicle that takes three parameters hasWheels, canFly, canSwim and returns the string "is vehicle" if at least one of the three parameters evaluates to true', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(true, true, true);
      });

      expect(result).toBe('is vehicle');
  });

  it('should return the string "is vehicle" when hasWheels is true and canFly and canSwim are both false', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(true, false, false);
      });

      expect(result).toBe('is vehicle');
  });

  it('should return the string "is vehicle" when canFly is true and hasWheels and canSwim are both false', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(false, true, false);
      });

      expect(result).toBe('is vehicle');       
  });

  it('should return the string "is vehicle" when canSwim is true and canFly and hasWheels are both false', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(false, false, true);
      });

      expect(result).toBe('is vehicle');        
  });

  it('should return the string "is vehicle" when canSwim and canFly are both true and hasWheels is false', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(false, true, true);
      });

      expect(result).toBe('is vehicle');        
  });

  it('should not return the string "is vehicle" when hasWheels, canFly, and canSwim are all false', async function() {
      const result = await page.evaluate(() => {
        return isVehicle(false, false, false);
      });

      expect(result).not.toBe('is vehicle');        
  });
});

