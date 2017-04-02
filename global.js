$(document).ready(function(e) {
  "use strict";
  //getting the data from API
  var currencyMap={
    usd:"$",
    aud:"AU$",
    gbp:"£",
    cad:"$",
    eur:"€",
    dkk:"kr",
    chf:"CHF"
  }
  $.ajax({
    url: 'http://starlord.hackerearth.com/kickstarter',
    success: function(data) {
      var html = "";
      var todayDate= new Date();
      var newDate;
      var diff;
      var i=1;
      sessionStorage.setItem("posts", JSON.stringify(data)); //storing data in session for sorting
      data.forEach(function(post) {
        newDate=post["end.time"];
        diff =  Math.floor(( Date.parse(todayDate) - Date.parse(newDate) ) / 86400000);
        html += "<li><div class='project"+i+"'><h4>"+post.title+"</h4><input type='hidden' value='"+post["s.no"]+"'>";
        html += "<br>";
        html += "<span class='pledge'>Pledged: " + currencyMap[post.currency] + post["amt.pledged"] + "</span><br>";
        html += "<span class='backers'>Backers: " +post["num.backers"] + "</span><br>";
        html += "<span class='endTime'>No. of days to go: " +diff + "</span>";
        html += "</div></li>";
        i= i>=3 ? 1: ++i;
      });
      $('#main ul').html(html); //populating the list

    },
    cache: false
  });

  /*click on project*/
  $(document).on("click", '#main ul li', function(event) { 
        var projectNum=$(this).find("input[type=hidden]").val();
        var project=$.parseJSON(sessionStorage.getItem("posts"))[projectNum];
        var html="";
        html += "<h4>"+project["blurb"]+"</h4>";
        html += "<h5>By- "+project["by"]+"</h5>"
        html += "<span class='pledge'>Pledged: " + currencyMap[project.currency] + project["amt.pledged"] + "</span><br>";
        html += "<span class='backers'>Backers: " +project["num.backers"] + "</span><br>";
        html += "<span>Percentage funded: " + project["percentage.funded"] + "%</span><br>";
        html += "<span>Location: " +project.location +","+ project.country +"(" + project.type+")"+"</span><br>";
        $('.modalHeader h2').html(project.title);
        $('.modalBody p').html(html);
        $('.modalFooter a').attr('href',"https://www.kickstarter.com/"+project.url);
        $('#projectModal').css('display','block');
        $('#projectModal').css('visibility','visible');

    });
   
  /*close button*/
  $('.close').click (function() {
       $('#projectModal').css('visibility','hidden');
  });

  /*Sort alphabetically*/
  var asc=true;
  $('#sort').click(function(){
    var project=$.parseJSON(sessionStorage.getItem("posts"));
    
    project = project.sort(function(a, b) {
        if (asc) return (a["title"] > b["title"]);
        else return (b["title"] > a["title"]);
    });
    asc=!asc;
    if(asc==true)
     $('#sort').html("Sort &#8679;");
    else
      $('#sort').html("Sort &#8681;");
    $('#main ul').html("");
    var html = "";
      var todayDate= new Date();
      var newDate;
      var diff;
      var i=1;
      project.forEach(function(post) {
        newDate=post["end.time"];
        diff =  Math.floor(( Date.parse(todayDate) - Date.parse(newDate) ) / 86400000);
        html += "<li><div class='project"+i+"'><h4>"+post.title+"</h4><input type='hidden' value='"+post["s.no"]+"'>";
        html += "<br>";
        html += "<span class='pledge'>Pledged: " + currencyMap[post.currency] + post["amt.pledged"] + "</span><br>";
        html += "<span class='backers'>Backers: " +post["num.backers"] + "</span><br>";
        html += "<span class='endTime'>No. of days to go: " +diff + "</span>";
        html += "</div></li>";
        i= i>=3 ? 1: ++i;
      });
      $('#main ul').html(html); //populating the list
  });

/*filter*/
  $('#filter').click(function(){
    var project=$.parseJSON(sessionStorage.getItem("posts"));
    var filter=$('#filterText').val();
    $('#main ul').html("");
    var html = "";
      var todayDate= new Date();
      var newDate;
      var diff;
      var i=1;
      project.forEach(function(post) {
        if(filter <= parseInt(post["num.backers"]) ){
          newDate=post["end.time"];
          diff =  Math.floor(( Date.parse(todayDate) - Date.parse(newDate) ) / 86400000);
          html += "<li><div class='project"+i+"'><h4>"+post.title+"</h4><input type='hidden' value='"+post["s.no"]+"'>";
          html += "<br>";
          html += "<span class='pledge'>Pledged: " + currencyMap[post.currency] + post["amt.pledged"] + "</span><br>";
          html += "<span class='backers'>Backers: " +post["num.backers"] + "</span><br>";
          html += "<span class='endTime'>No. of days to go: " +diff + "</span>";
          html += "</div></li>";
          i= i>=3 ? 1: ++i;
        }
      });
      $('#main ul').html(html); //populating the list
  });
  /*Search*/
  $('#search').click(function(){
    var project=$.parseJSON(sessionStorage.getItem("posts"));
    var searchText=$('#searchText').val();
    $('#main ul').html("");
    var html = "";
      var todayDate= new Date();
      var newDate;
      var diff;
      var i=1;
      project.forEach(function(post) {
        if (post.title.toLowerCase().indexOf(searchText) >= 0) {
          newDate=post["end.time"];
          diff =  Math.floor(( Date.parse(todayDate) - Date.parse(newDate) ) / 86400000);
          html += "<li><div class='project"+i+"'><h4>"+post.title+"</h4><input type='hidden' value='"+post["s.no"]+"'>";
          html += "<br>";
          html += "<span class='pledge'>Pledged: " + currencyMap[post.currency] + post["amt.pledged"] + "</span><br>";
          html += "<span class='backers'>Backers: " +post["num.backers"] + "</span><br>";
          html += "<span class='endTime'>No. of days to go: " +diff + "</span>";
          html += "</div></li>";
          i= i>=3 ? 1: ++i;
        }
      });
      $('#main ul').html(html); //populating the list
  });

});