import fs from "fs";
import * as FM from "./FM.js";
import * as LG from "./LG.js";

const outputFolderPath = "./public/site";
const outputPath = "./public/site/index.html";
const inputPath = "./input.md";

async function initOutputFolder() {
  await fs.mkdirSync(outputFolderPath, { recursive: true });
}

async function setHtmlContent(content) {
  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, World</title>
</head>

<body>
  ${content}
</body>

</html>
`.trim();

  const success = await FM.write(outputPath, html);

  return success;
}

function generateLinksToNotes(titleAndPathForNotes) {
  return titleAndPathForNotes.map(x => `<a href="${x.path}" >${x.title}</a>`);
}

(async function main() {
  await initOutputFolder();

  const dummyTitleAndPathForNotes = [
    { title: "how to write assembly in Python", path: "./notes/python/" },
    { title: "how to create Python virtual environment", path: "./notes/python/" },
    { title: "spinning up a MongoDB container in Docker", path: "./notes/python/" },
  ];

  const input = await FM.read(inputPath);
  // const noteLinks = generateLinksToNotes(dummyTitleAndPathForNotes);


  let success = await setHtmlContent(input);
  // let success = await setHtmlContent(noteLinks.join("\n"));

  if (!success) {
    const errorMessage = "Failed to write HTML to file!";
    LG.log(errorMessage);
    console.error(errorMessage);
  } else {
    const logMessage = `Wrote ${input} to ${outputPath}.`;
    // const logMessage = `Wrote ${noteLinks} to ${outputPath}.`;
    LG.log(logMessage);
    console.log(logMessage);
  }

})();