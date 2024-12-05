import { runner } from "./lib";

const parseFile = (input: string, validate: (report: number[]) => boolean) => {
  const lines = input.split("\n");
  let total = 0;
  lines.map((line) => {
    const report = line.split(" ").map((num) => parseInt(num));
    if (validate(report)) {
      total++;
    }
  });
  console.log(total);
};

const MAX_VARIATION = 3;
const MIN_VARIATION = 1;
const isValid = (current: number, next: number): boolean => {
  if (Math.abs(current - next) > MAX_VARIATION) {
    return false;
  }

  if (Math.abs(current - next) < MIN_VARIATION) {
    return false;
  }

  return true;
};

const isOrderedAscending = (report: number[]): boolean => {
  const sorted = report.slice().sort((a, b) => a - b);
  for (let i = 0; i < report.length; i++) {
    if (report[i] !== sorted[i]) {
      return false;
    }
  }
  return true;
};

const isOrderedDescending = (report: number[]): boolean => {
  const sorted = report.slice().sort((a, b) => b - a);
  for (let i = 0; i < report.length; i++) {
    if (report[i] !== sorted[i]) {
      return false;
    }
  }
  return true;
};

const isOrdered = (report: number[]): boolean => {
  return isOrderedAscending(report) || isOrderedDescending(report);
};

const part1 = (input: string) => {
  parseFile(input, (report) => {
    if (!isOrdered(report)) {
      console.log(`The report is not ordered: ${report}`);
      return false;
    }

    for (let i = 1; i < report.length; i++) {
      const previous = report[i - 1];
      const current = report[i];

      if (!isValid(previous, current)) {
        console.log(`Invalid: ${previous} ${current}`);
        return false;
      }
    }

    return true;
  });
};

const isReportValid = (report: number[]): boolean => {
  if (!isOrdered(report)) {
    return false;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];

    if (!isValid(current, next)) {
      return false;
    }
  }

  return true;
};

const part2 = (input: string) => {
  parseFile(input, (report) => {
    console.log("--------------------");
    console.log(report.join(" "));

    let valid = isReportValid(report);
    if (!valid) {
      for (let i = 0; i < report.length; i++) {
        const copy = report.slice();
        copy.splice(i, 1);
        if (isReportValid(copy)) {
          console.log(`Removing ${report[i]} makes the report valid`);
          return true;
        }
      }
      console.log("The report is invalid");
      return false;
    } else {
      console.log("The report is valid");
      return true;
    }
  });
};

runner("day02", part1, part2);
