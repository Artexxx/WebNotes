// dropdown event
function optionChanged(id) {
    d3.json('./djiStocks.json').then(function(data) {
        const filteredArr = data.samples.filter(sample => sample.id === id);
    })
    plotData(id)
}
function initializeData() {
    d3.json("./djiStocks.json").then(data => {
        // populate dropdown
        data.names.forEach(function(name) {
            d3.select("#selDataset")
                .append("option")
                .text(name)
                .property("value");
        });
    });
}
function plotData(id) {
    // read json
    d3.json('./djiStocks.json')
        .then(function(data) {
            // get data from OTU's
            var top10Data = data.samples.filter(sample => sample.id);
            var top10Ids = top10Data[0].otu_ids.slice(0,10).reverse();
            var top10Values = top10Data[0].sample_values.slice(0,10).reverse();
            var top10labels = top10Data[0].otu_labels.slice(0,10).reverse();
            var barIds = []
            // append OTU and whitespace to ids
            top10Ids.forEach(function(data, index) {
                this[index] = "OTU" + "\xa0" + data
            }, barIds);
            var BarTrace = {
                x: top10Values,
                y: barIds,
                text: top10labels,
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var barData = [BarTrace];
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                width: 500,
                height: 700,
            };
            Plotly.newPlot("bar", barData, layout)
            // plot bubble chart
            var bubbleTrace = {
                x: top10Ids,
                y: top10Values,
                mode: 'markers',
                marker: {
                  color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                  opacity: [1, 0.8, 0.6, 0.4, 1, 0.8, 0.6, 0.4, 0.6, 0.4],
                  size: top10Values
                }
              };
            var bubbleData = [bubbleTrace];
            var layout = {
                showlegend: false,
                height: 600,
                width: 1170,
                xaxis: {
                  title: {
                      text: 'OTU ID'
                    }
                  }
                };
            Plotly.newPlot('bubble', bubbleData, layout);
            // display metadata
            var meta = data.metadata
            //get metadata for specified id
            var metaInfo = meta.filter(data => data.id == id)[0]
            var demographicInfo = d3.select("#sample-metadata");
            demographicInfo.html("");
            for (let [key, value] of Object.entries(metaInfo)) {
                demographicInfo.append("p")
                .style("font-weight", "bold")
                .style("font-size", "13px")
                .text(`${key}: ${value}`)
              }           
    // catch any errors and log to console
    }).catch(function(err) {
        console.error(err);
        });
}
initializeData()