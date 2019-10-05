var loggedUser = localStorage.getItem("RdT_LoggedUser");
var projectID = localStorage.getItem("RdT_projectID");
var userCatalog = new Array();
var projectCatalog = new Array();

if (projectID!=null) {
  getProjectCatalog();
  // var project;
  for (var i = 0; i < projectCatalog.length; i++) {
    if (projectCatalog[i].id==projectID) {
      var project=projectCatalog[i];
    };
  };
};

function getProjectCatalog() {
  var localCatalog = localStorage.getItem("RdT_projectCatalog");
  if (localCatalog!=null) {
    projectCatalog = JSON.parse(localCatalog);
  };
};

$( document ).ready(function() {
  if (loggedUser==null) {
    window.location.replace("login.html");
  };
  $("#currentUser").html(loggedUser);
  $("#projName").html(project.projName);
  $("#projID").html(project.id);
  var members="";
  for (var i = 0; i < project.members.length; i++) {
    members+="<li>"+project.members[i]+"</li>"
  };
  $('#projMembers:last').append(members);

});
