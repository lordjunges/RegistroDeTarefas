//$( document ).ready(function() {});

var userCatalog = new Array();

function getUserCatalog() {
  var localCatalog = localStorage.getItem("userCatalog");
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
    localStorage.setItem("userCatalog",JSON.stringify(userCatalog));
    console.log(userCatalog);
  }else{
    console.log("Usuário já registrado!!!");
  };
};
