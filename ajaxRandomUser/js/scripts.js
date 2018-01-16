let peticion;

document.body.onload = function(){
    if(window.XMLHttpRequest) {
        peticion = new XMLHttpRequest();
    }else if(window.ActiveXObject) {
        peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(peticion){
        peticion.onreadystatechange = cargarUsuarios;
        peticion.open('GET', 'https://randomuser.me/api/?results=50', true);
        peticion.send(null);
    }
}

function cargarUsuarios(){
    if(peticion.readyState == 4){
        if(peticion.status == 200){
            const usuarios = JSON.parse(peticion.responseText).results;
            for(i in usuarios){
                let usuario = usuarios[i];
                console.log(usuario);
                let div = document.createElement("div");
                div.className="col-md-4 usuario";

                let divUsuario = document.createElement("div");
                divUsuario.className = "col-md-12 " + usuario.gender;
                div.appendChild(divUsuario);

                let divImagen = document.createElement("div");
                divImagen.className = "col-md-3";
                let img = document.createElement("img");
                img.className = "img-circle";
                img.src = usuario.picture.medium;
                img.alt = usuario.name.first + " " + usuario.name.last;
                img.width="50";
                img.height="50";
                divImagen.appendChild(img);
                divUsuario.appendChild(divImagen);

                let nombre = document.createElement("h3");
                let txtNombre = document.createTextNode(usuario.name.first + " " + usuario.name.last + " ");
                let nacionalidad = document.createElement("img");
                nacionalidad.src = "css/blank.gif";
                nacionalidad.className = "flag flag-" + usuario.nat.toLowerCase();
                nombre.className = "nombre col-md-9";
                nombre.appendChild(txtNombre);
                nombre.appendChild(nacionalidad);

                nombre.onclick = function(){
                    alert(usuario.name.first + " " + usuario.name.last);
                }

                divUsuario.appendChild(nombre);

                let tel = document.createElement("div");
                let txtTel = document.createTextNode(usuario.cell);
                let imgTel = document.createElement("span");
                imgTel.className = "glyphicon glyphicon-phone imgDatoUsuario";
                tel.className="col-md-12 datoUsuario";
                tel.appendChild(imgTel);
                tel.appendChild(txtTel);
                divUsuario.appendChild(tel);

                let telFijo = document.createElement("div");
                let txtTelFijo = document.createTextNode(usuario.phone);
                let imgTelFijo = document.createElement("span");
                imgTelFijo.className = "glyphicon glyphicon-phone-alt imgDatoUsuario";
                telFijo.className="col-md-12 datoUsuario";
                telFijo.appendChild(imgTelFijo);
                telFijo.appendChild(txtTelFijo);
                divUsuario.appendChild(telFijo);

                let email = document.createElement("div");
                let txtEmail = document.createTextNode(usuario.email);
                let imgEmail = document.createElement("span");
                imgEmail.className = "glyphicon glyphicon-envelope imgDatoUsuario";
                email.className="col-md-12 datoUsuario";
                email.appendChild(imgEmail);
                email.appendChild(txtEmail);
                divUsuario.appendChild(email);

                document.getElementById("listaUsuarios").appendChild(div);

            }
        }
    }
}