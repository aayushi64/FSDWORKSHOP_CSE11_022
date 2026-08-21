import fs from "node:fs/promises";

const filePath = "userData1.json";

async function createFile(content) {
  try {
    await fs.writeFile(filePath, content, { encoding: "utf8" });
    console.log("File Created Successfully");
  } catch (err) {
    console.log("Error found:", err);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    console.log(data);
    console.log("File Read Successfully");
  } catch (err) {
    console.log("Error found:", err);
  }
}

async function appendFile(content) {
  try {
    await fs.appendFile(filePath, content, { encoding: "utf8" });
    console.log("File Appended");
  } catch (err) {
    console.log("Error found:", err);
  }
}

async function sequence() {
  await createFile("First Line of Code\n");
  await appendFile("Second line to append\n");
  await readFile();
  // ❌ Removed deleteFile() so file stays
}

sequence();
