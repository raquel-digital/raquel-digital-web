const socket = io.connect();
socket.emit("test")
socket.on("ok", () => console.log("ok"))
let img = document.querySelector(".result");
function fileChange(){
    var file = document.getElementById('input_img');
    let indice = file.files.length-1;
     while(indice >= 0){
      var form = new FormData();
      form.append("image", file.files[indice])
      var settings = {
        "url": "https://api.imgbb.com/1/upload?key=6d07fce2081028319388a145fede3fd6",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
        var jx = JSON.parse(response);
        console.log(jx.data.url);
        img.src = jx.data.url 
        socket.emit("imagen-subida", img.src)     
      });
      indice--;
     }
}