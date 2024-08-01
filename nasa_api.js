let url = "https://api.nasa.gov/planetary/apod?api_key=";
let apiKey = "gGCtpSL7TIiTRoTWFPeI0G4Zijfh3U0Ha09m5Sr5";

let dateInput = document.querySelector('#event-date');
let imgDiv = document.querySelector('.nasa-img');


startUp();
dateInput.addEventListener('change', showPicture);


// Functions

function showPicture() {
    let theDate = dateInput.value;
    let combined = `${url}${apiKey}&date=${theDate}`;
    fetch(combined)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function startUp() {
  // Calculate yesterday's date
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format yesterday's date to YYYY-MM-DD
  let year = yesterday.getFullYear();
  let month = String(yesterday.getMonth() + 1).padStart(2, '0');
  let day = String(yesterday.getDate()).padStart(2, '0');
  let formattedYesterday = `${year}-${month}-${day}`;

  // Set the date input value to yesterday
  dateInput.value = formattedYesterday;

  // Trigger the showPicture function for yesterday's date
  showPicture();
}

function displayData(data) {
    document.getElementById('title').textContent = data.title;
    document.getElementById('date').textContent = data.date;
    document.getElementById('image').src = data.hdurl;
    document.getElementById('image').alt = data.title;
    document.getElementById('explanation').textContent = data.explanation;
}
