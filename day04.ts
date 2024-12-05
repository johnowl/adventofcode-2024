import { runner } from "./lib";

const parseInput = (input: string): string[][] => {
  const lines = input.split("\n");
  return lines.map((line) => line.split(""));
};

const part1 = (input: string) => {
  const lines: string[][] = parseInput(input);

  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "X") {
        // check if the current character is X and the next 3 characters are M, A, S
        if (
          lines[i]?.[j + 1] === "M" &&
          lines[i]?.[j + 2] === "A" &&
          lines[i]?.[j + 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if the current character is X and the previous 3 characters are M, A, S
        if (
          lines[i]?.[j - 1] === "M" &&
          lines[i]?.[j - 2] === "A" &&
          lines[i]?.[j - 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going down 3 lines, the current character is X and the next 3 characters are M, A, S
        if (
          lines[i + 1]?.[j] === "M" &&
          lines[i + 2]?.[j] === "A" &&
          lines[i + 3]?.[j] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going up 3 lines, the current character is X and the next 3 characters are M, A, S
        if (
          lines[i - 1]?.[j] === "M" &&
          lines[i - 2]?.[j] === "A" &&
          lines[i - 3]?.[j] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going up diagonally 3 lines to the right, the characters are M, A, S
        if (
          lines[i - 1]?.[j + 1] === "M" &&
          lines[i - 2]?.[j + 2] === "A" &&
          lines[i - 3]?.[j + 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going up diagonally 3 lines to the left, the characters are M, A, S
        if (
          lines[i - 1]?.[j - 1] === "M" &&
          lines[i - 2]?.[j - 2] === "A" &&
          lines[i - 3]?.[j - 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going down diagonally 3 lines to the left, the characters are M, A, S
        if (
          lines[i + 1]?.[j - 1] === "M" &&
          lines[i + 2]?.[j - 2] === "A" &&
          lines[i + 3]?.[j - 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }

        // check if going down diagonally 3 lines to the right, the characters are M, A, S
        if (
          lines[i + 1]?.[j + 1] === "M" &&
          lines[i + 2]?.[j + 2] === "A" &&
          lines[i + 3]?.[j + 3] === "S"
        ) {
          console.log("Found XMAS at", i, j);
          total++;
        }
      }
    }
  }
  console.log(total);
};

const part2 = (input: string) => {
  const lines: string[][] = parseInput(input);

  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "A") {
        if (
          ((lines[i - 1]?.[j - 1] === "S" && lines[i + 1]?.[j + 1] === "M") ||
            (lines[i - 1]?.[j - 1] === "M" && lines[i + 1]?.[j + 1] === "S")) &&
          ((lines[i - 1]?.[j + 1] === "S" && lines[i + 1]?.[j - 1] === "M") ||
            (lines[i - 1]?.[j + 1] === "M" && lines[i + 1]?.[j - 1] === "S"))
        ) {
          total++;
        }
      }
    }
  }
  console.log(total);
};

runner("day04", part1, part2);
