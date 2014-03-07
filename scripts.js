/**
 * @author Harry Stevens
 */
$(document).ready(pageLoaded);

function pageLoaded(){
	google.load("visualization", "1", {packages:["corechart"],callback:googleLoaded});
}

function googleLoaded(){
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+15hrQDQd0kYabKRAm59Tl9_1nv8mWDE1tMOU4kj__&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8",dataLoaded,"json");
}

function dataLoaded(pop){
	var rows = pop.rows;
	var dataArray = [];
	for(var i=0;i<rows.length;i++){
		var currRow = rows[i];
		
		var currDate = currRow[0];
		var momentDate = moment(currDate);
		var finalDate = momentDate._d;
		
		var currVal = currRow[1];
		var finalVal = currVal*1000;
		
		var currArray = [finalDate,finalVal];
		dataArray.push(currArray);
	}
	
	var data = new google.visualization.DataTable();
	data.addColumn('date', 'Date');
	data.addColumn('number', 'Population');
	data.addRows(dataArray);
	
	var formatter = new google.visualization.NumberFormat({pattern:'###,###,###'});
	formatter.format(data, 1);
	
	var options = {
          title: 'Select a date range to zoom in. Right click to zoom out.',
 	      explorer:{axis:'horizontal',actions:['dragToZoom','rightClickToReset'],maxZoomIn:.1},
 	      vAxis:{title:'Population',ticks:[0,50000000,100000000,150000000,200000000,250000000,300000000,350000000]},
 	      hAxis:{title:'Date'},
 	      height:500,
 	      chartArea:{height:380},
        };

	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	
}