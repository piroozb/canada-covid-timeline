/*
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.opencovid.ca/timeseries?stat=cases&loc=canada",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "2785361517msh607261acaae6342p17b5f5jsn44d1b054d305",
        "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com"
    }
};


$.ajax(settings).done(function (response) {
    console.log(response.text);
});
*/

// Chart.defaults.global.defaultFontColor = 'red';

let url = 'https://api.opencovid.ca/timeseries?stat=cases&loc=canada';

fetch(url)
    .then(res => res.json())
    .then((out) => {
        let news = ['balls', 'balls']
        let data = [];
        const time = [];
        covid = out.cases;
        for (let i = 0; i < covid.length; i++) {
            data.push(covid[i].cases);
            time.push(covid[i].date_report);
        }

        let ctx = document.getElementById('covidChart').getContext('2d');

        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'New Cases',
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "darkblue",
                    data: data,
                    borderWidth: 2,
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: false,

                plugins: {

                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }

                },

                scales: {
                    y: {
                        //backgroundColor: 'white',
                        ticks: {
                            color: 'white',
                        },
                        grid: {
                            color: 'white',
                        }
                    },
                    x: {
                        //type: 'time',
                        //time: {
                        //unit: 'day',
                        // displayFormats: {
                        //  day: 'DD MMM'
                        //  }
                        // },

                        //backgroundColor: 'gray',
                        ticks: {
                            color: 'white',
                            backdropColor: 'white' //does nothing
                        },
                        grid: {
                            color: 'white'
                        }
                    }
                }

            }
        })
    })
    .catch(err => { throw err });

