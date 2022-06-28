
// ##################################
// checkWeather
// Args: Latitude, Longitude
// Returns: temp, condition, icon location, rain
// Using Weather API from: https://www.weatherapi.com/
// JSON response with current weather data
//  data.current.temp_c = dec - temperature in celcius
//  data.current.condition.text = string - current weather condition
//  data.current.is_day = bool - 1=day, 0=night
// TODO:
// Add icons to function - ./assets/weather/64x42/...
//  --conditional checks for day/night and condition...
// Add conditionals for Weather for Umbrella, jacket, etc.
// ##################################

function checkWeather(lat, long) {
    var apiUrl = "https://api.weatherapi.com/v1/current.json?key=6ae7c76b7b7d498db7a75709222206&q=" + lat + ", " + long + "&aqi=no";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {                     
                    var weather = {
                        temp: data.current.temp_c,
                        condition: data.current.condition.text,
                        icon: data.current.condition.icon,
                        rain: data.current.condition.text.includes("rain")
                    };
                    return (weather);
                });
            } else {
                console.log('Error: ' + response.statusText); //Remove alerts before release
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to WeatherAPI'); /// Remove alert before release
        });
};

var state = {
    contacts: []
};

function init () {
    // Load the state object from local storage
    loadState();
    //Show the conctact list
    renderContactList();

    $("#add-button").on("click",newContact);
    $("#save-button").on("click",saveContact);
    $("#delete-button").on("click",deleteContact);
    $("#delete-button").on("click",deleteContact);
}

function renderContactList() {
    // Defines contactList
    var contactList = $("#contact-list ul");
    // loops through all items in local storage
    for (var i= 0; i<state.contacts.length; i++){
        var contact = state.contacts[i];
       
        var listItem = $("<li><button>" + contact.firstName + " " + contact.lastName + "</button></li>");
        listItem.attr('data-address',state.contacts[i].address);
        listItem.attr('data-contact-index',i);
        var deleteButton = $("<button>X</button>");
        deleteButton.attr('id','delete-button');
        listItem.append(deleteButton);
        contactList.append(listItem);
        listItem.on('click',callAllFunctions);

    }
}

function callAllFunctions () {
    var address = $(this).attr('data-address');
    addressToMap(address);
}

function deleteContact(contactIndex) {
    alert();
    state.contacts.splice(contactIndex,1);
}

function newContact() {
    $("#contact-information").modal("show");
}

function saveContact(event) {
    event.preventDefault();
    $("#contact-information").addClass("d-none");

    var firstNameValue = $("#first-name").val();
    var lastNameValue = $("#last-name").val();
    var phoneNumberValue = $("#phone-number").val();
    var emailValue = $("#email").val();
    var addressValue = $("#address").val();

    // If any of the fields are empty, don't save the contact
    if (firstNameValue === "" || lastNameValue === "" || phoneNumberValue === "" || emailValue === "" || addressValue === "") {
        // Show a modal to say "enter all fields"
        $('#validationModal').modal("show");
        return;
    }

    var contact = {
        firstName: firstNameValue,
        lastName : lastNameValue,
        phoneNumber : phoneNumberValue,
        email : emailValue,
        address : addressValue,
    };

    state.contacts.push(contact);
    saveState();

    $("#contact-information").modal("hide");
    renderContactList();
}


function loadState() {
    var json = localStorage.getItem("umbrella-address-book");

    if (json !== null) {
        state = JSON.parse(json);
    }
}

function saveState() {
    var json = JSON.stringify(state);

    localStorage.setItem("umbrella-address-book", json);
}

// function renderContactInformation(contactIndex) {
    
//     var nameHeading = $("<");

// Rendering a map from Google Maps API

// Converts address to Lat and Long values and renders Map
function addressToMap(address){
    // API call to geocode the address. Added my API in the function instead of global variable to reduce merge conflicts
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=' + "AIzaSyDSVjMQM3Hgp3upVIWiHSW1CTTP-VFT85A")
      .then(response => response.json())
      .then(data => {
        // Gets the address longitude and latitude coordinates
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        // Calls the render map function based on the coordinates of the given address
        renderMap(lat,lng);
        // Calls the check weather function based on the coordinates of the given address
        checkWeather(lat, lng);
      })
}

// Initialize and add the map
function renderMap(lat, lng) {
    // The location of user contact in longitude and latitude
    const contactLocation = { lat: lat, lng: lng };
    // Creates a map based on the lng and lat coordinates above
    const map = new google.maps.Map(document.getElementById("location-map"), {
        // zooms into users locatioin
        zoom: 12,
        // centers location on map
        center: contactLocation,
    });
    // Creates a marker and puts it on the user contact's location on the map rendered above
    const marker = new google.maps.Marker({
      position: contactLocation,
      map: map,
    });
}

init();