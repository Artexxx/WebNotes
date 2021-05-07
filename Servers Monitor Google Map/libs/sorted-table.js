/*
Sort HTML table using stock DOM selectors and methods (jQuery is not used)

Coding steps:  
  -- Run sort function when column header is clicked.

  -- Load column data, including corresponding row numbers, into multi-dimensional array.

  -- Use JS "sort" method to order data: consider strings, dates, and numbers.

  -- The new sorted array has data in asc order, in addition to row # of original table.

  -- Create a new tbody: for each row in the sorted array... 
      ++ use the row number as a key to get all corresponding content from original table. 
      ++ write the content of each row to a new tbody variable

--Replace the original tbody with the new tbody's value.

--Repeated clicks to the same column reverses the sort order.
    ++ i.e. no need to re-sort, just reverse already the sorted table.

--Done.

Goals:
  Toggle sort between ascending and descending order.
  Sort numbers, dates, and strings.
  Reasonable performance on large tables of 500 plus rows.
  Accomplish this using only standard JavaScript selectors and methods.

Notes:
  Performance: [need to test]

*/



function isDate(testDate){
  //function returns true or false
  var myDate = new Date(testDate);
  var blMyResult = myDate instanceof Date && !isNaN(myDate.valueOf());
  //console.log(testDate + " is date: " + blMyResult );
  return blMyResult;
}
//console.log("is date result: "  + isDate("82.22.2018"));


//Dynamically generate event listeners for column headers
var headers = document.querySelectorAll('#tblSortTest_dom thead tr th');
for (var i = 0; i < headers.length; i++) {
  headers[i].addEventListener('click', function() {
    // console.log(this.innerHTML + "; colIndex=" +this.cellIndex );
    sortColumn(this.cellIndex);
  });
}


// get table object using jquery selectors...and pass it to a function
function sortColumn(thIndex){
  //call function from table property: 
  //For example: <th onclick="sortTable(1)">name</th>
  var tblId = "tblSortTest_dom";
  var table = document.getElementById(tblId);
  var sorting = [];
  var rows = table.querySelectorAll('tbody tr'); 
  for (i = 0; i < rows.length; i++){
    //console.log(rows[i].outerHTML); //gets all tag contents
    var colData = rows[i].getElementsByTagName("TD")[thIndex].innerHTML;
    //console.log(colData);
    sorting.push([i, colData])
  }
  //console.log(sorting);  
  sortData(sorting, tblId, thIndex);
}

var curThIndex = null; 
function sortData(sorting, tblId, thIndex){
  //var x = new Date();
  //console.log("start sort: " + x.toTimeString());

  //default to ascending order
  if (thIndex != curThIndex) {
    curThIndex = thIndex;

    //console.log("before...");
    //console.log(sorting); 
    sorting = sorting.sort(
      function (a, b) {
        //test if a number: disregard any commas during the comparison
        if (isNaN(a[1].replace(",", "")) == false && isNaN(b[1].replace(",", "")) == false) {
          return a[1].replace(",", "") - b[1].replace(",", "");
        }

        //test if a date
        else if (isDate(a[1]) && isDate(b[1])) {
          var xDate = new Date(a[1]);
          var yDate = new Date(b[1]);
          if (xDate < yDate) {
            return -1;
          }
          if (xDate > yDate) {
            return 1;
          }
          // dates are equal
          return 0;
        }

        //default to comparing strings
        else {
          if (a[1] < b[1]) {
            return -1;
          }
          if (a[1] > b[1]) {
            return 1;
          }
          // strings are equal
          return 0;
        }
      }
    );
  }
  else {
    //reverse already sorted table: after first click, flip/flop between asc and desc.
    sorting = sorting.reverse();
  }

  //console.log("after..."); 
  //console.log(sorting); 
  sortIt(sorting, tblId);
}

function sortIt(sorting, tblId){
  var tbodyHtml = "";
  var table = document.getElementById(tblId);
  var rows = table.querySelectorAll('tbody tr');
  //this loop consumes most of the processing/wait time
  for(var i = 0; i < sorting.length; i++){ 
    rowId = sorting[i][0]; //get original row number of each record
    tbodyHtml += rows[rowId].outerHTML;
  } 
  //Finally, replace table's tbody with sorted content
  table.getElementsByTagName("tbody")[0].outerHTML= tbodyHtml;

  //var x = new Date();
  //console.log("finish sort: " + x.toTimeString());
} 
