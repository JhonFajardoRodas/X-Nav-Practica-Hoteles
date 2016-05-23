// Show accomodations from a JSON file in a map.
// JSON file with accomodations is an adaption of the XML file
// with accomodations in Madrid from the open data portal of
// Ayuntamiento de Madrid (as of April 2016)
// Simple version. Doesn't work well if some of the fields are not defined.
// (for example, if there are no pictures)
//
var current_name = "";
array_collection = new Array();
array_google = new Array();
array_hotels_follow = new Array();
var x = 0;

var name_desc ;
function show_accomodation(){

  var accomodation = accomodations[$(this).attr('no')];
  var lat = accomodation.geoData.latitude;
  var lon = accomodation.geoData.longitude;
  var url = url_desc= accomodation.basicData.web;
  var name = name_desc = accomodation.basicData.name;
  var desc = accomodation.basicData.body;
  if(accomodation.multimedia.media[0] == undefined){
    var img = img_desc = 'http://inmobiliariajy.com/assets/image-not-found.jpg'
  }else{
    var img = img_desc = accomodation.multimedia.media[0].url;
  }

  if((accomodation.extradata.categorias.categoria || accomodation.extradata.categorias.categoria.item[1]) == undefined){
    var cat = cat_desc = " No hay datos"
    var subcat = " No hay datos"
  }else{
    var cat = cat_desc = accomodation.extradata.categorias.categoria.item[1]['#text'];

  }

  if((accomodation.extradata.categorias.categoria.subcategorias.subcategoria
    || accomodation.extradata.categorias.categoria.subcategorias.subcategoria.item[1]) == undefined){
    var cat = cat_desc = " No hay datos"
    var subcat = " No hay datos"
  }else{
    var cat = cat_desc = accomodation.extradata.categorias.categoria.item[1]['#text'];
    var subcat = accomodation.extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];
  }


  var pop = "";
  pop += '<a href="' + url + '">' + name + '</a><br/>';
  pop += "<button class='delete'>cerrar</button>"

  var m  = L.marker([lat, lon]).addTo(map).bindPopup(pop).openPopup();
  map.setView([lat, lon], 15);

  $(".delete").click(function(){
    map.removeLayer(m);
  });


  //$(".leaflet-popup-close-button").click()
  /*
  L.marker([lat, lon]).on('click', function(e) {
    alert(e.latlng); // e is an event object (MouseEvent in this case)
  });*/
  ///////////////// CONSTRUYO EL HTML DEL CAROUSEL ////////////////////////////////
  var html_carousel = '';
  var html_carousel2 = '';
  if(accomodation.multimedia.media != undefined){
    if(accomodation.multimedia.media.length != undefined){

      html_carousel += '<div id="myCarousel" class="carousel slide" data-ride="carousel">' +
                       '<ol class="carousel-indicators">' +
                       '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';

       html_carousel2 += '<div id="myCarousel2" class="carousel slide" data-ride="carousel">' +
                        '<ol class="carousel-indicators">' +
                        '<li data-target="#myCarousel2" data-slide-to="0" class="active"></li>';
      if(accomodation.multimedia.media.length > 1){
        for(var j = 1; j < accomodation.multimedia.media.length ; j++ ){
          html_carousel += '<li data-target="#myCarousel" data-slide-to=' + j +' ></li>'
          html_carousel2 += '<li data-target="#myCarousel2" data-slide-to=' + j +' ></li>'
        }
      }

      html_carousel += '</ol><div class="carousel-inner" role="listbox">' +
                  '<div class="item active">' +
                  '<img src='+ img +' >'+
                  '</div>';

      html_carousel2 += '</ol><div class="carousel-inner" role="listbox">' +
                  '<div class="item active">' +
                  '<img src='+ img +' >'+
                  '</div>';

      if(accomodation.multimedia.media.length > 1){
        for(var x = 1; x < accomodation.multimedia.media.length ; x++ ){
          html_carousel += '<div class="item">' +
                          '<img src='+ accomodation.multimedia.media[x].url +' >'+
                          '</div>';
          html_carousel2 += '<div class="item">' +
                          '<img src='+ accomodation.multimedia.media[x].url +' >'+
                          '</div>';
        }
      }


      html_carousel+= '</div><a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
      '<span class="sr-only">Previous</span></a>' +
      '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
      '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
      '<span class="sr-only">Next</span>'+
      '</a></div>';

      html_carousel2+= '</div><a class="left carousel-control" href="#myCarousel2" role="button" data-slide="prev">'+
      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
      '<span class="sr-only">Previous</span></a>' +
      '<a class="right carousel-control" href="#myCarousel2" role="button" data-slide="next">'+
      '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
      '<span class="sr-only">Next</span>'+
      '</a></div>';

    }else{
    //  $('#myCarousel').hide();
      html_carousel = '<img src='+ 'http://inmobiliariajy.com/assets/image-not-found.jpg' +' >';
      html_carousel2 = '<img src='+ 'http://inmobiliariajy.com/assets/image-not-found.jpg' +' >';
    }
  }else{
  //  html_carousel = '<img src='+ 'http://inmobiliariajy.com/assets/image-not-found.jpg' +' >'
    $('#myCarousel').hide();
    $('#myCarousel2').hide();
  }

