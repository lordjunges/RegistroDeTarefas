var loggedUser = localStorage.getItem("RdT_LoggedUser");
var projectID = localStorage.getItem("RdT_projectID");
var userCatalog = new Array();
var projectCatalog = new Array();

if (projectID!=null) {
  getProjectCatalog();
  var projIndex=projectID-1;
  // console.log(projIndex,projectID-1);
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

function saveChanges(){
  projectCatalog[projIndex]=project;
  localStorage.setItem("RdT_projectCatalog",JSON.stringify(projectCatalog));
  populateTasksTable();
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
  $("#newTask").hide();
  populateTasksTable();

});

function showOptions() {
  $("#newTask").show();
};

function newTask(){
  var id = 0;
  for (var i = 0; i < project.tasks.length; i++) {
    if (project.tasks[i].id>id){
      id=project.tasks[i].id;
    };
  };
  var description = $('input[name ="description"]').val();
  var owner = $('#userList').val();
  var newTask = {
    id:id+1,
    description:description,
    owner:owner,
    status:"Nova",
    start:"--",
    end:"--"
  };
  if (project.tasks.length==0) {$("#noTasks").remove()};
  project.tasks.push(newTask);
  // projectCatalog[projIndex]=project;
  // localStorage.setItem("RdT_projectCatalog",JSON.stringify(projectCatalog));
  // populateTasksTable();
  saveChanges();
};

function populateTasksTable(){
  // getProjectCatalog();
  $(".allTasks").remove();
  var tbody = "";
  if (project.tasks.length==0) {
    tbody = "<tr id='noTasks'><td colspan='7'>Ainda não há nenhuma tareja registrada.</td></tr>";
  } else {
    tbody = "<tbody class='allTasks'>";
    for (var i = 0; i < project.tasks.length; i++) {
      tbody+= "<tr>"+
          "<td>"+project.tasks[i].id+"</td>"+
          "<td>"+project.tasks[i].description+"</td>"+
          "<td>"+project.tasks[i].owner+"</td>"+
          "<td>"+project.tasks[i].status+"</td>";
      if (project.tasks[i].start=="--") { // Tarefa não iniciada
        tbody+="<td>"+project.tasks[i].start+"</td>";
        // var taskNotStarted = "<td>--</td>";
      }else { // Tarefa iniciada
        var startObj = new moment(project.tasks[i].start);
        tbody+="<td>"+startObj.format('DD/MM/YYYY LT')+"</td>";
      };
      if (project.tasks[i].end=="--") { // Tareja não finalizada
        tbody+="<td>"+project.tasks[i].end+"</td>";
        if (project.tasks[i].status=="Nova") {
          tbody+="<td>--</td>";
        }else { // Tarefa iniciada, mas não finalizada
          var startTime = new moment(project.tasks[i].start);
          var now = new moment();
          var minutes = now.diff(startTime, "minutes");
          var hours = now.diff(startTime, "hours");
          var days = now.diff(startTime, "days");
          tbody+="<td>"+days+"D "+hours+"H "+minutes+"M</td>";
        };
      }else { // Tarefa já finalizada
        var startTime = new moment(project.tasks[i].start);
        var endTime = new moment(project.tasks[i].end);
        tbody+="<td>"+endTime.format('DD/MM/YYYY LT')+"</td>";
        var minutes = endTime.diff(startTime, "minutes");
        var hours = endTime.diff(startTime, "hours");
        var days = endTime.diff(startTime, "days");
        tbody+="<td>"+days+"d"+hours+"h"+minutes+"m</td>";
      };
      if (project.tasks[i].status=="Nova") {
        tbody+="<td><button type='button' onclick='startTask("+project.tasks[i].id+")'>Iniciar</button></td>"
      }else if (project.tasks[i].status=="Em Andamento") {
        tbody+="<td><button type='button' onclick='endTask("+project.tasks[i].id+")'>Finalizar</button></td>"
      };
      // "<td><button type='button' onclick='editProject("+projectCatalog[i].id+")'>Editar</button></td>"
    };
  };
  tbody+= "</tbody>"
  $('table:last').append(tbody);
};

function startTask(taskID){
  var startTime = new moment();
  project.tasks[taskID-1].start=startTime;
  project.tasks[taskID-1].status="Em Andamento";
  saveChanges();
};

function endTask(taskID){
  var endTime = new moment();
  project.tasks[taskID-1].end=endTime;
  project.tasks[taskID-1].status="Finalizada";
  saveChanges();
};
