const jsonBooks = localStorage.getItem("MyBooks") || "[]";
const allBooks = JSON.parse(jsonBooks);
const unreads = allBooks.filter((ab) => ab.isComplete === false);
const reads = allBooks.filter((ab) => ab.isComplete === true);

console.log("unreads", unreads);
console.log("reads", reads);