/////////////////////////////////////////////////////////////////////


   if(accomodation.multimedia.media[0] != undefined){
      console.log("no es undefined")
      $('.desc').html('<div class="col-sm-6"><h2>' + name + '</h2>'
       + '<p>Alojamiento: ' + cat + ', ' + subcat + '</p>'
       + desc + '</div><div class="col-sm-6">' + html_carousel + "</div>");

       $('.desc2').html('<div class="col-sm-6"><h2>' + name + '</h2>'
        + '<p>Alojamiento: ' + cat + ', ' + subcat + '</p>'
        + desc + '</div><div class="col-sm-6">' + html_carousel2 + "</div>");
    }else{
      console.log(" es undefined")
        $('.desc').html("Sin datos")
        $('.desc2').html("Sin datos")
    }
    $('.selection').show();


    //// CODIGO DEL DROPPABLE y DRAGGABLE
   $(function() {

   $( "li.li-sel" ).draggable({
     appendTo: "body",
     helper: "clone"
   });
   $( ".cart ol" ).droppable({
     activeClass: "ui-state-default",
     hoverClass: "ui-state-hover",
     accept: ":not(.ui-sortable-helper)",
     drop: function( event, ui ) {
       $( this ).find( ".placeholder" ).remove();
       $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
       //aux.push(ui.draggable.text());
     }
   }).sortable({
     items: "li:not(.placeholder)",
     sort: function() {
       // gets added unintentionally by droppable interacting with sortable
       // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
       $( this ).removeClass( "ui-state-default" );
     }
   });


 });

 show_followers(name);
 /////////////
};



function open_json(){
  file = $("#file-json").val();
  console.log(file)
  $.getJSON(file, function(data) {
    array_collection = data.collections;
    array_google = data.google;

    user_google = [];



    array_google.forEach(function(it2){
      user_google.push(it2.name);
      for(var j = 0; j < it2.hotels.length; j ++){
        hotel_f = new Object();
        hotel_f.name_hotel = it2.hotels[j];
        hotel_f.users_f_hotel = [];
        array_hotels_follow.push(hotel_f);
      }

    });

    array_hotels_follow.forEach(function(it3){
      for(var r = 0; r < array_google.length; r++){
        for(var c = 0; c < array_google[r].hotels.length; c++){
          if(it3.name_hotel == array_google[r].hotels[c]){
            it3.users_f_hotel.push(array_google[r].name);
          }
        }
      }
    })


    var html_collections = "";

    array_collection.forEach(function(it){
    //  console.log(x)
      html_collections += "<p class=list-collections collection=" + x + " >" + it.title;
      /*for(var i= 0; i < it.hotels.length; i++){
        html_collections+= "<li>" + it.hotels[i] + "</li>"
      }*/
      x++;
      html_collections+= "</p>";
    });
    //console.log("Aqui se quedo la x " + x)

    //$('.list-collections-container').append(html_collections);
    $('#selectable').append(html_collections);
  //$('#selectable').selectable();

    $('p.list-collections').click(function(){

      var val_p = $(this).attr("collection");
      console.log(val_p);

      console.log(array_collection[val_p].title)
      var html_list ="<h3>" + array_collection[val_p].title + "</h3>";
      for(var i = 0; i < array_collection[val_p].hotels.length; i++){
        html_list += "<li><ul>" + array_collection[val_p].hotels[i] + "</ul></li>"
      }

      $('.hotels-list').html(html_list);
      $('.hotels-list').show();


      $( ".hotels-list li" ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function( event, ui ) {
          $( this ).find( ".placeholder" ).remove();
          $( "<li><ul></ul></li>" ).text( ui.draggable.text() ).appendTo( this );
          array_collection[val_p].hotels.push(ui.draggable.text())
          //aux.push(ui.draggable.text());
          }
        }).sortable({
          items: "li:not(.placeholder)",
          sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $( this ).removeClass( "ui-state-default" );
          }
        });

    });


  //  $('.list-collections-principal').append(html_collections);

    $('.list-collections-container').show();
    $('.list-collections-principal').show();



  });
}

