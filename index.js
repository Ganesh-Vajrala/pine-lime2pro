const myForm = document.getElementById("myForm");
const location = document.getElementById("location");
const caption = document.getElementById("caption");
const title = document.getElementById("title");
const countryName = document.getElementById("countryName");           //geting the elements by unique ID
const altitude = document.getElementById("altitude");
const date = document.getElementById("date");
const description = document.getElementById("description")
let map;

async function initMap(lat,lng) {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat, lng},
    zoom: 8,                                                   // Api using and styling marker
  });
  new google.maps.Marker({
    position: { lat,lng},                      
    map:map,
    draggable:true,
    animation:google.maps.Animation.DROP,
  })
}

initMap(17.360589,78.4740613);               //initial lat,lng calling

function getGeolocation(apiKey, placeName) {
    const baseUrl = "https://api.opencagedata.com/geocode/v1/json";
    const params = new URLSearchParams({
        q: placeName,
        key: apiKey,
    });
                                                              //API calling to get go location of place
    const url = `${baseUrl}?${params}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const location = data.results[0].geometry;
                const latitude = location.lat;
                const longitude = location.lng;
                return { latitude, longitude };
            } else {
                console.error("Geocoding failed. No results found.");
                return null;
            }
        })
        .catch(error => {
            console.error("Error during geocoding:", error);
            return null;
        });
}


function getLatitude(location){
const apiKey = '3c7d1c66bdf341c7935a0cc6b5179fc0';
const placeName = location;

getGeolocation(apiKey, placeName)
    .then(result => {
        if (result) {
            initMap(result.latitude,result.longitude)                        //calling  API
            
            altitude.textContent = `${result.latitude}/${result.longitude}`;
        }
    });
}
 myForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        getLatitude(location.value);
        countryName.textContent = title.value;
        let x = caption.value
        console.log(description.textContent)
            description.textContent = x;                                //updating the context of the map
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const year = today.getFullYear();
            date.textContent = `${day}/${month}/${year}`;  
})
