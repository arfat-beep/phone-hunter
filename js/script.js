// trigger search button
document.getElementById("search-btn").addEventListener("click", () => {
  let inputField = document.getElementById("input-fileld");
  let inputValue = inputField.value;
  inputValue = inputValue.toLowerCase();
  inputField.value = "";
  searchData(inputValue);
});

// search Data using api
let searchData = async (value) => {
  url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  let res = await fetch(url);
  let data = await res.json();
  if (data.status) {
    let notFound = document.getElementById("not-found");
    notFound.style.display = "none";

    let detailsDiv = document.getElementById("details");
    detailsDiv.innerHTML = "";
    let loader = document.getElementById("loader");
    loader.style.display = "block";
    displayCards(data.data);
    loader.style.display = "none";
  } else {
    searchNotFound();
  }
};

// displayCards
let displayCards = (data) => {
  console.log(data);
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  if (data.length >= 20) {
    displayCardsMin(data);
  } else {
    displayCardsMin(data);
  }
};
// display cards only 20
let displayCardsMin = (data) => {
  var loadData = data;

  let showMoreButton = document.getElementById("show-more");
  showMoreButton.style.display = "block";
  let data2 = data.slice(0, 20);
  addCard(data2);
  showMoreButton.addEventListener("click", () => {
    showMoreButton.style.display = "none";
    addCard(data);
  });
};
let addCard = (data) => {
  let displayDiv = document.getElementById("results");
  displayDiv.innerHTML = "";
  data.forEach((data2) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
  <img src="${data2.image}" alt="" />
          <div><strong>Phone name : </strong><span>${data2.phone_name}</span></div>
          <div><strong>Brand name : </strong><span>${data2.brand}</span></div>
          <div><button id="explore" onclick="showDetails('${data2.slug}')">Explore</button></div>
  `;
    displayDiv.appendChild(card);
  });
};

// search not found
let searchNotFound = () => {
  let displayDiv = document.getElementById("results");
  displayDiv.innerHTML = "";
  let detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "";
  let notFound = document.getElementById("not-found");
  notFound.style.display = "grid";
};
// hide search not found
let hideNotFound = () => {
  notFound = document.getElementById("not-found");
  notFound.style.display = "none";
};
// show details
let showDetails = async (slug) => {
  url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  let res = await fetch(url);
  let data = await res.json();
  let detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "";
  let div = document.createElement("div");
  let sensors = data.data.mainFeatures.sensors.join(", ");
  if (data.data.releaseDate) {
    releaseDate = data.data.releaseDate;
  } else {
    releaseDate = "No release date found";
  }
  console.log(data.data.releaseDate);
  div.innerHTML = `
          <img src="${data.data.image}" alt="" />
          <div><strong>Phone name : </strong><span>${
            data.data.name
          }</span></div>
          <div><strong>Release date : </strong><span>${releaseDate}</span></div>
          <div><strong>Main Features : </strong></div>
          <div>
            <ul>
              <li>
                <strong>Storage:</strong> ${data.data.mainFeatures.storage}.
              </li>
              <li><strong>Display Size:</strong> ${
                data.data.mainFeatures.displaySize
              }.</li>
              <li><strong>Chip Set:</strong> ${
                data.data.mainFeatures.chipSet
              }.</li>
              <li><strong>Memory:</strong> ${
                data.data.mainFeatures.memory
              }.</li>
              <li><strong>sensors:</strong> ${sensors}.</li>
            </ul>
          </div>
  ${others(data.data.others)}
          `;

  detailsDiv.appendChild(div);
};

// load others data if that exist
let others = (data) => {
  if (data) {
    return `<div><strong>Others : </strong></div>
        <div>
          <ul>
            <li>
              <strong>WLAN:</strong> ${data.WLAN}
            </li>
            <li><strong>Bluetooth:</strong> ${data.Bluetooth}</li>
            <li><strong>GPS:</strong> ${data.GPS}</li>
            <li><strong>NFC:</strong> ${data.NFC}</li>
            <li><strong>Radio:</strong> ${data.Radio}</li>
            <li><strong>USB:</strong> ${data.USB}</li>
          </ul>
        </div>`;
  } else {
    return "";
  }
};
