// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
// function init() {

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
    // console.log(samples);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    names.forEach((nameID) => {
      dropdownMenu
        .append('option')
        .text(nameID)
        .property('value', nameID)
    });
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.node().value;

    //Bar chart

    var otuIDtext = topOtuIDs.map(otuid => "OTU" + " " + otuid)

    var trace1 = {
      type: "bar",
      x: topSampleValues.reverse(),
      y: otuIDtext.reverse(),
      text: topOTUlabels.reverse(),
      orientation: "h"
    };

    var data1 = [trace1];

    var layout1 = {
      title: "Top Ten OTUs Found in Subject Belly Button",
      xaxis: {title: "Sample Values"},
      }

    Plotly.newPlot("bar", data1, layout1);

    //Metadata Chart

    // console.log(metadata[0]);
  
    d3.select("#sample-metadata").append("h5").text("ID: "+ metadata[0].id);
    d3.select("#sample-metadata").append("h5").text("Ethnicity: " + metadata[0].ethnicity);
    d3.select("#sample-metadata").append("h5").text("Gender: " + metadata[0].gender);
    d3.select("#sample-metadata").append("h5").text("Age: " + metadata[0].age);
    d3.select("#sample-metadata").append("h5").text("Location: " + metadata[0].location);
    d3.select("#sample-metadata").append("h5").text("Belly Button Type: " + metadata[0].bbtype);
    d3.select("#sample-metadata").append("h5").text("Washing Frequency: " + metadata[0].wfreq);

    //Bubble Chart
    
    var trace2 = {
      x: topOtuIDs,
      y: topSampleValues,
      mode: "markers",
      text: topOTUlabels,
      marker: {
        size: topSampleValues,
        color: topOtuIDs,
        }};

    var data2 = [trace2];
      
    var layout2 = {
      showlegend: false,
    }
    
    Plotly.newPlot("bubble", data2, layout2);

});

