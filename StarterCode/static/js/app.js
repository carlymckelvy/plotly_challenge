// Use D3 fetch to read the JSON file
d3.json("../../data/samples.json").then((importedData) => {
// console.log(importedData);

//Assign variables to data components to be used
var data = importedData;
var names = data.names;
var samples = data.samples;
var metadata = data.metadata;
var otuIDs = samples[0].otu_ids;
var topOtuIDs = otuIDs.slice(0, 10);
var otuLabels = data.samples[0].otu_labels;
var topOTUlabels = otuLabels.slice(0, 10);
var sampleValues = data.samples[0].sample_values;
var topSampleValues = sampleValues.slice(0, 10);
// console.log(topOtuIDs);

// Use D3 to select the dropdown menus
var dropdownMenu = d3.select("#selDataset");

names.forEach((nameID) => {
  dropdownMenu
    .append('option')
    .text(nameID)
    .property('value', nameID)
});
// Assign the value of the dropdown menu option to a variable
// var dataset = dropdownMenu.node().value;

//////Bar chart//////

var otuIDtext = topOtuIDs.map(otuid => "OTU" + " " + otuid);

// Trace1 for the default bar graph
// Reverse the array to accommodate Plotly's defaults
var trace1 = {
  type: "bar",
  x: topSampleValues.reverse(),
  y: otuIDtext.reverse(),
  text: topOTUlabels.reverse(),
  orientation: "h"
};

// data
var data1 = [trace1];

//Format bar graph layout
var layout1 = {
  title: "Top Ten OTUs Found in Subject Belly Button",
  xaxis: {title: "Sample Values"},
  }

// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", data1, layout1);

//////Metadata Chart//////

// console.log(metadata[0]);

d3.select("#sample-metadata").append("h5").text("ID: "+ metadata[0].id);
d3.select("#sample-metadata").append("h5").text("Ethnicity: " + metadata[0].ethnicity);
d3.select("#sample-metadata").append("h5").text("Gender: " + metadata[0].gender);
d3.select("#sample-metadata").append("h5").text("Age: " + metadata[0].age);
d3.select("#sample-metadata").append("h5").text("Location: " + metadata[0].location);
d3.select("#sample-metadata").append("h5").text("Belly Button Type: " + metadata[0].bbtype);
d3.select("#sample-metadata").append("h5").text("Washing Frequency: " + metadata[0].wfreq);

//////Bubble Chart//////

//Trace 2 for default bubble plot
var trace2 = {
  x: topOtuIDs,
  y: topSampleValues,
  mode: "markers",
  text: topOTUlabels,
  marker: {
    size: topSampleValues,
    color: topOtuIDs,
    }};

//data
    var data2 = [trace2];
  
//Format bubble plot layout
    var layout2 = {
     showlegend: false,
}

// Render the plot to the div tag with id "bubble"
Plotly.newPlot("bubble", data2, layout2);

//////Update page on dropdown menu change//////

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", optionChanged);

  // This function is called when a dropdown menu item is selected
  function optionChanged() {
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    //Get index of selected id
    var chooseNameID = names.indexOf(dataset);

    //Adding variables for indexed data
    var selectOtuIDs = samples[chooseNameID].otu_ids;
    var selectOtuLabels = data.samples[chooseNameID].otu_labels;
    var selectSampleValues = data.samples[chooseNameID].sample_values;

    var topSelectOtuIDs = selectOtuIDs.slice(0,10);
    var topSelectOtuLabels = selectOtuLabels.slice(0,10);;
    var topSelectSampleValues = selectSampleValues.slice(0,10);

    // console.log(topSelectOtuIDs);

    var topSelectIDtext = topSelectOtuIDs.map(otuid => "OTU" + " " + otuid);

    //Variables for bar chart
    x = topSelectSampleValues.reverse();
    y = topSelectIDtext.reverse();
    text = topSelectOtuLabels.reverse();

    //Restyle bar chart
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);  
    Plotly.restyle("bar", "text", [text]);
    
  //////Restyle Metadata Chart//////

    //Clear metadata first
    d3.select("#sample-metadata").html("");

    d3.select("#sample-metadata").append("h5").text("ID: "+ metadata[chooseNameID].id);
    d3.select("#sample-metadata").append("h5").text("Ethnicity: " + metadata[chooseNameID].ethnicity);
    d3.select("#sample-metadata").append("h5").text("Gender: " + metadata[chooseNameID].gender);
    d3.select("#sample-metadata").append("h5").text("Age: " + metadata[chooseNameID].age);
    d3.select("#sample-metadata").append("h5").text("Location: " + metadata[chooseNameID].location);
    d3.select("#sample-metadata").append("h5").text("Belly Button Type: " + metadata[chooseNameID].bbtype);
    d3.select("#sample-metadata").append("h5").text("Washing Frequency: " + metadata[chooseNameID].wfreq);


    //////Re-Plot Bubble Chart//////

    //Trace 2 for default bubble plot
    var trace2 = {
      x: selectOtuIDs,
      y: selectSampleValues,
      mode: "markers",
      text: selectOtuLabels,
      marker: {
        size: topSampleValues,
        color: selectOtuIDs,
        }};

    //data
      var data2 = [trace2];
      
    //Format bubble plot layout
      var layout2 = {
        showlegend: false,
      }

      // Render the plot to the div tag with id "bubble"
      Plotly.newPlot("bubble", data2, layout2);

  }});




