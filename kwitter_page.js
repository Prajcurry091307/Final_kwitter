var firebaseConfig = {
    apiKey: "AIzaSyCAp8sXb7bGXiADklGUsOyiyT31Di-3el0",
    authDomain: "kwitter-c2f48.firebaseapp.com",
    databaseURL: "https://kwitter-c2f48-default-rtdb.firebaseio.com",
    projectId: "kwitter-c2f48",
    storageBucket: "kwitter-c2f48.appspot.com",
    messagingSenderId: "658186658179",
    appId: "1:658186658179:web:ecee3c6518770d1c5716b6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 
//YOUR FIREBASE LINKS
var user_name= localStorage.getItem("user_name");
var room_name= localStorage.getItem("room_name");

function bodyOnLoad()
{
  document.getElementById("room_name_display").innerHTML = "Welcome to #"+ room_name+ " room!"
}

function send()
{
  var msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message: msg,
    like:0
  });
 document.getElementById("msg").value= "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        
        var user_name = message_data['name'];
        var message = message_data['message']; 
        var like = message_data['like'];

        var name_with_tag = "<h4> "+ user_name +"<img class='user_tick' src='tick.png'></h4>";
        var message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        var like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        var span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like+ "</span></button><hr>";

        var row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
       
        //End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button: " + message_id);
  var button_id = message_id;
  var likes = document.getElementById(button_id).value;
  var updated_likes = Number(likes) + 1;
  console.log("Updated likes: " + updated_likes);
  
  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes
  });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
