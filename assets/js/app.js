
    function BuildGraphs(n) {

        d3.json("samples.json").then (sampledata => {
            var resultArray = sampledata.samples.filter(sampleObj => sampleObj.id == n);
            var result = resultArray[0];
            console.log(result);
            var samplevalues = result.sample_values
            var otu_ids = result.otu_ids
            var otu_labels = result.otu_labels
            console.log(`${samplevalues} ${otu_ids} ${otu_labels}`)
           
            var yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
            var barData = [
                {
                    y: yticks,
                    x: samplevalues.slice(0,10).reverse(),
                    text: otu_labels.slice(0,10).reverse(),
                    type: "bar",
                    orientation: "h"
                }
            ];
            var barLayout = {
                title: "Top 10 OTU",
                margin: {t:30, l:150}
            }
            Plotly.newPlot("bar", barData, barLayout);
    
    // Bubble chart
    
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
    // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 400,
                width: 1100
            };
    
    // creating data variable 
            var data1 = [trace1];
    
    // create the bubble plot
            Plotly.newPlot("bubble", data1, layout_2);    
        
        });
    }  
        
    
    function buildMetaData(n) {
        d3.json("samples.json").then (sampledata => {
            var MetaData = sampledata.metadata;
            var resultArray = sampledata.metadata.filter(sampleObj => sampleObj.id == n);
            var panel = d3.select("#sample-metadata");
            panel.html("");
            Object.entries(resultArray[0]).forEach(([key, value]) => {
                panel.append("h5").text(`${key} : ${value}`);
            });
        }); 
    }
    function optionChanged(n){
        buildMetaData(n);
        BuildGraphs(n);
    
    }
    
    
    // we want to make a function, where we give an id, and then it gets out all the information for us
    var dropdown = function(){
        d3.json("samples.json").then (sampledata => {
            var selector = d3.select("#selDataset");
            var dataLabels = sampledata.names.forEach(sample => {
                selector.append("option").text(sample).property("value", sample)
            })
        });
    BuildGraphs(940) 
    buildMetaData(940)  
    }
    dropdown()
    