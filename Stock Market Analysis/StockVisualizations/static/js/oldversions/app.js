var selectTag = d3.select("#selDataset")


// get data then do things with the data
d3.json("djiStocks.json").then(function(data) {
  console.log(data);

  // grab the tickers
  var tickers = data.names
  console.log(tickers);

  
  // fill out the option tags in teh select tag
  makeOptionTags(tickers, selectTag, data);






});



function makeOptionTags(tickerArray, selectTag, data) {

  // take it and append option tags to it
  selectTag.selectAll("option")
    .data(tickerArray)
    .enter()
    .append("option")
    .attr("value", function(x) {
      return x;
    })
    .text(function(x) {
      return `Ticker: ${x}`;
    });


    selectTag.on("change", function() {
      console.log("YOU SELECTED!!!!")
      var value = selectTag.node().value
      console.log(value);
      
      d3.select("#bar").html("")

      // take value and do something with it
      drawStockData(value, data);





    });
}

function drawStockData(value, data) {

  var findIndex = data.names(value)

  var sampleVal = data.samples.otu_ids[findIndex]
  var otuIDs = data.samples.sample_values[findIndex]
  var otuLabels = data.samples.otu_labels[findIndex]

  var trace1 = {
    x: sampleVal,
    y: otuIDs,
    text: otuLabels,

    name: "",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "",

  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);


}





















// //import JSON into Javascript
// function drawCharts (ID) {
//   filename = 'djiStocks.json'
//   d3.json(filename).then((importedData) => {
//      var data = importedData.samples;
    
     
//      console.log(data);
    
//      console.log(ID);
     
//  var result = data.filter(sample => sample.id == ID)[0]

//     console.log(result);
//      sampleVal = result.sample_values.slice(0, 10).reverse();
//      console.log(sampleVal);
 
//      otuIDs = result.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
     
//      console.log(otuIDs);
 
 
//      otuLabels = result.otu_labels.slice(0, 10).reverse(); 
//      console.log(otuLabels);
 
//    var trace1 = {
//      x: sampleVal,
//      y: otuIDs,
//      text: otuLabels,

//      name: "",
//      type: "bar",
//      orientation: "h"
//    };
 
//    // data
//    var chartData = [trace1];
 
//    // Apply the group bar mode to the layout
//    var layout = {
//      title: "",

//    };
 
//    // Render the plot to the div tag with id "plot"
//    Plotly.newPlot("bar", chartData, layout);




// // Create a bubble plot using plotly
//      var trace2 = {
//       x: result.otu_ids,
//       y: result.sample_values,
//       text: result.otu_labels,
//       mode: 'markers',
//       marker: {
//         size: result.sample_values,
//         color: result.otu_ids
        
//       }
//     };
    
//     var chartData2 = [trace2];
    
//     var layout2 = {
//       title: '',
//       xaxis: {
//       title: {
//           text: 'OTU ID'}},
//       showlegend: false,
      
//       // height: 600,
//       // width: 600
//     };
    
//     Plotly.newPlot('bubble', chartData2, layout2);
  
//   // DEMOGRAPHIC INFO TEXT BOX
// //   var mtadata = importedData.metadata;

  
// // var mresult = mtadata.filter(sample => sample.id == ID)[0]
// // var sample_metadata = d3.select("#sample-metadata");
// //    sample_metadata.html("");
  
// //        Object.entries(mresult).forEach(function([key, value]) {
// //        console.log(key, value);
      
// //        var row = sample_metadata.append("p");
     
// //        row.text(`${key}: ${value}`);
      
// //      });

// // //GAUGE PLOT (BELLY BUTTON WASHING FREQUENCY)


// // var gaugedata = [
// //   {
// //     domain: { x: [0, 1], y: [0, 1] },
// //     value: mresult.wfreq,
// //     title: { text: "Belly Button Washing Frequency - Scrubs per Week" },
// //     type: "indicator",
// //     mode: "gauge+number",
    
// //     gauge: {
// //       axis: { range: [null, 9] },
// //       steps: [
// //         { range: [0, 1], color: "cyan" },
// //         { range: [1, 2], color: "royalblue" },
// //         { range: [2, 3], color: "cyan" },
// //         { range: [3, 4], color: "royalblue" },
// //         { range: [4, 5], color: "cyan" },
// //         { range: [5, 6], color: "royalblue" },
// //         { range: [6, 7], color: "cyan" },
// //         { range: [7, 8], color: "royalblue" },
// //         { range: [8, 9], color: "cyan" }

// //       ],

// //       threshold: {
// //         line: { color: "red", width: 4 },
// //         thickness: 0.75,
      
// //       }
// //     }
// //   }
// // ];

// // var gaugelayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
// // Plotly.newPlot('gauge', gaugedata, gaugelayout);
    
// //  });
 
// // }
 






// function init() {
//   var dropdownMenu = d3.select("#selDataset");
//   filename = 'samples.json'
//  d3.json(filename).then((importedData) => {

//     var names = importedData.names;
//     names.forEach((sample)=> {
//       dropdownMenu.append("option").text(sample).property("value", sample)
//     })
//     drawCharts(names[0])
//   });
// }

// //init();



// // function optionChanged(id) {
// //   drawCharts(id);
// //