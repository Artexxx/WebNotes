function initializeData() {
    d3.json("https://dataanalyticsproject.github.io/StockMarketAnalysis/Create%20APIs%20for%20Data/data.json").then(data => {
        // populate dropdown

        // create unique set
        var uniqueStocks = new Set();

        // append stock components to array
        for (var i=0; i < data.length; i++) {
            uniqueStocks.add(data[i].Stock)
        }

        // reverse order of array
        var orderedStocks = Array.from(uniqueStocks).reverse();

        // loop through array and append options for dropdown
        orderedStocks.forEach(function(x) {
            d3.select("#selDataset")
            .append("option")
            .text(x)
            .property("value")
        });
    });
}



    //     var stocks = data.map(function(x) {
    //         return x.Stock;
    //     });

    //     stocks.forEach(function(name) {
    //         d3.select("#selDataset")
    //             .append("option")
    //             .text(name)
    //             .property("value");
    //     });
    // });

// function plotData(id) {
//     // read json
//     d3.json("../data.json")
//         .then(function(data) {
//             // get data from OTU's
//             var Data = data.filter(sample => sample.Stock);
//             var StockName = Data[0].Stock;
//             var StockDate = Data[0].Date;
//             var StockClose = Data[0].Name;

//             // append OTU and whitespace to ids

//             var trace1 = {
//                 type: "scatter",
//                 mode: "lines",
//                 name: name,
//                 x: StockClose,
//                 y: StockDate,
//                 line: {
//                   color: "#17BECF"
//                 }
//               };
          
//               var data = [trace1];
          
//               var layout = {
//                 title: `${stock} closing prices`,
//                 xaxis: {
//                   range: [startDate, endDate],
//                   type: "date"
//                 },
//                 yaxis: {
//                   autorange: true,
//                   type: "linear"
//                 }
//               };
          
//               Plotly.newPlot("plot", data, layout);
          
//             });
// }
initializeData()