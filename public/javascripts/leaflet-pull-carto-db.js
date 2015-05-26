function pullCartoDBData(type,url,dataType,target,targetName){
	map.spin(true);
	$.ajax({
		type:type,
		url: url,
		dataType: dataType,
		data: "",
		cache: false,
		success: function(data,textStatus, XMLHttpRequest) {
			console.log("Successfully pulled from CartoDB");
			if (target !=null){target.addData(data)}
			if (targetName ==='buildHydrantTable'){buildHydrantTable(data)}
			if (targetName ==='buildOperatorSelect'){buildOperatorSelect(data)}
			if (targetName ==='buildReport'){buildReport(data)}
			function buildHydrantTable(d){
				var ele = $("#hydrantResults");
          		$.each(d.features,function(index,feat){
              		var tr = ('<tr><td>'+ feat.properties.hyd_no + '</td><td>'+ feat.properties.location + '<a class="btn pull-right" cartodb_id='+feat.properties.cartodb_id+' href="#" id="zoomTo" lat='+feat.properties.lat+' lon='+feat.properties.lon+'><i class="fa fa-arrows-alt pull-right"></a></td><td>'+ feat.properties.make + '</td><td>'+ feat.properties.operatingn + '</td></tr>');
                	ele.append(tr);
          		});
        		var dataTable = $('#hydrantResults').dataTable();
			}
			function buildOperatorSelect(d){
				$.each(d.features,function(key,value){
					$('#wellFilter').append($("<option></option>").attr("value",value.properties.operator).text(value.properties.operator)); 
				});
			}
			function buildReport(d){
				var reportStr = "MAINTENANCE REPORT\n";
				reportStr += "HYDRANT NUMBER: " + $('#att_1').val() + "\n";
				reportStr += "HYDRAN TEST DATE,TESTER,ACCEPT,REJECT,FLUSH,AUX VALVE,GPM,FLOW PSI,STATIC PSI,BARREL LEAKAGE,GLAND LEAKAGE,DRAINAGE,VALVE LEAKAGE,STEM LUBRICATION,NOZZLE LUBRICATION,CHAINS,CAP GASKETS,OPERATINGNUT,NOZZLE THREADS,PHYSICAL APPEARANCE,TURBIDITY START,TURBIDITY FINISH,TEMP START,TEMP FINISH,CHLORINE START,CHLORINE FINISH,REMARKS\n";
				var array = $.map(d.features, function(value, index) {
					//value = value.replace(",", "");
					return [value];
				});
				array.sort(function(a,b){
					var dateA=new Date(a.properties.date), dateB=new Date(b.properties.date)
					return dateB-dateA //sort by date ascending
				})
				for (i=0; i < array.length; i++){
					feature = array[i];
					var s = (feature.properties.date + "," + feature.properties.tester + "," + feature.properties.accept + "," + feature.properties.reject + "," + 
					feature.properties.flush + "," + feature.properties.auxvalve + "," + feature.properties.gpm + "," + feature.properties.flowpsi + "," + 
					feature.properties.staticpsi + "," + feature.properties.barrelleak + "," + feature.properties.glandleaka + "," + feature.properties.drainage + "," +
					feature.properties.valveleaka + "," + feature.properties.stemlub + "," + feature.properties.nozzlelub + "," + feature.properties.chains + "," +
					feature.properties.capgaskets + "," + feature.properties.operatingn + "," + feature.properties.nozzlethre + "," + feature.properties.physicalap + "," +
					feature.properties.turbidityf + "," + feature.properties.tempstart + "," + feature.properties.tempfinish + "," + feature.properties.chlorinest + "," +
					feature.properties.chlorinefi + "," + feature.properties.remarks + ",");
					reportStr = reportStr + s + "\r\n";
				}

				 window.location.href = '/download?data=' + encodeURIComponent(reportStr);
					
			}
			map.spin(false);

		},
		error: function (responseData, textStatus, errorThrown) {
			console.log("Error Pulling Carto DB");
			map.spin(false);
		}
	});
}
function pullCartoDBSpatialQuery(type,url,dataType,target){
	map.spin(true);
	$.ajax({
		type:type,
		url: url,
		dataType: dataType,
		data: "",
		success: function(data,textStatus, XMLHttpRequest) {
			console.log("Successfully pulled from CartoDB Spatial Query");
			if (target !=null){target.addData(data)}
			map.spin(false);

		},
		error: function (responseData, textStatus, errorThrown) {
			console.log("Error Pulling CartoDB Spatial Query");
			map.spin(false);
		}
	});
}
function pullCartoDBChart (type,url,dataType,data,target,targetName){
	map.spin(true);
			$.ajax({
				type:type,
				url: url,
				dataType: dataType,
				data: data,
				success: function(data,textStatus, XMLHttpRequest) {
				console.log("Successfully pulled from CartoDB");
				buildPrdChart(data);
				map.spin(false);
			},
			error: function (responseData, textStatus, errorThrown) {
				console.log("Bad");
				map.spin(false);
			}
		});
	}
