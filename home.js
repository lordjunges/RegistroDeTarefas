var loggedUser = localStorage.getItem("RdT_LoggedUser");
var userCatalog = new Array();
var projectCatalog = new Array();

function getUserCatalog() {
  var localCatalog = localStorage.getItem("RdT_userCatalog");
  if (localCatalog!=null) {
    userCatalog = JSON.parse(localCatalog);
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
  $("#newProject").hide();
  populateProjTable();
  fillNewProjUserList();

});

function logout(){
  localStorage.removeItem("RdT_LoggedUser");
  window.location.replace("login.html");
};

function showOptions() {
  $("#newProject").show();
};

function newProject() {
  getProjectCatalog();
  var id = 0;
  for (var i = 0; i < projectCatalog.length; i++) {
    if (projectCatalog[i].id>id){
      id=projectCatalog[i].id;
    };
  };
  var projName = $('input[name ="projName"]').val();
  var tasks = new Array();
  var members = $('#userList').val();
  if (members==null){members=[loggedUser]}else{members.push(loggedUser)};
  var newProj = {
    id:id+1,
    projName:projName,
    tasks:tasks,
    members:members
  };
  projectCatalog.push(newProj);
  localStorage.setItem("RdT_projectCatalog",JSON.stringify(projectCatalog));
  localStorage.setItem("RdT_projectID",id+1);
  window.location.replace("project.html");
};

function populateProjTable() {
  getProjectCatalog();
  var tbody = "";
  if (projectCatalog.length==0) {
    tbody = "<tr><td colspan='4'>Você ainda não participa de nenhum projeto.</td></tr>";
  } else {
    tbody = "<tbody>";
    for (var i = 0; i < projectCatalog.length; i++) {
      var nTotalTasks = projectCatalog[i].tasks.length;
      var nTasksDone = 0;
      for (var x = 0; x < projectCatalog[i].tasks.length; x++) {
        if (projectCatalog[i].tasks[x].status=="Finalizada") {
          nTasksDone++;
        };
      };
      var taskProgress = ""
      if (nTotalTasks==0) {
        taskProgress+="<td>Não há tarefas</td>"
      }else {
        taskProgress+="<td>"+parseInt(nTasksDone/nTotalTasks*100)+"% ("+nTasksDone+"/"+nTotalTasks+")</td>"
      };
      tbody+= "<tr>"+
          "<td>"+projectCatalog[i].id+"</td>"+
          "<td>"+projectCatalog[i].projName+"</td>"+
          taskProgress+
          "<td>"+projectCatalog[i].members+"</td>"+
          "<td><button type='button' onclick='editProject("+projectCatalog[i].id+")'>Editar</button></td>"
    };
  };
  tbody+= "</tbody>"
  $('table:last').append(tbody);
};

function fillNewProjUserList(){
  getUserCatalog();
  var options = ""
  for (var i = 0; i < userCatalog.length; i++) {
    if (userCatalog[i].username==loggedUser) {
      options+="<option value='"+loggedUser+"' disabled>"+loggedUser+"</option>"
    }else {
      options+="<option value='"+userCatalog[i].username+"'>"+userCatalog[i].username+"</option>"
    };
  };
  $('select:last').append(options);
};

function editProject(id) {
  localStorage.setItem("RdT_projectID",id);
  window.location.replace("project.html");
};
