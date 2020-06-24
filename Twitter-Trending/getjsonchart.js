fetch('twitter.json')
    .then((data) => data.json())
    .then(function (json) {
        //json = json.sort((a, b) => a.tweet - b.tweet);
        let dataList = [];

        let i = 0;

        while (i < 10) {
            var data = json[i];

            dataList[data.name] = data.tweet;
            ++i;

            if (i >= 10) return dataList;
        }
    })
    .then(renderChart)

function renderChart(dataList) {
    let chart = new frappe.Chart("#data", { // or DOM element
        data: {
            labels: Object.keys(dataList),

            datasets: [
                {
                    chartType: 'bar',
                    values: Object.values(dataList)
                }
            ]
        },

        title: "Twitter Trending Indonesia",
        type: 'bar', // or 'bar', 'line', 'pie', 'percentage'
        height: 300,
        colors: ['purple', '#ffa3ef', 'light-blue'],

        tooltipOptions: {
            formatTooltipX: d => (d + '').toUpperCase(),
            formatTooltipY: d => d + ' tweets',
        }
    });
}