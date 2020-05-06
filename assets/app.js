document.addEventListener('DOMContentLoaded', () => {
    const iss_api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

    // mapping the iss

    const tileUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=cc98edbdc8344e279b4f9b46d800efb1';

    const issMap = L.map('issMap');

    // add map images from thunderforest.com
    L.tileLayer(tileUrl, { maxZoom: 18 }).addTo(issMap);

    // set marker icon
    const issIcon = L.icon({
        iconUrl: '/assets/img/iss200.png',
        iconSize: [50, 36],
        iconAnchor: [25, 16]
    });

    // add marker
    const marker = L.marker([0, 0], { icon: issIcon } ).addTo(issMap);
    
    // 
    let isFirstTime = true;

    async function getISS() {
        // getting info about iss position
        const result = await fetch(iss_api_url);
        const data = await result.json();

        const { longitude, latitude } = data;
        // console.

        // change position of the iss on the map

        if ( isFirstTime ) {
            // if function run first time, set
            issMap.setView([ latitude, longitude ], 1);
            isFirstTime = false;
        }
        
        marker.setLatLng([ latitude, longitude ]);

        // push longitude and latitude of the iss into page
        document.getElementById('lat').textContent = latitude.toFixed(2);
        document.getElementById('lon').textContent = longitude.toFixed(2);
    }

    // getISS();

    setInterval(getISS, 1000);


    // Chart

    async function getData() {
        // create veraibles for data
        const years = [];
        const temps = [];
        // get data from local file
        const response = await fetch('ZonAnn.Ts+dSST.csv');
        // grab text from the response
        const data = await response.text();

        // split data into rows
        // and grab data except first row (headers)
        const table = data.split('\n').slice(1);
        table.forEach(row => {
            // grab only year and Glob temp
            const columns = row.split(',');
            const year = columns[0];
            years.push(year);
            const temp = columns[1];
            temps.push(parseFloat(temp) + 14);
        })
        // return object with years and temps
        return { years, temps };
    }



    async function chartIt() {
        // get data
        const data = await getData();

        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.years,
                datasets: [{
                    label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                    data: data.temps,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a ° sign in the ticks
                            callback: function (value, index, values) {
                                return value + '°';
                            }
                        }
                    }]
                }
            }
        });
    }

    chartIt();
});