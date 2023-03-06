const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    //  limit items
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0, 10);
    const showAll = document.getElementById('show-all');
    showAll.classList.remove('d-none')
}
else{
      const showAll = document.getElementById('show-all');
    showAll.classList.add('d-none');
  }
  // nothing found
    const nothing = document.getElementById('nothing-found');
    if(phones.length === 0){
        nothing.classList.remove('d-none');
    }
    else{
        nothing.classList.add('d-none')
    }
    // display phones
    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a>
        </div>
      </div>
        `;
        phonesContainer.appendChild(div);
    })
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value; 
    loadPhones(searchText, dataLimit);
}

// search btn
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
});

// search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }

}

// loadPhones();

// not best way

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate:'no release date found'}</p>
    <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'no feature found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No bluetooth'}</p>
    `;
}

