// trigger search button
document.getElementById("search-btn").addEventListener("click", () => {
  let inputField = document.getElementById("input-fileld");
  let inputValue = inputField.value;
  searchData(inputValue);
});

// search Data using api
let searchData = async (value) => {
  url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  let res = await fetch(url);
  let data = await res.json();
  if (data.status) {
    displayCards(data.data);
  } else {
    searchNotFound();
  }
};

// displayCards
let displayCards = (data) => {
  let displayDiv = document.getElementById("results");
  displayDiv.innerHTML = "";
  data.forEach((data) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
    <img src="${data.image}" alt="" />
            <div><strong>Phone name : </strong><span>${data.phone_name}</span></div>
            <div><strong>Brand name : </strong><span>${data.brand}</span></div>
            <div><button id="explore" onclick="showDetails(${data.slug})">Explore</button></div>
    `;
    displayDiv.appendChild(card);
  });
};
// search not found
let searchNotFound = () => {
  notFound = document.getElementById("not-found");
  notFound.style.display = "grid";
};
// hide search not found
let hideNotFound = () => {
  notFound = document.getElementById("not-found");
  notFound.style.display = "none";
};
// show details
let showDetails = (slug) => {};
