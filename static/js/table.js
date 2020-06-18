//jQuery

//get html document and create table
$(document).ready(function(){
    $.ajax({
    url:"Resources/Components.csv",
    dataType:"text",
    success:function(data)
    {
        //split each row into elements
        var componentsData = data.split(/\r?\n|\r/);
        //create table
        var tableData = '<table class="table table-bordered table-striped">';
        //loop through elements and append table headers,table rows and table data
        for(var count = 0; count < componentsData.length; count++) {
            var cellData = componentsData[count].split(",");
            if(cellData != '') {
                tableData += '<tr>';
                for(var cellCount=0; cellCount < cellData.length; cellCount++) {
                    if(count === 0) {
                        tableData += '<th><b>'+cellData[cellCount]+'</b></th>';
                        } else {
                            tableData += '<td>'+cellData[cellCount]+'</td>';
                        }
                    }
                tableData += '</tr>';
                }
            }
        tableData += '</table>';
        //append html to dataTable class
        $('#dataTable').html(tableData);
        }
    });
});