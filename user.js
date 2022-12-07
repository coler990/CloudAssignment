//The URIs of the REST endpoint
RAAURI = "https://prod-60.northeurope.logic.azure.com/workflows/58e0248ddde946929362ebbf354a2cf8/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=H4fDGxE6aDRDVQraimetlrJ8n2MEMfad2aVQvqGUq1c";
CIAURI = "https://prod-30.northeurope.logic.azure.com/workflows/ae53f1be8f7844b692f652f390d21244/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_xgN9qR78D2W6LJGAXWgoIf5HrDtdybjVKJ7fbrxusA";

DIAURI0 = "https://prod-59.northeurope.logic.azure.com/workflows/4eee523c56064e01910138513cd37b90/triggers/manual/paths/invoke/rest/v1/users/{id}";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ubU5cPxSVHAA0al3gxRYw9H39ecx416bfQNenPKQn1Y";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get asset list function
      getAssetList();

  }); 

   //Handler for the new asset submission button
  $("#subNewUser").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 

  $("#subNewUser1").click(function(){
    
 
  submitNewAsset();
  return "Account Created";
  });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Construct JSON Object for new item
var subObj = {
  Username: $('#Username').val(),
  Email: $('#Email').val(),
  Password: $('#Password').val(),
  Admin: $('#Admin').val()

  }
  //Convert to a JSON String
  subObj = JSON.stringify(subObj);
  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
  url: CIAURI,
  data: subObj,
  contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
  getAssetList();
  });
  
  

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){

//Replace the current HTML in that div with a loading message
$('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
$.getJSON(RAAURI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];
//Iterate through the returned records and build HTML, incorporating the key values of therecord in the data
$.each( data, function( key, val ) {
items.push( "Username: " + val["Username"] +"<br/>");
items.push( "Email: " + val["Email"] +"<br/>");
items.push( "Admin: " + val["Admin"] +"<br/>");


items.push('<button type="button" id="Deluser" class="btn btndanger" onclick="deleteAsset(\''+val["id"] +'\')">Delete</button> <br/><br/>');
});
//Clear the assetlist div
$('#AssetList').empty();
//Append the contents of the items array to the AssetList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#AssetList" );
});
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
  $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIAURI0 + id + DIAURI1,
    }).done(function( msg ) {
    //On success, update the assetlist.
    getAssetList();
    });
    
}
