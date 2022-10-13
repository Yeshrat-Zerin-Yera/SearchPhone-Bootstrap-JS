// Load Phone Function
const loadPhones = async (searchText, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();

    // Show Phone Function Call
    showPhones(data.data, dataLimit);
};

// Show Phone Function
const showPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones');
    phonesContainer.textContent = '';

    // Show Limited Phones
    const showAllBtn = document.getElementById('show-all-btn');
    if (dataLimit && phones.length > 15) {
        phones = phones.slice(0, 15);
        showAllBtn.classList.remove('d-none');
    }
    else {
        showAllBtn.classList.add('d-none');
    }

    //Show Not Found Message
    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none');
    }
    else {
        notFound.classList.add('d-none');
    }

    //Show Searched Phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
          <img src="${phone.image}" class="card-img-top w-50 m-auto pt-4" alt="Image of phone">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button class="btn btn-info text-white" onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
          </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // Stop Spinner
    toogleSpinner(false);
};

// Process Search Function
const processSearch = dataLimit => {
    // Start Spinner
    toogleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Load Phone Function Call
    loadPhones(searchText, dataLimit);
};

// Click Search Phone Event
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(15);
});

// Enter Search Phone Event
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(15);
    }
});

// Toogle Spinner Function
const toogleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
};

// Click Show All Button Event
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
});

//Load Phone Details
const loadPhoneDetails = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    showPhoneDetails(data.data);
};

// Show Phone Details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    phoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phoneDetailsModalBody');
    phoneDetails.innerHTML = `
    <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display Size Found'}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory Information'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</p>
    `
};

// Load Phone Function Call
loadPhones('phone');