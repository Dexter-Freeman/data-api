document.addEventListener('DOMContentLoaded', () => {
    async function getData() {
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
            const temp = columns[1];
            console.log(year, temp);
        })

    }
    
    getData();
});