const opcionesmenu = document.querySelector("#opciones-menu");
const formulario = document.querySelector("#formulario");
const campodepto = document.querySelector("#depto");
const campopwd = document.querySelector("#pwd");
const btnSubmit = document.querySelector("#btnsubmit");
const ErrMsg = document.querySelector("#ErrMsg");
const nomCondo = document.querySelector("#nomCondo");
const barra = document.querySelector("#barra");
var llaveStorage ='';
var EnterAccionado = false;

campodepto.addEventListener("keypress", function(e){
    //console.log(e.keyCode, e.charCode, e.type, campodepto.tagName, campodepto.type, campodepto.getAttribute("setfocusnext"), e.currentTarget);
    /*if (e.keyCode == 13){of_setfocus(campodepto.getAttribute("setfocusnext"), true); }*/
    of_enter(e.keyCode, campodepto.getAttribute("setfocusnext"), true); //"getAttribute" Obtiene el valor del atributo personalizado "setfocusnext".
    EnterAccionado = true; //Evita que el evento CLICK del botón ejecute su código.                
})

campopwd.addEventListener("keypress", function(e){                
    /*if (e.keyCode == 13){of_setfocus(campopwd.getAttribute("setfocusnext"), false); }*/
    of_enter(e.keyCode, campopwd.getAttribute("setfocusnext"), false); //"getAttribute" Obtiene el valor del atributo personalizado "setfocusnext".                
    EnterAccionado = true; //Evita que el evento CLICK del botón ejecute su código.               
})

btnSubmit.addEventListener("keypress", function(e){
    //console.log(EnterKeyTarget, EnterAccionado, e.type, e.target);                
    of_enter(e.keyCode, btnSubmit.id, false); 
    EnterAccionado = true; //Evita que el evento CLICK del botón ejecute su código.
    validacampos();
})

//El evento CLICK del botón simpre se dispara al presionar la tecla ENTER. Así que la bandera <EnterAccionado> lo controla.
btnSubmit.addEventListener("click", function(e){
    //Se ejecuta solo si NO se presionó la tecla ENTER para disparar el evento CLICK.
    if (!EnterAccionado) {
        //console.log(EnterAccionado, EnterKeyTarget, e.type, e.target);
        of_enter(e.keyCode, btnSubmit.id, false); 
        validacampos();
    }
    EnterAccionado = false; //La bandera regresa a FALSE, para que se reinicie la validación.                 
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //Evita que la página se refresque al presionar ENTER.
})

function traerdatos() {
    fetch ("torres.json")
    .then (res => res.json())
    .then (datos => {

        opcionesmenu.innerHTML = '<span class="dropdown-item-text ddwn-txt-encabezado">Elija una opción:</span>'

        for (let valor of datos){
        opcionesmenu.innerHTML += `
        <a class="dropdown-item" href="javascript:of_opcionmenu(${valor.id},'${valor.nombre}')">${valor.nombre}</a>
        <div role="separator" class="dropdown-divider"></div>
        ` 
        nomCondo.innerHTML = `${valor.condominio}`
        llaveStorage = valor.llavestorage;
        }
    })
}

function validarAcceso(){
    var usr = campodepto.value.trim();
    var pwd = campopwd.value.trim();
    var acceso = false;
    var cndmino = {id:'', nombre:'', log:false};

    fetch ("acceso.json")
    .then (res => res.json())
    .then (datos => {

        for (let valor of datos){
            if(valor.id == usr && valor.pwd == pwd){
                acceso = true;
                cndmino.id = usr; 
                cndmino.nombre = valor.nombre;
                cndmino.log = acceso;

                sessionStorage.setItem(llaveStorage, JSON.stringify(cndmino));                            
                formulario.classList.add("invisible");
                barra.classList.remove("invisible");
                setTimeout('window.location = "dashboard.html";',500);
            }
        }
        if(!acceso){
            //console.log("Usuario "+usr+" NO validado.");
            ErrMsg.innerHTML = 'Sus credenciales no son válidas. Intente nuevamente.';
            ErrMsg.classList.remove('invisible');
        }
    })
}

function of_opcionmenu(idtorre, nombretorre){
    var torre = document.querySelector("#torre");                
    //torre.value = idtorre;
    torre.value = nombretorre;
    of_setfocus(torre.getAttribute("setfocusnext"), true); //"getAttribute" Obtiene el valor del atributo personalizado "setfocusnext=#depto".
    //of_setfocus("#depto"); //Coloca el foco en el campo "Depto".
} 

function of_setfocus(campo, sel){
    document.querySelector("#"+campo).focus(); //Coloca el foco en el campo enviado por parámetro.
    if(sel){
        document.querySelector("#"+campo).select(); //Selecciona el texto, si existe algo capturado en el campo.
    }
}

function of_enter(tecla, siguiente, sel){   
    if (tecla == 13){
        of_setfocus(siguiente, sel);
    }
}

function validacampos(){
    var contElem = 0;
    for(let elemento of formulario.elements){                    
        if(elemento.tagName == 'INPUT' && (elemento.type == 'text' || elemento.type == 'password')){
            if(elemento.value == ''){   
                elemento.classList.add("campoVacio"); //Pinta de ROJO el campo vacío.
                ErrMsg.innerHTML = 'Favor de completar todos los datos.';
                ErrMsg.classList.remove("invisible"); //Hace visible en mensaje de error.                            
            } else {
                contElem++; //Cuenta los campos NO vacíos.
                elemento.classList.remove("campoVacio");
            }
        }
        elemento.focus(); //Dejará el foco en el último elemento, o sea el botón, para que los campos vacíos muestren su BORDE=ROJO.
    }
    if(contElem == 3){
        ErrMsg.classList.add("invisible"); //Si NO HAY campos vacíos, hace INVISIBLE el mensaje de error.
        validarAcceso();
    }
}