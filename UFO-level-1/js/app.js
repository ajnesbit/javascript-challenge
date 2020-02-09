// data from data.js
var tableData = data;

// create variable for submit button
var submit = d3.select("#filter-btn");

// create cariable for table body
var tbody = d3.select("tbody");

// console logging the ufo data from data.js
console.log(tableData);
autoPopulate(tableData);

function autoPopulate(tableData) {

    // create initial table 

tableData.forEach((siting) => {
    // creating row for each data object
    var row = tbody.append("tr");
    // adding values from siting to table data values in our table rows
    Object.entries(siting).forEach(([key, value]) => {
        // creating table data elements and adding the value from the key value pair to element
        var cell = row.append("td");
        cell.text(value);
    });
});

}

// function to run after clicking the filter button
submit.on("click", function() {
        
        // preventing refresh
        d3.event.preventDefault();

        // clearing previous data in table
        tbody.html("");

        //get the data entered in text box
        var inputElement = d3.select("#datetime");
        var inputValue = inputElement.property("value");

        // create filter function
        function filterData(ufo) {
            return ufo.datetime == inputValue;
        }
        // create variable to hold filtered data
        var filteredData = tableData.filter(filterData);
        // check filtered dates
        console.log(filteredData); 
        
        // for no entry and button is clicked      
        if (inputValue == '') {
            alert("Please enter a date.");
            autoPopulate(tableData);
        }

        // for an invalid entry with no results
        else if (filteredData.length == 0) {
            alert("No UFO sitings found, let's try a different date.");
            autoPopulate(tableData);
            }
        
        else {
        
        // fill out table with new data
        filteredData.forEach((siting) => {
            // appending a table row for each object
            var row = tbody.append("tr");
            //appending a table data element for each key value pair
            Object.entries(siting).forEach(([key, value]) => {
                var cell = row.append("td");
                // add value to element
                cell.text(value);
            });
        });
        }
});
