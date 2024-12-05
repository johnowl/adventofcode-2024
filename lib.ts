import * as fs from "fs";

export const runner = (
  day: string,
  part1: (input: string) => void,
  part2: (input: string) => void
) => {
  const filename = process.argv[2];
  const part = process.argv[3];
  if (!filename || !part) {
    throw new Error("Usage: node <filename>.ts <input.ext> <partN>");
  }

  const file = fs.openSync(`${day}/${filename}`, "r");
  const input = fs.readFileSync(file, "utf8");
  fs.closeSync(file);

  if (part === "part1") {
    part1(input);
  } else if (part === "part2") {
    part2(input);
  } else {
    throw new Error("Invalid part");
  }
};
