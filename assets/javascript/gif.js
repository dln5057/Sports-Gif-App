var gifs =['Derek Jeter', 'Michael Jordan', 'Pete Rose', 'Tiger Woods', 'Bo Jackson', 'Wayne Gretzky', 'Baseball', 'football', 'Soccer', "Basketball", 'Hockey', 'ESPN', 'Tennis']
//defining var i add a unique id to each gif
var i=0

function displayGif(){
  $('#gifList').empty();
  var gif = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +gif +"&api_key=dc6zaTOxFJmzC";
  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    console.log(response.data);
    var myGiphyArray = response.data;
    $.each(myGiphyArray.slice(0,10), function(index, value){ 
      var embedUrl = value.images.original.url;
      var stillUrl = value.images.original_still.url;
      var animatedUrl = value.images.original.url;
      newImage = $('<img>');
      newImage.attr('class', 'oneGif');
      //adds a unique id to each gif
      newImage.attr('id', i);
      i++

      newImage.attr('src', embedUrl);
      newImage.attr('data-still', stillUrl)
      newImage.attr('data-animated', animatedUrl)
      $('#gifList').prepend(newImage);  
    });
  }); 
}

function renderButtons(){     
  $('#gifViews').empty();
  for (var i = 0; i < gifs.length; i++){
    var a = $('<button class="btn btn-success">') 
    a.addClass('gif'); 
    a.attr('data-name', gifs[i]);  
    a.text(gifs[i]); 
    $('#gifViews').append(a); 
  }
}

$('#addGif').on('click', function(){  
  var gif = $('#gif-input').val().trim();
  gifs.push(gif);
  renderButtons();
  return false;
})
$(document).on('click', '.gif', displayGif);
  
  renderButtons();


//when a gif is clicked this function runs:
$(document).on('click', '.oneGif', function(){
  //if src of clicked gif is data-animated
  if(this.src === this.dataset.animated){
    //change src to data-still:
    $("#" + this.id).attr('src', this.dataset.still)
  //else (if  src is data-still):
  }else{
    //change src to data-animated
    $("#" + this.id).attr('src', this.dataset.animated)
  }
});