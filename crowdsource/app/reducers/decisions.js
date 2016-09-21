export default function() {
  let arr = [], i = 10;
  while (i--) {
    arr.push({text: `TEST${10 - i}`, ord: i})
  }
  return arr;
}
