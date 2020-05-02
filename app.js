document.addEventListener('DOMContentLoaded', () => {
   const iss_api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

   async function getISS() {
       // getting info about iss position
       const result = await fetch(iss_api_url);
       const data = await result.json();

       const { longitude, latitude } = data;

        // push longitude and latitude of the iss into page
        document.getElementById('lat').textContent = latitude;
        document.getElementById('lon').textContent = longitude;
   }

   getISS();
});