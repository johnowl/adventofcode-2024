import { runner } from "./lib";

const parseFile = (input: string) => {
  const left: number[] = [];
  const right: number[] = [];
  input.split("\n").forEach((line) => {
    const [a, b] = line.split("   ");

    left.push(parseInt(a));
    right.push(parseInt(b));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return [left, right];
};

const part1 = (input: string) => {
  const [left, right] = parseFile(input);
  let total = 0;
  for (let i = 0; i < left.length; i++) {
    total += Math.abs(left[i] - right[i]);
  }

  console.log(total);
};

// this is horribly inefficient, but it works
// TODO: because both arrays are sorted, we can start from where
// we stopped in the previous iteration
const countOcurrences = (of: number, arr: number[]) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === of) {
      count++;
    }
  }
  return count;
};

const part2 = (input: string) => {
  const [left, right] = parseFile(input);
  let total = 0;
  for (let i = 0; i < left.length; i++) {
    const ocurrences = countOcurrences(left[i], right);
    // for performance reasons, we could memoize the ocurrences of each number
    total = total + ocurrences * left[i];
  }
  console.log(total);
};

runner("day01", part1, part2);
