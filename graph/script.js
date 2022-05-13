let url = 'https://api.opencovid.ca/timeseries?stat=cases&geo=can';

fetch(url)
    .then(res => res.json())
    .then((out) => {
        let charts = [];
        const time = [];
        covid = out.data.cases;
        for (let i = 0; i < covid.length; i++) {
            charts.push(covid[i].value_daily);
            time.push(covid[i].date);
        }

        let ctx = document.getElementById('covidChart').getContext('2d');

        let covidChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Cases',
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "darkblue",
                    data: charts,
                    borderWidth: 2,
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: false,
                onClick: graphClickEvent,

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

        function graphClickEvent(event, array) {
            if (array[0]) {
                let date_arr = time[array[0].index].split('-');
                let bDate = new Date(date_arr[2], date_arr[1] - 1, date_arr[0])
                bDate.setDate(bDate.getDate() + 1);
                let bDateyr = '' + bDate.getFullYear()
                let bDatem = ('0' + (bDate.getMonth() + 1)).slice(-2)
                let bDated = ('0' + bDate.getDate()).slice(-2)
                let before_date = [bDateyr, bDatem, bDated].join('-')
                let aDateyr = '' + date_arr[2]
                let aDatem = '' + date_arr[1]
                let aDated = '' + date_arr[0]
                let after_date = [aDateyr, aDatem, aDated].join("-")
                fetch(`https://google-news1.p.rapidapi.com/search?q=Covid&country=CA&lang=en&before=${before_date}&after=${after_date}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "2785361517msh607261acaae6342p17b5f5jsn44d1b054d305",
                        "x-rapidapi-host": "google-news1.p.rapidapi.com"
                    }
                })
                    .then(res => res.json())
                    .then(response => {
                        let newsitem1 = response.articles[0].title;
                        let newsitem1link = response.articles[0].link;
                        let newsitem2 = response.articles[1].title;
                        let newsitem2link = response.articles[1].link;
                        let newsitem3 = response.articles[2].title;
                        let newsitem3link = response.articles[2].link;
                        document.getElementById("news-date").innerHTML = time[array[0].index];
                        document.getElementById("news-item-1").innerHTML = newsitem1;
                        document.getElementById("news-item-1-link").setAttribute("href", newsitem1link);
                        document.getElementById("news-item-2").innerHTML = newsitem2;
                        document.getElementById("news-item-2-link").setAttribute("href", newsitem2link);
                        document.getElementById("news-item-3").innerHTML = newsitem3;
                        document.getElementById("news-item-3-link").setAttribute("href", newsitem3link);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }

        }
    })
    .catch(err => { throw err });

