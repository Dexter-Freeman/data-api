document.addEventListener('DOMContentLoaded', () => {
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
                            callback: function(value, index, values) {
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