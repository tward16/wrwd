$( document ).ready(function() {
	//Get User Name from Welcome Module Div and Write to CartoDB
	//TODO - Find Better Way
	var user = $('#userWelcome').text();
	writeCartoDBData("POST","http://admin2.cartodb.com/api/v2/sql?q=INSERT INTO wrwd_logins (name,the_geom) VALUES ('" + user + "',ST_SetSRID(ST_Point(-110, 43),4326))&api_key=f5019774d855a7103161059c8f1a73972442dd70")
	//Show Welcome Modlue
	$("#welcomeModal").modal('show'); 
	//Initialize Leaflet Map
	/* Basemap Layers */

	map = L.map("map", {
	  zoomControl: false,
	  attributionControl: false
	});

	map.setView(new  L.latLng(39.772588, -105.076521),13);
	
	$("[data-widget='zoomExtent']").click(function() {
		var latlng = L.latLng(39.772588, -105.076521);
		map.setView(latlng,13);
	});	
	$("[data-widget='hydrantTable']").click(function() {
		$('#hydrantModal').modal('show'); 
	});	
	$("[data-widget='dimension-lable-btn']").click(function() {
		if(map.hasLayer(dimensionLabelCluster)){
			dimensionLines.setMap(null);
			map.removeLayer(dimensionLabelCluster);
			
		} else {
			dimensionLines.setMap(map);
			map.addLayer(dimensionLabelCluster);
		}
	});
	$("[data-widget='hydrant-lable-btn']").click(function() {
		if(map.hasLayer(hydrantsLabels)){
			map.removeLayer(hydrantsLabels);
		} else {
			map.addLayer(hydrantsLabels);
		}
	});		
	$("[data-widget='download-btn']").click(function() {
		if($('#legend').text() == "HYDRANT"){
			pullCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM wrwd_maintenance WHERE hydrant = '" + $('#att_1').val() + "'&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,'buildReport');
	
		} else {
			console.log('alert');
		}
	});	
	$("[data-widget='save-btn']").click(function(e) {
		e.preventDefault();
		switch($('#legend').text()) {
		case "HYDRANT":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_hydrants SET hyd_no='" + $('#att_1').val() + "',loc_cert='" + $('#att_2').val() + "',notes='" 
					+ $('#att_3').val() + "',location='" + $('#att_4').val().replace('&','and') + "',locationre='" + $('#att_5').val() + "',numberstre='" + $('#att_6').val() + "',namestreet='" 
					+ $('#att_7').val() + "',make='" + $('#att_8').val() + "',model='" + $('#att_9').val() +  "',modelnozzl='" + $('#att_11').val() + "',age='" + $('#att_12').val() + "',open_='" 
					+ $('#att_14').val() + "' WHERE cartodb_id = " + cdb_id + "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,hydrantsLayer,"hydrantsLayer","writeData");			
			break;
		case "HYDRANT (BLOWOFF)":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_hydrants SET hyd_no='" + $('#att_1').val() + "',loc_cert='" + $('#att_2').val() + "',notes='" 
					+ $('#att_3').val() + "',location='" + $('#att_4').val().replace('&','and') + "',locationre='" + $('#att_5').val() + "',numberstre='" + $('#att_6').val() + "',namestreet='" 
					+ $('#att_7').val() + "',make='" + $('#att_8').val() + "',model='" + $('#att_9').val() +  "',modelnozzl='" + $('#att_11').val() + "',age='" + $('#att_12').val() + "',open_='" 
					+ $('#att_14').val() + "' WHERE cartodb_id = " + cdb_id + "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,blowOffLayer,"blowOffLayer","writeData");			
			break;
		case "MAINLINE":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_mainline SET diameter='" + $('#att_1').val() + "',material='" + $('#att_2').val() + "',corr_prot='" 
					+ $('#att_3').val() + "',water_type='" + $('#att_4').val().replace('&','and') + "',customer_c='" + $('#att_5').val() + "',access_per='" + $('#att_6').val() + "',install_ty='" 
					+ $('#att_7').val() + "',joint_type='" + $('#att_8').val() + "',joint_rest='" + $('#att_9').val() +  "',pipe_class='" + $('#att_10').val() + "',install_me='" + $('#att_11').val() + "' WHERE cartodb_id = " + cdb_id 
					+ "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,mainlineLayer,"mainlineLayer","writeData");			
			break;
		case "CONNECTOR VALVE":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_connectorvalves SET install_da='" + $('#att_1').val() + "',diameter='" + $('#att_2').val() 
					+ "',manufactur='" + $('#att_3').val() + "',water_type='" + $('#att_4').val().replace('&','and') + "',customer_c='" + $('#att_5').val() + "',access_per='" 
					+ $('#att_6').val() + "',install_ty='" + $('#att_7').val() + "',col_method='" + $('#att_8').val() + "',normal_ope='" + $('#att_9').val() +  "',closing_di='" 
					+ $('#att_10').val() + "',oper_curr_='" + $('#att_11').val() + "',oper_metho='"  + $('#att_12').val() + "',valve_func='"  + $('#att_13').val() + "' WHERE cartodb_id = " + cdb_id 
					+ "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,connectorValveLayer,"connectorValveLayer","writeData");	
			break;
		case "MAIN VALVE":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_mainvalve SET diameter='" + $('#att_1').val() + "',manufactur='" + $('#att_2').val() 
					+ "',valve_func='" + $('#att_3').val() + "',oper_metho='" + $('#att_4').val().replace('&','and') 
					+ "',flow_direc='" + $('#att_5').val() + "',customer_c='" + $('#att_6').val() + "',install_ty='" + $('#att_7').val() + "',normal_ope='" + $('#att_8').val() 
					+ "',closing_di='" + $('#att_9').val() +  "',inspection='" + $('#att_10').val() + "',oper_curr_='" + $('#att_11').val() + "',operable='"  + $('#att_12').val() 
					+ "' WHERE cartodb_id = " + cdb_id + "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,mainValveLayer,"mainValveLayer","writeData");			
			break;
		case "FIRE VALVE":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_valves SET install_da='" + $('#att_1').val() + "',diameter='" + $('#att_2').val() 
					+ "',manufactur='" + $('#att_3').val() + "',water_type='" + $('#att_4').val().replace('&','and') 
					+ "',customer_c='" + $('#att_5').val() + "',access_per='" + $('#att_6').val() + "',install_ty='" + $('#att_7').val() + "',col_method='" + $('#att_8').val() 
					+ "',normal_ope='" + $('#att_9').val() +  "',closing_di='" + $('#att_10').val() + "',oper_curr_='" + $('#att_11').val() 
					+ "' WHERE cartodb_id = " + cdb_id + "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,fireValveLayer,"fireValveLayer","writeData");	
			break;
		case "HYDRANT VALVE":
			var cdb_id =  $('#ID').html();
				writeCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?&q=UPDATE wrwd_valves SET install_da='" + $('#att_1').val() + "',diameter='" + $('#att_2').val() 
					+ "',manufactur='" + $('#att_3').val() + "',water_type='" + $('#att_4').val().replace('&','and') 
					+ "',customer_c='" + $('#att_5').val() + "',access_per='" + $('#att_6').val() + "',install_ty='" + $('#att_7').val() + "',col_method='" + $('#att_8').val() 
					+ "',normal_ope='" + $('#att_9').val() +  "',closing_di='" + $('#att_10').val() + "',oper_curr_='" + $('#att_11').val() 
					+ "' WHERE cartodb_id = " + cdb_id + "&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,valveLayer,"valveLayer","writeData");	
			break;
	}	

	});	

	$('.leafletMap').on('click', '#panoButton', function(e) {
        e.preventDefault();
        var hyd_no = $(this).attr('hyd_no');
        var latlng = L.latLng($(this).attr('lat'),$(this).attr('lon'));
        sv.getPanoramaByLocation(latlng, 50, processSVData);
 		$('#panoModal').on('shown.bs.modal', function(){
 				$('#panoLabel').html('<div><b>WHEAT RIDGE WATER DISTRICT HYDRANT NUMBER: '+hyd_no+'</b></div>');
 				$( window ).resize();
 				panorama.setVisible(true);
		});
    });
    $('.modal-body').on('click', '#zoomTo', function(e) {
        var cdb_id = $(this).attr('cartodb_id');
        var latlng = L.latLng($(this).attr('lat'), $(this).attr('lon'));
        var api = $(this).attr('api');
        $('#hydrantModal').modal('hide');
              map.setView(latlng,19) 
    })
    $("#sidebar-toggle-btn").click(function() {
	  $("#sidebar").toggle();
	  map.invalidateSize();
	  return false;
	});
	var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if (screenWidth < 700){
		$("#sidebar").hide();
		map.invalidateSize();
	}
	$('.data-item').on('click', function(){
		function getHTML(id) {
			var oldHtml = {
				'hydrants': function () {
				  if (hydrantsLayer.getMap()){
						hydrantsLayer.setMap(null);
						return "<i class='fa fa-map-marker hydrant-color'></i><span class='blue'>&nbsp; Hydrants &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						hydrantsLayer.setMap(map);
						return "<i class='fa fa-map-marker hydrant-color'></i><span class='blue'>&nbsp; Hydrants &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},
				'hydrants-blowoff': function () {
				  if (blowOffLayer.getMap()){
						blowOffLayer.setMap(null);
						return "<i class='fa fa-map-marker blowoff-color'></i><span class='blue'>&nbsp; Hydrants (Blow Off) &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						blowOffLayer.setMap(map);
						return "<i class='fa fa-map-marker blowoff-color'></i><span class='blue'>&nbsp; Hydrants (Blow Off) &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},
				'mainline': function () {
				  if (mainlineLayer.getMap()){
						mainlineLayer.setMap(null);
						return "<i class='fa fa-minus mainline-color'></i><span class='blue'>&nbsp; Main Line &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						mainlineLayer.setMap(map);
						return "<i class='fa fa-minus mainline-color'></i><span class='blue'>&nbsp; Main Line &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},
				'main-valve': function () {
				  if (mainValveLayer.getMap()){
						mainValveLayer.setMap(null);
						return "<i class='fa fa-map-marker main-valve-color'></i><span class='blue'>&nbsp; Main Valve &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						mainValveLayer.setMap(map);
						return "<i class='fa fa-map-marker main-valve-color'></i><span class='blue'>&nbsp; Main Valve &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},			
				'connector-valve': function () {
				  if (connectorValveLayer.getMap()){
						connectorValveLayer.setMap(null);
						return "<i class='fa fa-map-marker connector-valve-color'></i><span class='blue'>&nbsp; Connector Valve &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						connectorValveLayer.setMap(map);
						return "<i class='fa fa-map-marker connector-valve-color'></i><span class='blue'>&nbsp; Connector Valve &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},	
				'fire-valve': function () {
				  if (fireValveLayer.getMap()){
						fireValveLayer.setMap(null);
						return "<i class='fa fa-map-marker fire-valve-color'></i><span class='blue'>&nbsp; Fire Valve &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						fireValveLayer.setMap(map);
						return "<i class='fa fa-map-marker fire-valve-color'></i><span class='blue'>&nbsp; Fire Valve &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},	
				'valve': function () {
				  if (valveLayer.getMap()){
						valveLayer.setMap(null);
						return "<i class='fa fa-map-marker valve-color'></i><span class='blue'>&nbsp; Valve &nbsp;</span><i class='fa fa-plus-square pull-right blue'></i>";
					} else {
						valveLayer.setMap(map);
						return "<i class='fa fa-map-marker valve-color'></i><span class='blue'>&nbsp; Valve &nbsp;</span><i class='fa fa-check pull-right blue'></i>";
					}
				},	
			  };
		 
			if (typeof oldHtml[id] !== 'function') {
			  throw new Error('Invalid action.');
			}
			return oldHtml[id]();
			
		  }
		var newHtml = getHTML(this.id)
		$("#" + this.id).html(newHtml);  
	});
	/* Basemap Layers */
	var topo = L.esri.basemapLayer('Topographic').addTo(map);
	var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
	var imagery = new L.Google('HYBRID');
	/*Feature Styles*/
	var mainlineStyle = {
		"color": "#191970",
		"weight": 4,
		"opacity": 1
	};
	var dimLinesStyle = {
		"color": "#000000",
		"weight": 1,
		"opacity": 1
	};
	/*Cartodb data*/
	hydrantsLabels = L.geoJson(null,{
		pointToLayer: function (feature, latlng) {
			var options = {radius: 0,fillColor: "#000",color: "#000",weight: 0,opacity: 0,fillOpacity: 0};
			return L.circleMarker(latlng, options).bindLabel(feature.properties.hyd_no, { noHide: true }).showLabel();;
			}
		});	
	var blowOffLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_hydrants",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [13, 20],
	    where: "make IN ('Blow Off')",
	    symbology: {
	        type: "single",
	            vectorOptions: { // Use these Leaflet Path options for features with values in this range
                	icon: new L.MakiMarkers.icon({icon: "lighthouse", color: "#FFD700", size: "m"}),
            }
	    },
	    clickEvent: function (feature, event) {
	    	blowoffClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;' ><b>HYDRANT {hyd_no}</b><a class='btn street-view' href='#' id='panoButton' lat= {lat} lon= {lon} hyd_no= {hyd_no}><i class='fa fa-street-view'></i></a></br>Blow Off</div>",
	    singlePopup: true
	});	
	blowOffLayer.setMap(map);
	var hydrantsLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_hydrants",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [13, 20],
	    where: "make NOT IN ('Blow Off')",
	    symbology: {
	        type: "single",
	            vectorOptions: { // Use these Leaflet Path options for features with values in this range
                	icon: new L.MakiMarkers.icon({icon: "lighthouse", color: "#FF8000", size: "m"}),
            }
	    },
	    clickEvent: function (feature, event) {
	    	hydrantClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>HYDRANT {hyd_no}</b><a class='btn street-view' href='#' id='panoButton' lat= {lat} lon= {lon} hyd_no= {hyd_no}><i class='fa fa-street-view'></i></a></div>",
	    singlePopup: true
	});	
	hydrantsLayer.setMap(map);
	var mainlineLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_mainline",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [17, 20],
	    symbology: {
	        type: "single", // Defines the symbology as a single type of representation for all features
			vectorOptions: { // Leaflet Path options for all features
		        fillColor: "#000099",
		        fillOpacity: 0.5,
		        weight: 4,
		        color: "#000099"
			}    
	    },
	    clickEvent: function (feature, event) {
	        mainlineClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>MAINLINE</b></br>Diameter: {diameter} inch</br>Material: {material}</div>",
	    singlePopup: true
	});
	mainlineLayer.setMap(map);	
	var fireValveLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_valves",
	    where: "type IN ('FIRE')",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [15, 20],
	    symbology: {
	        type: "single",
	        vectorOptions: { // Use these Leaflet Path options for features with values in this range
                icon: new L.MakiMarkers.icon({icon: "circle", color: "#FF0000", size: "s"}),
            }
	    },
	    clickEvent: function (feature, event) {
	        valveClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>FIRE VALVE</b></br>Diameter: {diameter} inch</br>Manufacturer: {manufactur}</div>",
	    singlePopup: true
	});
	var valveLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_valves",
	    where: "type NOT IN ('FIRE')",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [15, 20],
	    symbology: {
	        type: "single",
	        vectorOptions: { // Use these Leaflet Path options for features with values in this range
                icon: new L.MakiMarkers.icon({icon: "circle", color: "#F0E68C", size: "s"}),
            }
	    },
	    clickEvent: function (feature, event) {
	        valveClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>VALVE</b></br>Diameter: {diameter} inch</br>Manufacturer: {manufactur}</div>",
	    singlePopup: true
	});	
	var mainValveLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_mainvalve",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [15, 20],
	    symbology: {
	        type: "single",
	        vectorOptions: { // Use these Leaflet Path options for features with values in this range
                icon: new L.MakiMarkers.icon({icon: "circle", color: "#1E90FF", size: "s"}),
            }
	    },
	    clickEvent: function (feature, event) {
	        mainvalveClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>MAIN VALVE</b></br>Diameter: {diameter} inch</br>Manufacturer: {manufactur}</div>",
	    singlePopup: true
	});	
	var connectorValveLayer = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_connectorvalves",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [15, 20],
	    symbology: {
	        type: "single",
	        vectorOptions: { // Use these Leaflet Path options for features with values in this range
                icon: new L.MakiMarkers.icon({icon: "circle", color: "#ADFF2F", size: "s"}),
            }
	    },
	    clickEvent: function (feature, event) {
	        connectorvalveClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>CONNECTOR VALVE</b></br>Diameter: {diameter} inch</br>Manufacturer: {manufactur}</div>",
	    singlePopup: true
	});	
	var dimensionLines = new lvector.CartoDB({
	    user: "admin2",
	    table: "wrwd_dimlines",
	    key: "f5019774d855a7103161059c8f1a73972442dd70",
	    scaleRange: [17, 20],
	     symbology: {
	        type: "single", // Defines the symbology as a single type of representation for all features
			vectorOptions: { // Leaflet Path options for all features
		        fillColor: "#000099",
		        fillOpacity: 0.5,
		        weight: 1,
		        color: "#000099"
			}    
	    },
	    clickEvent: function (feature, event) {
	        connectorvalveClick(feature);
	    },
	    popupTemplate:  "<div style='color:black;'><b>CONNECTOR VALVE</b></br>Diameter: {diameter} inch</br>Manufacturer: {manufactur}</div>",
	    singlePopup: true
	});
	var dimensionLabelCluster = L.markerClusterGroup({disableClusteringAtZoom: 17, removeOutsideVisibleBounds:true});
		dimensionLabels = L.geoJson(null,{
			onEachFeature: function (feature, layer) {
				 var text = feature.properties.textstring;
		         var icon = L.divIcon({
							className: 'dimension-label-icon',
							iconSize: null,
							html: '<div>'+text+'</div>',
							});
				
				var marker = L.marker(new L.LatLng(feature.properties.lat, feature.properties.long), {icon: icon});
				dimensionLabelCluster.addLayer(marker);	
			},
		});

	pullCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM wrwd_dimlabels&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",dimensionLabels,'dimensionLabels')
	pullCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM wrwd_hydrants&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",null,'buildHydrantTable')
	pullCartoDBData("POST","https://admin2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM wrwd_hydrants&api_key=f5019774d855a7103161059c8f1a73972442dd70","json",hydrantsLabels,'hydrantsLabels')

	/*Googe Street View Service*/
		var sv = new google.maps.StreetViewService();
		var panorama = new google.maps.StreetViewPanorama(document.getElementById('panoDiv'));
		/*Pano Function*/
		function processSVData(data, status) {
		  if (status == google.maps.StreetViewStatus.OK) {
		    panorama.setPano(data.location.pano);
		    panorama.setPov({
		      heading: 270,
		      pitch: 0
		    });
		    panorama.setVisible(true);
		    $('#panoModal').modal('show'); 
		  } else {
		   console.log('Street View data not found for this location.');
		   	$('#panoModal-Unavailable').modal('show'); 
		  }
		}
var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);
var layerControl = L.control.layers({
      'TopoGraphic': topo,
      'Streets': osm,
      'Imagery':imagery
}).addTo(map);
function showAll(){
	$(':input', '#inputForm').each(function() {
			var id = '#' + this.id
			$(id).show();
			$(id + '_label').show();
        });
}
function clearForm(){
	$('#inputForm').trigger("reset");
}
function hydrantClick(f){
	showAll();
	clearForm();
	//pullMaintenanceData(e);
	$('#legend').text("HYDRANT");
	$('#att_1_label').text("Hydrant Number");
	$('#att_1').val(f.properties.hyd_no);
	$('#att_2_label').text("Certainty of Location");
	$('#att_2').val(f.properties.loc_cert);
	$('#att_3_label').text("Notes");
	$('#att_3').val(f.properties.notes);
	$('#att_4_label').text("Location");
	$('#att_4').val(f.properties.location);
	$('#att_5_label').text("Location Remarks");
	$('#att_5').val(f.properties.locationre);
	$('#att_6_label').text("Street Number");
	$('#att_6').val(f.properties.numberstre);
	$('#att_7_label').text("Street Name");
	$('#att_7').val(f.properties.namestreet);
	$('#att_8_label').text("Make");
	$('#att_8').val(f.properties.make);
	$('#att_9_label').text("Model");
	$('#att_9').val(f.properties.model);
	$('#att_10_label').text("Model Measurement");
	$('#att_10').val(f.properties.modelmeasu);
	$('#att_11_label').text("Model Nozzle");
	$('#att_11').val(f.properties.modelnozzl);
	$('#att_12_label').text("Age");
	$('#att_12').val(f.properties.age);
	$('#att_13_label').text("Bury");
	$('#att_13').val(f.properties.bury);
	$('#att_14_label').text("Open");
	$('#att_14').val(f.properties.open_);
	$('#ID').html(f.properties.cartodb_id);
	}
function blowoffClick(f){
	showAll();
	clearForm();
	//pullMaintenanceData(e);
	$('#legend').text("HYDRANT (BLOWOFF)");
	$('#att_1_label').text("Hydrant Number");
	$('#att_1').val(f.properties.hyd_no);
	$('#att_2_label').text("Certainty of Location");
	$('#att_2').val(f.properties.loc_cert);
	$('#att_3_label').text("Notes");
	$('#att_3').val(f.properties.notes);
	$('#att_4_label').text("Location");
	$('#att_4').val(f.properties.location);
	$('#att_5_label').text("Location Remarks");
	$('#att_5').val(f.properties.locationre);
	$('#att_6_label').text("Street Number");
	$('#att_6').val(f.properties.numberstre);
	$('#att_7_label').text("Street Name");
	$('#att_7').val(f.properties.namestreet);
	$('#att_8_label').text("Make");
	$('#att_8').val(f.properties.make);
	$('#att_9_label').text("Model");
	$('#att_9').val(f.properties.model);
	$('#att_10_label').text("Model Measurement");
	$('#att_10').val(f.properties.modelmeasu);
	$('#att_11_label').text("Model Nozzle");
	$('#att_11').val(f.properties.modelnozzl);
	$('#att_12_label').text("Age");
	$('#att_12').val(f.properties.age);
	$('#att_13_label').text("Bury");
	$('#att_13').val(f.properties.bury);
	$('#att_14_label').text("Open");
	$('#att_14').val(f.properties.open_);
	$('#ID').html(f.properties.cartodb_id);
	}
function mainvalveClick(f){
	showAll();
	clearForm();
	$('#legend').text("MAIN VALVE");
	$('#att_1_label').text("Diameter");
	$('#att_1').val(f.properties.diameter);
	$('#att_2_label').text("Manufacturer");
	$('#att_2').val(f.properties.manufactur);
	$('#att_3_label').text("Valve Function");
	$('#att_3').val(f.properties.valve_func);
	$('#att_4_label').text("Operation Method");
	$('#att_4').val(f.properties.oper_metho);
	$('#att_5_label').text("Flow Direction");
	$('#att_5').val(f.properties.flow_direc);
	$('#att_6_label').text("Customer C");
	$('#att_6').val(f.properties.customer_c);
	$('#att_7_label').text("Access Per");
	$('#att_7').val(f.properties.access_per);
	$('#att_8_label').text("Install Type");
	$('#att_8').val(f.properties.install_ty);
	$('#att_9_label').text("Normal Ope");
	$('#att_9').val(f.properties.normal_ope);
	$('#att_10_label').text("Closing Direction");
	$('#att_10').val(f.properties.closing_di);
	$('#att_11_label').text("Inspection");
	$('#att_11').val(f.properties.inspection);
	$('#att_12_label').text("Oper Curr");
	$('#att_12').val(f.properties.oper_curr);
	$('#att_13_label').text("Operable");
	$('#att_13').val(f.properties.operable);
	$('#att_14_label').hide();
	$('#att_14').hide();
	$('#ID').html(f.properties.cartodb_id);
}
function mainlineClick(f){
	showAll();
	clearForm();
	$('#legend').text("MAINLINE");
	$('#att_1_label').text("Diameter");
	$('#att_1').val(f.properties.diameter);
	$('#att_2_label').text("Material");
	$('#att_2').val(f.properties.material);
	$('#att_3_label').text("Corr Prot");
	$('#att_3').val(f.properties.corr_prot);
	$('#att_4_label').text("Water Type");
	$('#att_4').val(f.properties.water_type);
	$('#att_5_label').text("Customer C");
	$('#att_5').val(f.properties.customer_c);
	$('#att_6_label').text("Access Per");
	$('#att_6').val(f.properties.access_per);
	$('#att_7_label').text("Install Type");
	$('#att_7').val(f.properties.install_ty);
	$('#att_8_label').text("Joint Type");
	$('#att_8').val(f.properties.joint_type);
	$('#att_9_label').text("Joint Rest");
	$('#att_9').val(f.properties.joint_rest);
	$('#att_10_label').text("Pipe Class");
	$('#att_10').val(f.properties.pipe_class);
	$('#att_11_label').text("Install Method");
	$('#att_11').val(f.properties.install_me);
	$('#att_12_label').hide();
	$('#att_12').hide();
	$('#att_13_label').hide();
	$('#att_13').hide();
	$('#att_14_label').hide();
	$('#att_14').hide();
	$('#ID').html(f.properties.cartodb_id);
}
function valveClick(f){
	showAll();
	clearForm();
	$('#legend').text(f.properties.type + " VALVE");
	$('#att_1_label').text("Install Date");
	$('#att_1').val(f.properties.install_da);
	$('#att_2_label').text("Diameter");
	$('#att_2').val(f.properties.diameter);
	$('#att_3_label').text("Manufacturer");
	$('#att_3').val(f.properties.manufactur);
	$('#att_4_label').text("Water Type");
	$('#att_4').val(f.properties.water_type);
	$('#att_5_label').text("Customer C");
	$('#att_5').val(f.properties.customer_c);
	$('#att_6_label').text("Access Per");
	$('#att_6').val(f.properties.access_per);
	$('#att_7_label').text("Install Type");
	$('#att_7').val(f.properties.install_ty);
	$('#att_8_label').text("Col Method");
	$('#att_8').val(f.properties.col_method);
	$('#att_9_label').text("Normal Ope");
	$('#att_9').val(f.properties.normal_ope);
	$('#att_10_label').text("Closing Direction");
	$('#att_10').val(f.properties.closing_di);
	$('#att_11_label').text("Oper Curr");
	$('#att_11').val(f.properties.oper_curr_);
	$('#att_12_label').hide();
	$('#att_12').hide();
	$('#att_13_label').hide();
	$('#att_13').hide();
	$('#att_14_label').hide();
	$('#att_14').hide();
	$('#ID').html(f.properties.cartodb_id);
}
function connectorvalveClick(f){
	showAll();
	clearForm();
	$('#legend').text("CONNECTOR VALVE");
	$('#att_1_label').text("Install Date");
	$('#att_1').val(f.properties.install_da);
	$('#att_2_label').text("Diameter");
	$('#att_2').val(f.properties.diameter);
	$('#att_3_label').text("Manufacturer");
	$('#att_3').val(f.properties.manufactur);
	$('#att_4_label').text("Water Type");
	$('#att_4').val(f.properties.water_type);
	$('#att_5_label').text("Customer C");
	$('#att_5').val(f.properties.customer_c);
	$('#att_6_label').text("Access Per");
	$('#att_6').val(f.properties.access_per);
	$('#att_7_label').text("Install Type");
	$('#att_7').val(f.properties.install_ty);
	$('#att_8_label').text("Col Method");
	$('#att_8').val(f.properties.col_method);
	$('#att_9_label').text("Normal Ope");
	$('#att_9').val(f.properties.normal_ope);
	$('#att_10_label').text("Closing Direction");
	$('#att_10').val(f.properties.closing_di);
	$('#att_11_label').text("Oper Curr");
	$('#att_11').val(f.properties.oper_curr_);
	$('#att_12_label').text("Operation Method");
	$('#att_12').val(f.properties.oper_metho);
	$('#att_13_label').text("Valve Function");
	$('#att_13').val(f.properties.valve_func);
	$('#att_14_label').hide();
	$('#att_14').hide();
	$('#ID').html(f.properties.cartodb_id);
}
});