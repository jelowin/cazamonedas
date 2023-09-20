// import { NextResponse } from "next/server";
// import { chromium } from "playwright";
// import { db } from "@vercel/postgres";

// export async function GET() {
//   let country;
//   let description;
//   let reason;
//   let issueDate;
//   let issueVolum;
//   let image;
//   let year;

//   if (process.env.IS_BUILD) {
//     return;
//   }

//   const scrappedData = [];
//   //const client = await db.connect();

//   try {
//     const browser = await chromium.launch({
//       headless: true, // setting this to true will not run the UI
//     });
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto(
//       "https://coleccionismodemonedas.com/catalogo-de-monedas-de-euro/conmemorativas/por-fecha/"
//     );

//     const links = await page.$$eval("a.tdm-image-holder", (links) => {
//       return links
//         .filter((link) => link.href.includes("2023"))
//         .map((link) => link.href);
//     });

//     for (const link of links) {
//       console.log(`Navigating to ${link}...`);
//       await page.goto(link, {
//         waitUntil: "domcontentloaded",
//       });

//       await page.waitForSelector("#tdi_88");

//       const elementHandles = await page.$$(
//         ".wpb_wrapper:has(.tdm-col-content-info)",
//         (a) => a.innerHTML
//       );

//       for (const elementHandle of elementHandles) {
//         console.log("2------------------");

//         let coinLinks = await page.$$("a.tdm-col-content-title-url");

//         for (const coinLink of coinLinks) {
//           console.log("COIN LINKM", coinLink);
//           await page.goto(coinLink, {
//             waitUntil: "domcontentloaded",
//           });
//           await page.waitForSelector(".wpb_wrapper");

//           // const detailLink = await elementHandle.$eval(
//           //   "a.tdm-col-content-title-url",
//           //   (node) => node.href
//           // );

//           // const enlaces = await page
//           //   .getByRole("link", { name: "Ver ficha" })
//           //   .innerHTML();
//           // console.log("LINK", enlaces);
//           // for (const li of enlaces) {
//           // }

//           // GO TO DETAIL
//           // await page.goto(detailLink, {
//           //   waitUntil: "domcontentloaded",
//           // });

//           // const featuresInfo = await page.$$(
//           //   ".tdc-zone",
//           //   (node) => node.innerHTML
//           // );

//           // reason = await page.$eval(".motivo", (node) => node.textContent);

//           country = await page.$eval(
//             "#tdi_99 .tdm-pricing-feature b:first-child",
//             (node) => node.textContent
//           );

//           // year = await page.$eval(
//           //   "#tdi_99 .tdm-pricing-feature b:nth-child(2)",
//           //   (node) => node.textContent
//           // );

//           // issueDate = await page.$eval(
//           //   "#tdi_99 .tdm-pricing-feature:nth-child(3) b:first-child",
//           //   (node) => node.textContent
//           // );

//           // // ".tdi_118 .tdm-pricing-header .tdm-pricing-price-1",
//           // issueVolum = await page.$eval(
//           //   ".tdi_118 ul.tdm-pricing-features li.tdm-pricing-feature:first-child",
//           //   (node) => node.textContent.split(":")[1].trim()
//           // );

//           // description = await page.$eval("#tdi_253 .tdi_256 .tdm-descr", (node) =>
//           //   node.textContent.replace(/[\n\r]+|[\s]{2,}/g, " ").trim()
//           // );

//           // dificulty = await feature.$eval(
//           //   ".tdi_124 .tdm-pricing-header .tdm-pricing-price-1",
//           //   (node) => node.textContent
//           // );

//           console.log({
//             country,
//             year,
//             issueDate,
//             issueVolum,
//             description,
//             reason,
//           });

//           await page.goBack();
//           await page.waitForSelector("#tdi_88");
//           coinLinks = await page.$$("a.tdm-col-content-title-url");
//         }
//         /*********************** */
//       }
//     }

//     // await db.end();
//     await browser.close();
//     console.log("END: Rows created");
//     return NextResponse.json({ message: "Rows created", status: 201 });
//   } catch (e) {
//     return NextResponse.json({ message: "Scrapper error", status: 500 });
//   }
// }
