import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { db } from "@vercel/postgres";

export async function GET() {
  let country;
  let description;
  let reason;
  let issueDate;
  let issueVolum;
  let image;
  let year;

  if (process.env.IS_BUILD) {
    return;
  }

  const scrappedData = [];
  const client = await db.connect();

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
      console.log(links);
      return links
        .filter((link) => link.href.includes("2023"))
        .map((link) => link.href);
    });

    for (const link of links) {
      console.log(`Navigating to ${link}...`);
      await page.goto(link, {
        waitUntil: "domcontentloaded",
      });

      const elementHandles = await page.$$(".box", (a) => a.innerHTML);

      for (const elementHandle of elementHandles) {
        try {
          country = await elementHandle.$eval("h3", (node) => node.textContent);
        } catch {
          country = "null";
        }

        try {
          reason = await elementHandle.$eval(
            ".content-box:nth-child(2) p",
            (node) => node
          );
          console.log("REASON----", reason.textContent);
          if (reason.textContent === "") {
            reason = node.textContent.split(":")[1];
          } else {
            reason = reason.textContent;
          }
        } catch {
          reason = "null";
        }

        try {
          description = await elementHandle.$eval(
            "p:nth-of-type(2)",
            (node) => node.textContent
          );
        } catch {
          description = "null";
        }

        try {
          image = await elementHandle.$eval(".coins img", (node) => node.src);
        } catch {
          image = await elementHandle.$eval(
            ".coins .coin-cropper",
            (node) =>
              `https://www.ecb.europa.eu${node.attributes["data-image"].textContent}`
          );
        }

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
          issueVolum = "null";
        }

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
          issueDate = "null";
        }

        try {
          year = link.split("/").pop().split(".").shift().split("_").pop();
        } catch {
          year = "null";
        }

        scrappedData.push({
          ...(country && { country }),
          ...(description && {
            description: description.split(":").pop().trim(),
          }),
          ...(image && { image }),
          ...(issueDate && {
            issueDate: issueDate.split(":").pop().trim(),
          }),
          ...(issueVolum && {
            issueVolum: issueVolum.split(":").pop().trim(),
          }),
          ...(reason && { reason: reason.split(":").pop().trim() }),
          ...(link.length && {
            year: link.split("/").pop().split(".").shift().split("_").pop(),
          }),
        });
      }
    }
    await context.close();
    await browser.close();

    console.log("Inserting data into DB...");
    for (const data of scrappedData) {
      await client.sql`
        INSERT INTO coins(country, description, image, issueDate, issueVolum, reason, year)
        VALUES (${data.country}, ${data.description}, ${data.image}, ${data.issueDate}, ${data.issueVolum}, ${data.reason}, ${data.year})
        ON CONFLICT(reason) DO NOTHING
      `;
    }

    await db.end();
    console.log("END: Rows created");
    return NextResponse.json({ message: "Rows created", status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Scrapper error", status: 500 });
  }
}