function get_accomodations(){
  $.getJSON("alojamientos.json", function(data) {
    $('.get').html('');
    accomodations = data.serviceList.service
    $('.list').after('<h1>' + accomodations.length + '</h1>');
    var list = '<p>HOTELES ENCONTRADOS ' + 'Número de hoteles:' +accomodations.length
     + ' (click on any of them for details and location in the map)</p>'
    list = list + '<ul>'
    for (var i = 0; i < accomodations.length; i++) {
      list = list + '<li class="li-sel" no=' + i + '>' + accomodations[i].basicData.title + '</li>';
    }
    list = list + '</ul>';
    $('.list').html(list);
    $('li.li-sel').click(show_accomodation);
    $('#map').show();
    $('.show-list').show();
    $('.show-list-selected').show();
    $('.get').hide();
  });
};

function show_followers(hotel_name){

  console.log("---" + hotel_name)
  var html = "<h3>SEGUIDORES</h3>"

  for (iterator=0; iterator < array_hotels_follow.length; iterator++){
    if(array_hotels_follow[iterator].name_hotel == hotel_name){
      console.log(array_hotels_follow[iterator].name_hotel)
      console.log(hotel_name)
      for (i2=0; i2 < array_hotels_follow[iterator].users_f_hotel.length; i2++){
        console.log("long" + array_hotels_follow[iterator].users_f_hotel.length)
        html += "<li>"+ array_hotels_follow[iterator].users_f_hotel[i2] + "</li><br>"
        console.log("Añado li")
      }
    }
  }
  $('#followers').html(html);
};

function add_collection (val){
    console.log("La x es " + x)
    $('#head-collection').html(val);

    collection = new Object();
    collection.title = val;
    collection.hotels = [];
    //console.log($('.cart li'))
    $('.cart li').each(function(index){
      collection.hotels.push($(this).text());
    })

    array_collection.push(collection)
    $('#head-collection').html("");

    $('.cart ol').each(function(index){
      $(this).html("");
    })

    var html_collections = "";
    console.log(x);

    html_collections +=  "<p class=list-collections collection=" + x + " >" + array_collection[x].title + "</p>";

    $('#selectable').append(html_collections);
  //  $('#selectable').selectable();
    $('p.list-collections').click(function(){
      var val_add = $(this).attr("collection");
      console.log(array_collection[val_add].title)
      var html_list ="<h3>" + array_collection[val_add].title + "</h3>";
      for(var i = 0; i < array_collection[val_add].hotels.length; i++){
        html_list += "<li><ul>" + array_collection[val_add].hotels[i] + "</ul></li>"
      }

      $('.hotels-list').html(html_list);
      $('.hotels-list').show();

      $( ".hotels-list " ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function( event, ui ) {
          $( this ).find( ".placeholder" ).remove();
          $( "<li><ul></ul></li>" ).text( ui.draggable.text() ).appendTo( this );
          array_collection[val_add].hotels.push(ui.draggable.text())
          //aux.push(ui.draggable.text());
          }
        }).sortable({
          items: "li:not(.placeholder)",
          sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $( this ).removeClass( "ui-state-default" );
          }
        });
    });
    //$('.list-collections-principal').append(html_collections);
  //  $('.list-collections-container').show();
  //  $('.list-collections-principal').show();
    $('#name-colecction').html("Pon nombre a tu colección.");
    $('li.placeholder').html("Arrastra aquí a tus hoteles");

}




function getToken(file , repo, tok) {
  //  var token = $("#token").val();
   //var token_x = "651eec3144eec32c631aa10d76905d94958a2ec8";
//  var token_x = "218530ebaae924c9425580b3a1611638c88a01b0";
    github = new Github({
	    token: tok,
 	    auth: "oauth"
    });
    myrepo = github.getRepo("JhonFajardoRodas", repo);
    writeFile(file);
};

