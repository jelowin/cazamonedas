import { chromium } from "playwright";
import { db } from "@vercel/postgres";

export async function GET() {
  const scrappedData = [];

  try {
    const client = await db.connect();
  } catch (e) {
    console.log(" DATABASE CONNECTION ERROR --- ", e);
  }

  try {
    const browser = await chromium.launch({
      headless: true, // setting this to true will not run the UI
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(
      "https://www.ecb.europa.eu/euro/coins/comm/html/index.es.html"
    );

    const links = await page.$$eval("a.box", (links) => {
      return links.map((link) => link.href);
    });

    for (const link of links) {
      console.log(`Navigating to ${link}...`);
      await page.goto(link, {
        waitUntil: "domcontentloaded",
      });

      const elementHandles = await page.$$(".box", (a) => a.innerHTML);

      for (const elementHandle of elementHandles) {
        const country = await elementHandle.$eval(
          "h3",
          (node) => node.textContent
        );
        const reason = await elementHandle.$eval(
          "p:nth-of-type(1)",
          (node) => node.textContent
        );
        const description = await elementHandle.$eval(
          "p:nth-of-type(2)",
          (node) => node.textContent
        );

        let image = "";
        try {
          image = await elementHandle.$eval(".coins img", (node) => node.src);
        } catch {
          image = await elementHandle.$eval(
            ".coins .coin-cropper",
            (node) =>
              `https://www.ecb.europa.eu${node.attributes["data-image"].textContent}`
          );
        }

        let issueVolum = "";
        try {
          issueVolum = await elementHandle.$eval(
            "p:nth-of-type(3)",
            (node) => node.textContent
          );

          if (!issueVolum.includes("monedas")) {
            issueVolum = await elementHandle.$eval(
              "p:nth-of-type(4)",
              (node) => node.textContent
            );
          }
        } catch {
          issueVolum = "";
        }

        let issueDate = "";
        try {
          issueDate = await elementHandle.$eval(
            "p:nth-of-type(4)",
            (node) => node.textContent
          );

          if (issueDate.includes("monedas")) {
            issueDate = await elementHandle.$eval(
              "p:nth-of-type(5)",
              (node) => node.textContent
            );
          }
        } catch {
          issueDate = "";
        }

        scrappedData.push({
          ...(country.length && { country }),
          ...(description.length && {
            description: description.split(":").pop().trim(),
          }),
          ...(image.length && { image }),
          ...(issueDate.length && {
            issueDate: issueDate.split(":").pop().trim(),
          }),
          ...(issueVolum.length && {
            issueVolum: issueVolum.split(":").pop().trim(),
          }),
          ...(reason.length && { reason: reason.split(":").pop().trim() }),
          ...(link.length && {
            year: link.split("/").pop().split(".").shift().split("_").pop(),
          }),
        });
      }
    }
    await context.close();
    await browser.close();

    await client.sql`INSERT INTO coins(country, description, image, issueDate, issueVolum, reason, year)
                    VALUES (${country}, ${description}, ${image}, ${issueDate}, ${issueVolum}, ${reason}, ${year})
                    RETURNING id;`;
  } catch (e) {
    console.log("ERROR SCRAPPING --- ", e);
  }
}
