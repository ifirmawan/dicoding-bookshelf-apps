const addForm = document.getElementById("inputBook");

addForm.addEventListener("submit", (e) => {
  // on form submission, prevent default
  e.preventDefault();
  const formData = new FormData(addForm);
  const isComplete = formData.get("isComplete") ? true : false;
  const newBook = {
    id: Date.now(),
    title: formData.get("title"),
    author: formData.get("author"),
    year: formData.get("year"),
    isComplete: isComplete,
  };
  const stringBooks = localStorage.getItem("MyBooks") || "[]";
  const books = JSON.parse(stringBooks);
  const isExists = books.find((b) =>
    b?.title?.toLowerCase()?.includes(newBook.title.toLowerCase())
  );
  if (isExists) {
    document.getElementById("inputBookTitle").after("<>");
  }
  if (!isExists) {
    books.push(newBook);
  }
  if (books) {
    localStorage.setItem("MyBooks", JSON.stringify(books));
    window.location.href = "/";
  }
});
