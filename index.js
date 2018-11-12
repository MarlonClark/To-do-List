// To-Do List
"use strict";

const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

// To-Do List items, check if in localStorage
let itemData = JSON.parse(localStorage.getItem("list")) || [];
if (itemData.length > 0) {
  itemData.forEach(addItem);
}

// Form submission
itemForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const textValue = itemInput.value;

  // Empty text warning
  if (textValue === "") {
    showFeedback("Please enter some text.", "danger");
  } else {
    // Add item
    addItem(textValue);
    // add to array
    itemData.push(textValue);
    // Update local storage
    localStorage.setItem("list", JSON.stringify(itemData));
    // Clear form after submit
    itemInput.value = "";
  }
});

// Show feedback
function showFeedback(text, action) {
  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`;
  setTimeout(function() {
    feedback.classList.remove("showItem", `alert-${action}`);
  }, 3000);
}

// Add list item
function addItem(textValue) {
  const div = document.createElement("div");
  div.classList.add("item", "list-group-item");
  div.innerHTML = `<h5 class="item-name d-flex justify-content-start text-capitalize text-truncate text-left">${textValue}</h5>
  <div class="item-icons d-flex justify-content-end">
    <a href="#" class="complete-item mx-1 item-icon">
      <i class="far fa-check-circle"></i></a>
    <a href="#" class="edit-item mx-1 item-icon">
      <i class="far fa-edit"></i></a>
    <a href="#" class="delete-item item-icon">
      <i class="far fa-trash-alt"></i></a>
  </div>`;

  itemList.appendChild(div);
  // Handle icon functioning
  handleItem(textValue);
}

// Icon functionality
function handleItem(textValue) {
  const items = itemList.querySelectorAll(".item");
  items.forEach(function(item) {
    if (item.querySelector(".item-name").textContent === textValue) {
      // Completed item
      item
        .querySelector(".complete-item")
        .addEventListener("click", function() {
          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
        });
      // Edit item
      item.querySelector(".edit-item").addEventListener("click", function() {
        itemInput.value = textValue;
        itemList.removeChild(item);
        itemData = itemData.filter(function(item) {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));
        showFeedback("Ready to edit", "warning");
      });
      // Delete item
      item.querySelector(".delete-item").addEventListener("click", function() {
        itemList.removeChild(item);
        itemData = itemData.filter(function(item) {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));
        showFeedback("Item deleted!", "success");
      });
    }
  });
}

// Clear to-do list
clearBtn.addEventListener("click", function() {
  itemData = [];
  localStorage.removeItem("list");
  const items = itemList.querySelectorAll(".item");
  if (items.length > 0) {
    items.forEach(function(item) {
      itemList.removeChild(item);
    });
  }
});
