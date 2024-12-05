import { runner } from "./lib";

type OrderingRule = {
  left: number;
  right: number;
};

type Report = {
  rules: OrderingRule[];
  updates: number[][];
};

const parseFile = (input: string): Report => {
  let updates = false;
  const report: Report = {
    rules: [],
    updates: [],
  };
  for (const line of input.split("\n")) {
    if (line === "") {
      updates = true;
      continue;
    }

    if (updates) {
      report.updates.push(line.split(",").map((num) => parseInt(num)));
    } else {
      const [left, right] = line.split("|");
      report.rules.push({
        left: parseInt(left),
        right: parseInt(right),
      });
    }
  }

  return report;
};

const part1 = (input: string) => {
  const report = parseFile(input);

  const result: number[] = [];
  for (const update of report.updates) {
    let isValid = true;
    for (const rule of report.rules) {
      const indexOfLeft = update.indexOf(rule.left);
      const indexOfRight = update.indexOf(rule.right);
      if (indexOfLeft === -1 || indexOfRight === -1) {
        continue;
      }

      if (indexOfLeft > indexOfRight) {
        console.log("Invalid update", update, "because", rule);
        console.log("Middle is", Math.floor(update.length / 2));
        isValid = false;
        break;
      }
    }

    if (isValid) {
      const middle = update[Math.floor(update.length / 2)];
      result.push(middle);
    }
  }
  console.log(result.reduce((acc, val) => acc + val, 0));
};

const findNextViolatedRule = (
  update: number[],
  rules: OrderingRule[]
): OrderingRule | null => {
  for (const rule of rules) {
    const indexOfLeft = update.indexOf(rule.left);
    const indexOfRight = update.indexOf(rule.right);
    if (indexOfLeft === -1 || indexOfRight === -1) {
      continue;
    }

    if (indexOfLeft > indexOfRight) {
      return rule;
    }
  }

  return null;
};

const fixReport = (
  rule: OrderingRule | null,
  update: number[],
  allRules: OrderingRule[]
): number[] => {
  if (rule === null) {
    return update;
  }

  const indexOfLeft = update.indexOf(rule.left);
  const indexOfRight = update.indexOf(rule.right);

  update[indexOfLeft] = rule.right;
  update[indexOfRight] = rule.left;

  return fixReport(findNextViolatedRule(update, allRules), update, allRules);
};

const part2 = (input: string) => {
  const report = parseFile(input);

  const result: number[] = [];
  for (const update of report.updates) {
    let isValid = true;
    for (const rule of report.rules) {
      const indexOfLeft = update.indexOf(rule.left);
      const indexOfRight = update.indexOf(rule.right);
      if (indexOfLeft === -1 || indexOfRight === -1) {
        continue;
      }

      if (indexOfLeft > indexOfRight) {
        console.log("Invalid update", update, "because", rule);
        fixReport(rule, update, report.rules);
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      console.log("Updated invalid update", update);
      const middle = update[Math.floor(update.length / 2)];
      result.push(middle);
    }
  }
  console.log(result.reduce((acc, val) => acc + val, 0));
};

runner("day05", part1, part2);