function pullHeatMapData(type,url,dataType,data,target,field){
		map.spin(true);
		$.ajax({
			type:type,
			url: url,
			dataType: dataType,
			data: data,
			success: function(data,textStatus, XMLHttpRequest) {
				console.log("Successfully pulled from CartoDB");
				buildHeatMapData(data,target,field);
				function buildHeatMapData(data,heatmapLayer,df){
						var array = [];
						if (df == "permits"){ 
							$.each(data.features,function(i,f){
								var obj = {lat:f.properties.lat, lng:f.properties.long, count:1}
								array.push(obj);
							});
						}
						function heatFunction(arg1, arg2) {
							this.max = arg1;
							this.data  = arg2;
						}
						//heatmapLayer_water = new HeatmapOverlay(cfg_water);
						
						var heatData = new heatFunction(1000000,array);
						
						heatmapLayer.setData(heatData);
						map.spin(false);
						
			}	
			},
			error: function (responseData, textStatus, errorThrown) {
				console.log("Bad");
				map.spin(false);
			}
		});
	}

function pullcartoDBWellsTable(){
		$.ajax({
			type:"POST",
			url: "http://admin2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM master WHERE status IN ('Prodcuing','Spudded','Intent','Permit')&api_key=f5019774d855a7103161059c8f1a73972442dd70",
			dataType: "json",
			data: "",
			success: function(d,textStatus, XMLHttpRequest) {
				console.log("Successfully pulled from CartoDB");
				//if (targetName ==='jonahWellsLayer'){buildWellsTable(data)}
				var ele = $("#definedResults");
            		ele.empty();
        		//var geojson = jonahWellsLayer.toGeoJSON();
          		$.each(d.features,function(index,feat){
              		var tr = ('<tr><td>'+ feat.properties.well_name + '<a class="btn pull-right" cartodb_id='+feat.properties.cartodb_id+' href="#" id="zoomToWell" lat='+feat.properties.lat+' long='+feat.properties.long+'><i class="fa fa-arrows-alt pull-right"></a></td><td>'+ feat.properties.api + '</td><td>'+ feat.properties.status+ '</td></tr>');
                	ele.append(tr);
          		});
        		var dataTable = $('#definedResultsTable').dataTable();

			},
			error: function (responseData, textStatus, errorThrown) {
				console.log("Error Pulling Carto DB");
			}
		});
				
	}

function writeCartoDBData(type,url,dataType,data,target,targetName,write){
	console.log(url);
    $.ajax({
          type:type,
          url: url,
          dataType: dataType,
          data: data,
          success: function(data,textStatus, XMLHttpRequest) {
            console.log("Successfully Wrote USer Login Attempt");
            if(write==="writeData"){
            	target.setMap(null);
            	target.setMap(map);
            }
            },
          error: function (responseData, textStatus, errorThrown) {
            console.log("Error Writing User Login Attempt");
          }
        });
  }