function writeFile(file_j) {
  console.log(file_j)
    console.log("escribo")
    var info = {};
    info["collections"] = array_collection;
    info["google"] = array_google;

    console.log("info: '" + JSON.stringify(info) + "'")
    myrepo.write('master', file_j,
		 JSON.stringify(info),
		 "Updating data", function(err) {
		     console.log (err)
		 });
};


function reg_google_user (name_google){
  //console.log(name_google);
  var html_follow = "<p> Sigue los siguientes hoteles </p>";
  var html_follow2 = "";
  var html_follow3 = "";
  var key_Api = 'AIzaSyC6WwPdZ2k7FCB1dEB5HRidd3z8UXW7k6E';
  gapi.client.setApiKey(key_Api);
  makeApiCall();

  function makeApiCall() {
    gapi.client.load('plus', 'v1', function() {
      var request = gapi.client.plus.people.get({
        'userId': name_google
      });
    request.execute(function(resp) {
      var name  = resp.displayName;
      html_follow2 = "<p>" + name + "</p>"

      var image = resp.image.url;
      console.log("----"   +  resp.image.url);
      html_follow3 = "<img src=" + resp.image.url +  ">"
      for(var i = 0; i < array_google.length; i++ ){
        console.log(array_google[i].name);
        if ( name == array_google[i].name){
          for(var j = 0; j < array_google[i].hotels.length; j ++){
            html_follow += "<li>" + array_google[i].hotels[j] + "</li>";
          }
        }
      }
      $('#info-user-google').html(html_follow2);
      $('#info-user-google').append(html_follow3);
      $('#info-user-google').append(html_follow);
      console.log(resp.displayName);
      current_name = resp.displayName;
      })
    })
  }



}


$(document).ready(function() {

  map = L.map('map').setView([40.4175, -3.708], 11);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  $(function() {
    $( "#tabs" ).tabs();
  });
  $('#map').hide();
  $('.selection').hide();
  $('.show-list').hide();
  $('.list-collections').hide();
  $('.list-collections-principal').hide();
  $('.list-collections-container').hide();
  $('.show-list-selected').hide();
  $('.hotels-list').hide();
  $(".get").click(get_accomodations);


  $( "div.demo" ).scrollTop( 50 );



  $(".btn-add-collection").click(function(){
  //  $('#map').hide();
  //console.log("La x esssss " + x)
    var name_collection = $("#name-colecction").val();
    add_collection(name_collection);
    x++;

//    console.log("La x esssss cuando añado " + x)


  });

  $( "#form-file-github" ).submit(function( event ) {
    open_json();
    event.preventDefault();
  });

  $( "#save-file-github" ).submit(function( event ) {
    var file_json = $('#file-json-save').val();
    var repository = $('#repo-json').val();
    var token = $('#token-json').val();
    console.log(file_json + " " + repository + " " + token);
    getToken(file_json, repository, token);
    event.preventDefault();
  });


  $('#btn-add-user').click(function(){
    var name_google = $('#name-user').val();
    reg_google_user(name_google);
  })

  $('.follow').click(function(){
    //console.log("follow" + name_desc)
    //var usr  = $('#name-user').val();
    var found = found2 = false;
    console.log("++++++++++" + current_name)
    array_hotels_follow.forEach(function(index){
      if(index.name_hotel == name_desc){
        index.users_f_hotel.push(current_name);
        found = true;
        console.log("Añado li 2")
        $('#followers').append("<li>"  + current_name + "</li>");
      }
    });
    if(!found){
      var aux = new Object();
      aux.name_hotel = name_desc;
      aux.users_f_hotel = [];
      aux.users_f_hotel.push(current_name);
      array_hotels_follow.push(aux);
      $('#followers').append("<li>" + current_name + "</li>");

      array_google.forEach(function(index2){
        if(index2.name == current_name){
          index2.hotels.push(name_desc);
          found2= true;
        }
      });
      if(!found2){
        var aux2 = new Object();
        aux2.name = current_name;
        aux2.hotels = [];
        aux2.hotels.push(name_desc);
        array_google.push(aux2);
      //  $('#followers').append("<li>" + usr + "</li>");
      }


    }
  });



});
