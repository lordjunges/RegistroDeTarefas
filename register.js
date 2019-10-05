//$( document ).ready(function() {});

var userCatalog = new Array();

function getUserCatalog() {
  var localCatalog = localStorage.getItem("RdT_userCatalog");
  if (localCatalog!=null) {
    userCatalog = JSON.parse(localCatalog);
  };
};

function checkUserNameExistence(newUserName){
  getUserCatalog();
  for (var i = 0; i < userCatalog.length; i++) {
    if (userCatalog[i].username==newUserName) {
      return true;
    };
  };
  return false;
};

function addUser(){
  var newusername = $('input[name ="username"]').val();
  var newname = $('input[name ="name"]').val();
  var newpassword = $('input[name ="password"]').val();

  if (!checkUserNameExistence(newusername)){
    userCatalog.push({
      username:newusername,
      name:newname,
      password:newpassword
    });
    localStorage.setItem("RdT_userCatalog",JSON.stringify(userCatalog));
    console.log(userCatalog);
    alert("Utilizador registrado com sucesso!!!");
    window.location.replace("login.html");
  }else{
    console.log("Usuário já registrado!!!");
    $("#info").html("Erro: O utilizador "+newusername+" já existe!!!");
    $('input[name ="username"]').val("");
    $('input[name ="name"]').val("");
    $('input[name ="password"]').val("");
  };
};
