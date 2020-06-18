d3.json("https://dataanalyticsproject.github.io/StockMarketAnalysis/Create%20APIs%20for%20Data/data.json").then(data => {
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
        d3.select("#stockSelectorTop")
        .append("option")
        .text(x)
        .property("value")
    });

    stockOptionChange("plotTop", '_DJI');

    // loop through array and append options for dropdown
    orderedStocks.forEach(function(x) {
        d3.select("#stockSelectorBottom")
        .append("option")
        .text(x)
        .property("value")
    });

    stockOptionChange("plotBottom", '_DJI');
});