import "./import";
import { add, subtract } from "./math";

const name = "James";

const person = { first: name };

console.log(person);

const sayHelloLinting = (fName) => {
  console.log(`Hello linting, ${fName}`);
};

sayHelloLinting("yow");

console.log(add(12, 16));
console.log(subtract(15, 13));
