function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var stock = d3.select("#selDataset").node().value;
    console.log(stock);
  
    // clear the input value
    d3.select("#selDataset").node().value = "";
  
    // Build the plot with the new stock
    buildPlot(otu);
  }
  
  function buildPlot(otu) {
  
    d3.json("StarterCode/samples.json").then(function(data) {
      // Grab values from the response json object to build the plots
        console.log(data)
  
      var name = StarterCode.samples.names;
      var sample_values = StarterCode.samples.samples;
      var otu_ids = max(StarterCode.samples.otu_ids, 10);
      var otu_labels = StarterCode.samples.otu_labels;

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
  
  // Add event listener for submit button
  d3.select("#submit").on("click", handleSubmit);