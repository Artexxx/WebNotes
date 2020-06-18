function init() {
    var dropdownMenu = d3.select("#selDataset");
    filename = 'djiStocks.json'
   d3.json(filename).then((importedData) => {
  
      var names = importedData.names;
      names.forEach((sample)=> {
        dropdownMenu.append("option").text(sample).property("value", sample)
      })
      drawCharts(names[0])
    });
  
  

  
  
  
  function optionChanged(id) {
  
    
    drawCharts(id)
  };

//import JSON into Javascript
function drawCharts (ID) {
  filename = 'djiStocks.json'
  d3.json(filename).then((importedData) => {
     var data = importedData.samples;
    
     
     console.log(data);
    
     console.log(ID);
     
 var result = data.filter(sample => sample.id == ID)[0]

    console.log(result);
     sampleVal = result.sample_values.slice(0, 10).reverse();
     console.log(sampleVal);
 
     otuIDs = result.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
     
     console.log(otuIDs);
 
 
     otuLabels = result.otu_labels.slice(0, 10).reverse(); 
     console.log(otuLabels);
 
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

  });

  init();
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
//   var mtadata = importedData.metadata;

  
// var mresult = mtadata.filter(sample => sample.id == ID)[0]
// var sample_metadata = d3.select("#sample-metadata");
//    sample_metadata.html("");
  
//        Object.entries(mresult).forEach(function([key, value]) {
//        console.log(key, value);
      
//        var row = sample_metadata.append("p");
     
//        row.text(`${key}: ${value}`);
      
//      });

// //GAUGE PLOT (BELLY BUTTON WASHING FREQUENCY)


// var gaugedata = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     value: mresult.wfreq,
//     title: { text: "Belly Button Washing Frequency - Scrubs per Week" },
//     type: "indicator",
//     mode: "gauge+number",
    
//     gauge: {
//       axis: { range: [null, 9] },
//       steps: [
//         { range: [0, 1], color: "cyan" },
//         { range: [1, 2], color: "royalblue" },
//         { range: [2, 3], color: "cyan" },
//         { range: [3, 4], color: "royalblue" },
//         { range: [4, 5], color: "cyan" },
//         { range: [5, 6], color: "royalblue" },
//         { range: [6, 7], color: "cyan" },
//         { range: [7, 8], color: "royalblue" },
//         { range: [8, 9], color: "cyan" }

//       ],

//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
      
//       }
//     }
//   }
// ];

// var gaugelayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
// Plotly.newPlot('gauge', gaugedata, gaugelayout);
    
//  });
 
// }
 








  