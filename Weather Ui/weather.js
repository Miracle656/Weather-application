console.log("hello")

//Weather icons
let weatherIcon = {
    Thunderstorm: "mdi:weather-storm",
    Drizzle: "bi:cloud-drizzle",
    Rain: "bi:cloud-rain",
    Snow: "ion:snow",
    Clear: "ic:outline-cloud",
    Clouds: "bi:clouds"
}

//get weather icon function 
let get_weatherIcon = (icons, rangeid) => {
    switch (true) {
        case rangeid >= 200 && rangeid <= 222:
            image.setAttribute('icon', weatherIcon.Thunderstorm);
            small_image.setAttribute('icon', weatherIcon.Thunderstorm);
            break;
        case rangeid >= 300 && rangeid <= 321:
            image.setAttribute('icon', weatherIcon.Drizzle);
            small_image.setAttribute('icon', weatherIcon.Drizzle);
            break;
        case rangeid >= 500 && rangeid <= 531:
            image.setAttribute('icon', weatherIcon.Rain);
            small_image.setAttribute('icon', weatherIcon.Rain);
            break;
        case rangeid >= 600 && rangeid <= 622:
            image.setAttribute('icon', weatherIcon.Snow);
            small_image.setAttribute('icon', weatherIcon.Snow);
            break;
        case rangeid === 800:
            image.setAttribute('icon', weatherIcon.Clear);
            small_image.setAttribute('icon', weatherIcon.Clear);
            break;
        case rangeid >= 801 && rangeid <= 804:
            image.setAttribute('icon', weatherIcon.Clouds);
            small_image.setAttribute('icon', weatherIcon.Clouds);
            break;
        default:
            image.setAttribute('icon', weatherIcon.Clouds);
            small_image.setAttribute('icon', weatherIcon.Clouds);
    }
}

function calCelcius(temp) {
    let cel = Math.floor(temp - 273.15)
    return cel;
}





const API_key = "6ad1331eb5ebfae2daba6a8cd590334c";
let country = document.getElementById('country');
let date = document.getElementById('date');
let temp = document.getElementById('temp')
let small_image = document.getElementById('small_image');
let min_max = document.getElementById('min_max');
let description = document.getElementById('description');
let wind = document.getElementById('wind')
let humidity = document.getElementById('humidity');
let image = document.getElementById('image');

//form
let area = document.getElementById('area');
let res = document.getElementById('res')
let source = document.getElementById('source')

source.addEventListener('submit', async (e) => {
    e.preventDefault();

    if ((area.value && res.value) != '') {
        const api_call_2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area.value},${res.value}&appid=${API_key}`)

        const response_2 = await api_call_2.json();
        console.log(response_2)

        country.innerText = `${response_2.name}, ${response_2.sys.country}`;
        temp.innerText = `${calCelcius(response_2.main.temp)}°C`;
        description.innerText = response_2.weather[0].description;
        get_weatherIcon(weatherIcon, response_2.weather[0].id)

        area.value = ''
        res.value = ''
    }
})

let lat = 0;
let long = 0


window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geoloaction is not supported by this browser.")
    }

    async function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        alert(`${lat}, ${long}`)

        if (lat && long) {
            const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`);

            const response = await api_call.json();
            console.log(response);

            country.innerText = `${response.name}, ${response.sys.country}`;
            temp.innerText = `${calCelcius(response.main.temp)}°C`;
            description.innerText = response.weather[0].description;
            get_weatherIcon(weatherIcon, response.weather[0].id)


        }

    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('User denied request')
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable')
                break;
            case error.TIMEOUT:
                alert('The request tp get user location is timed out.')
                break;
            default:
                alert('An unknown error occured')
        }
    }
})

