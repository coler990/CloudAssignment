//The URIs of the REST endpoint
IUPS = "https://prod-34.northeurope.logic.azure.com:443/workflows/85b55883b3d9453d92edb9f4acf77eb7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1k354H08nppBWpoNGvTJSx32j999UUwmGQgzJ8sijpg";
RAI = "https://prod-17.northeurope.logic.azure.com:443/workflows/10d3218a1c35406b838bb02742d2f95c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5DBfFZVZJgxxa7BtdC46gnCi839D-FCOGWL4ozhaHeo";

DIA0="https://prod-26.northeurope.logic.azure.com:443/workflows/22a61007949c424199621999fac0d887/triggers/manual/paths/invoke"

DIA1="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5sYOZjyHG-ULC06Pg3kFGC0npBwIdA1pOg_aeRFMS2U" 


BLOB_ACCOUNT = "https://videosharecole.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
  $("#sublogin").click(function(){

    //Execute the submit new asset function
    Login();
    
  }); 

});

function Login(){


}


function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
 submitData = new FormData();

 
 //Get form variables and append them to the form data object
 submitData.append('Title', $('#Title').val());
 submitData.append('Publisher', $('#Publisher').val());
 submitData.append('Producer', $('#Producer').val());
 submitData.append('Rating', $('#Rating').val());
 submitData.append('Genre', $('#Genre').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 document.getElementById("newAssetForm").reset();
 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });

 

}



//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

  //Replace the current HTML in that div with a loading message
 $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAI, function( data ) {
 //Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'controls></video> <br />")
 items.push( "File : " + val["Title"] + "<br />");
 items.push( "Publisher: " + val["Publisher"] + "<br />");
 items.push( "Producer: " + val["Producer"] + "<br />");
 items.push( "Genre: " + val["Genre"] + "<br />");
 items.push( "Age Rating: " + val["Rating"] + "<br />");
 items.push( "<hr />");
 items.push('<button type = "button" id ="delBtn" class = "btn btn-danger" onclick="delVid(\''+val["id"]+ '\')">Delete</button> <br/><br/>');
 });
 //Clear the assetlist div
 $('#VideoList').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
 html: items.join( "" )
 }).appendTo( "#VideoList" );
});
}

function getVideoUser(){

  //Replace the current HTML in that div with a loading message
 $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAI, function( data ) {
 //Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'controls></video> <br />")
 items.push( "File : " + val["Title"] + "<br />");
 items.push( "Publisher: " + val["Publisher"] + "<br />");
 items.push( "Producer: " + val["Producer"] + "<br />");
 items.push( "Genre: " + val["Genre"] + "<br />");
 items.push( "Age Rating: " + val["Rating"] + "<br />");
 items.push( "<hr />");
 
 });
 //Clear the assetlist div
 $('#VideoList').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
 html: items.join( "" )
 }).appendTo( "#VideoList" );
});
}


function UpdVid(id){



}
function delVid(id){
  $.ajax({
    type: "DELETE",

    url: DIA0 + id + DIA1,
  }).done(function(msg){
    getVideo();
  })
  



}

