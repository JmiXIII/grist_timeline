var grist = window.parent.grist;
var $ = window.parent.jQuery;

grist.ready().then(function() {
  var widget = grist.createWidget({

    // Define the properties of your widget
    makeProperties: function() {
      return [
        grist.createStringProp({
          label: "X axis column",
          widgetId: "xAxisColumn"
        }),
        grist.createStringProp({
          label: "Y axis column",
          widgetId: "yAxisColumn"
        }),
        grist.createStringProp({
          label: "Chart type",
          widgetId: "chartType",
          choices: ["scatter", "line", "bar"]
        })
      ];
    },

    // Define the UI of your widget
    makeUi: function(gristUi, widget, state) {
      var $chart = $('<div>').appendTo(widget.$el.find('#chart'));
      var data = [];
      var layout = {
        title: 'Chart',
        xaxis: { title: state.xAxisColumn },
        yaxis: { title: state.yAxisColumn }
      };

      // Define the data to be used in the chart
      gristUi.getTable().data().then(function(dataTable) {
        var xAxis = dataTable[state.xAxisColumn];
        var yAxis = dataTable[state.yAxisColumn];
        var chartType = state.chartType;

        data.push({
          x: xAxis,
          y: yAxis,
          type: chartType
        });

        // Render the chart using plotly.js
        Plotly.newPlot($chart[0], data, layout);
      });
    }
  });
});
