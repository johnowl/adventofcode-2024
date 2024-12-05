import { runner } from "./lib";

const part1 = function (input: string) {
  const matches = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  if (matches === null) {
    console.log("No matches found");
    return;
  }

  const result = matches
    .map(function (match) {
      var nums = match.match(/[0-9]{1,3}/g);
      if (nums === null || nums.length !== 2) {
        return 0;
      }
      return parseInt(nums[0]) * parseInt(nums[1]);
    })
    .reduce(function (acc: number, val: number) {
      return acc + val;
    }, 0);

  console.log(result);
};

const part2 = function (input: string) {
  const matches = input.match(
    /(do\(\))|(don't\(\))|(mul\([0-9]{1,3},[0-9]{1,3}\))/g
  );
  if (matches === null) {
    console.log("No matches found");
    return;
  }

  let blocked = false;
  const result = matches
    .map(function (match) {
      if (match === "don't()") {
        blocked = true;
        return 0;
      }

      if (blocked) {
        if (match === "do()") {
          blocked = false;
        }
        return 0;
      }
      var nums = match.match(/[0-9]{1,3}/g);
      if (nums === null || nums.length !== 2) {
        return 0;
      }

      return parseInt(nums[0]) * parseInt(nums[1]);
    })
    .reduce(function (acc: number, val: number) {
      return acc + val;
    }, 0);

  console.log(result);
};

runner("day03", part1, part2);
