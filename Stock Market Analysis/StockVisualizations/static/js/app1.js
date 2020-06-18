d3.json("../../Create APIs for Data/data.json")
  .then(function(data) {
    for (var i=0; i < data.length; i++) {
      console.log(data[i].Close);
    }
  });

    var name = data.Stock;
    var stock = data.Stock;
    var startDate = data.Open;
    var endDate = data.Close;
    // Print the names of the columns
    console.log(data.dataset.column_names);
    // Print the data for each day
    console.log(data.dataset.data);
    var dates = data.dataset.data.map(row => row[0]);
    // console.log(dates);
    var closingPrices = data.dataset.data.map(row => row[4]);
    // console.log(closingPrices);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

  