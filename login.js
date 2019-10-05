var userCatalog = new Array();

function getUserCatalog() {
  var localCatalog = localStorage.getItem("RdT_userCatalog");
  if (localCatalog!=null) {
    userCatalog = JSON.parse(localCatalog);
  };
};

function checkCredentials(username,password){
  getUserCatalog();
  for (var i = 0; i < userCatalog.length; i++) {
    if (userCatalog[i].username==username && userCatalog[i].password==password) {
      return true;
    };
  };
  return false;
};

function login(){
  var username = $('input[name ="username"]').val();
  var password = $('input[name ="password"]').val();
  if (checkCredentials(username,password)){
    localStorage.setItem("RdT_LoggedUser",username);
    window.location.replace("home.html");
  } else {
    $("#info").html("Erro: Nome de Utilizador / Palavra-passe incorretos!!!");
  };
};
