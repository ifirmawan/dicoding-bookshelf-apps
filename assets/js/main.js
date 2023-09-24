const urlParams = new URLSearchParams(window.location.search);
const searchText = urlParams.get("search");
const jsonBooks = localStorage.getItem("MyBooks") || "[]";
const allBooks = JSON.parse(jsonBooks).filter((jb) => {
  if (searchText) {
    return jb?.title?.toLowerCase()?.includes(searchText.toLowerCase());
  }
  return jb;
});
const unreads = allBooks.filter((ab) => ab.isComplete === false);
const reads = allBooks.filter((ab) => ab.isComplete === true);

const renderItems = (data, templateID, targetID) => {
  const template = document.getElementById(templateID).content.cloneNode(true);
  const ulElement = document.querySelector(`ul#${targetID}`); // Assuming you have a <ul> element in your HTML

  data.forEach((d) => {
    /**
     * Input content
     */
    const titleElement = template.querySelector("h3");
    titleElement.textContent = d.title;
    const authEl = template.querySelector("#author");
    const yearEl = template.querySelector("#year");
    const authNode = document.createTextNode(d.author);
    authEl.appendChild(authNode);
    const yearNode = document.createTextNode(d.year);
    yearEl.appendChild(yearNode);
    /**
     * Assign book id to the buttons
     */
    const checklistBtn = template.querySelector(".book-checklist");
    if (checklistBtn) {
      checklistBtn.dataset.id = d.id;
    }
    const unreadBtn = template.querySelector(".book-unread");
    if (unreadBtn) {
      unreadBtn.dataset.id = d.id;
    }
    const removeBtn = template.querySelector(".book-remove");
    removeBtn.dataset.id = d.id;
    /**
     * Append to list item
     */
    const liElement = document.createElement("li");
    const tempClone = document.importNode(template, true);
    liElement.appendChild(tempClone);
    ulElement.appendChild(liElement);
  });
};

const handleOnChecklist = (el) => {
  const _books = allBooks.map((r) =>
    r.id === parseInt(el.dataset.id, 10) ? { ...r, isComplete: true } : r
  );
  localStorage.setItem("MyBooks", JSON.stringify(_books));
  window.location.reload();
};

const handleOnRemove = (el) => {
  if (confirm("Apakah anda yakin?")) {
    const _books = allBooks.filter((r) => r.id !== parseInt(el.dataset.id, 10));
    localStorage.setItem("MyBooks", JSON.stringify(_books));
    window.location.reload();
  }
};

const handleOnUnread = (el) => {
  const _books = allBooks.map((r) =>
    r.id === parseInt(el.dataset.id, 10) ? { ...r, isComplete: false } : r
  );
  localStorage.setItem("MyBooks", JSON.stringify(_books));
  window.location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  renderItems(unreads, "temp-unread", "incompleteBookshelfList");
  renderItems(reads, "temp-read", "completeBookshelfList");
});
