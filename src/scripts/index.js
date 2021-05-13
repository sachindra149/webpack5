import "../stylesheet/index.scss";
import { TestFile } from "./test-file.js";

console.log("This is a testing webpack");

console.log("This is a testing from JS test.js.");
console.log(TestFile);

const obj = { a: "alpha", b: "bravo" };
const newObj = { ...obj, c: "charlie", d: "testing" }
console.log("ES7 Object Spread Example: ", newObj);