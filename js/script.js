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
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  if (data.length >= 20) {
    displayCardsMin(data);
  }
};
// display cards only 20
let displayCardsMin = (data) => {
  console.log(data);
  let data2 = data.slice(0, 20);
  let displayDiv = document.getElementById("results");
  displayDiv.innerHTML = "";
  data2.forEach((data) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
    <img src="${data.image}" alt="" />
            <div><strong>Phone name : </strong><span>${data.phone_name}</span></div>
            <div><strong>Brand name : </strong><span>${data.brand}</span></div>
            <div><button id="explore" onclick="showDetails('${data.slug}')">Explore</button></div>
    `;
    displayDiv.appendChild(card);
  });
  let loadMore = document.createElement("button");
  loadMore.innerText = "Load More";
  loadMore.setAttribute("onclick", "displayCardsAll()");
  console.log(loadMore);
  displayDiv.appendChild(loadMore);
};

// search not found
let searchNotFound = () => {
  let displayDiv = document.getElementById("results");
  displayDiv.innerHTML = "";
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
  div.innerHTML = `
          <img src="${data.data.image}" alt="" />
          <div><strong>Phone name : </strong><span>${
            data.data.name
          }</span></div>
          <div><strong>Release date : </strong><span>${
            data.data.releaseDate
          }</span></div>
          <div><strong>Main Features : </strong></div>
          <div>
            <ul>
              <li>
                <strong>Storage:</strong> ${data.data.mainFeatures.storage}.
              </li>
              <li><strong>Display Size:</strong> ${
                data.data.mainFeatures.displaySize
              }.</li>
              <li><strong>ChipSet:</strong> ${
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
