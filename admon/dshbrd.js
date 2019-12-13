var contenido = document.querySelector("#detail");
var com_nombre =  document.querySelector("#com_nombre");
var com_titulo =  document.querySelector("#com_titulo");
var nomdepto =  document.querySelector("#nomdepto");
var clasmov =  document.querySelector("#clasmov");
var sdoinicial =  document.querySelector("#sdoinicial");
var totalcargos =  document.querySelector("#cargos");
var totalabonos =  document.querySelector("#abonos");
var sdofinal =  document.querySelector("#sdofinal");
var rep_balancegral = document.querySelector("#balancegral");
var rep_edoredos = document.querySelector("#edoredos");
var rep_balanza = document.querySelector("#balanza");
var rep_edocta = document.querySelector("#edocta");
var rep_regla = document.querySelector("#regla");
var rep_reglaevent = document.querySelector("#reglaevent");

var r_balance = document.querySelector("#r_balance");
var r_edores = document.querySelector("#r_edores");
var r_balanza = document.querySelector("#r_balanza");
var r_edocta = document.querySelector("#r_edocta");

var r_regla = document.querySelector("#r_reglamento");
var r_reglaevent = document.querySelector("#r_reglamento_eventos");
var i=0;
let arr_ctrls=[]; // = [r_balance,r_edores,r_balanza,r_edocta,r_regla,r_reglaevent]; //Esta línea NO funcionó. or eso se usan los PUSH siguientes.
    arr_ctrls.push(r_balance, r_edores, r_balanza, r_edocta, r_regla, r_reglaevent);

rep_balancegral.addEventListener("click", function(e){                
    mostrar_reportes(1);
})
rep_edoredos.addEventListener("click", function(e){                
    mostrar_reportes(2);
})
rep_balanza.addEventListener("click", function(e){                
    mostrar_reportes(3);
})
rep_edocta.addEventListener("click", function(e){                
    mostrar_reportes(4);
})
rep_regla.addEventListener("click", function(e){                
    mostrar_reportes(5);
})
rep_reglaevent.addEventListener("click", function(e){                
    mostrar_reportes(6);
})

function mostrar_reportes (rep){
    //Todos los controles se hacen INVISIBLES.
    for(ctrl of arr_ctrls){
        ctrl.classList.add('invisible');
    }
    //Se hace VISIBLE el indicado en el parámetro. El -1 es porque el indice del arreglo inicia en CERO.
    arr_ctrls[rep - 1].classList.remove('invisible');


    /*if (rep == 1){
        r_balance.classList.remove('invisible');
        r_edores.classList.add('invisible');
        r_balanza.classList.add('invisible');
        r_edocta.classList.add('invisible');
        r_regla.classList.add('invisible');
        r_reglaevent.classList.add('invisible');
    }
    if (rep == 2){
        r_balance.classList.add('invisible');
        r_edores.classList.remove('invisible');
        r_balanza.classList.add('invisible');
        r_edocta.classList.add('invisible');
        r_regla.classList.add('invisible');
        r_reglaevent.classList.add('invisible');
    }
    if (rep == 3){
        r_balance.classList.add('invisible');
        r_edores.classList.add('invisible');
        r_balanza.classList.remove('invisible');
        r_edocta.classList.add('invisible');
        r_regla.classList.add('invisible');
        r_reglaevent.classList.add('invisible');
    }
    if (rep == 4){
        r_balance.classList.add('invisible');
        r_edores.classList.add('invisible');
        r_balanza.classList.add('invisible');
        r_edocta.classList.remove('invisible');
        r_regla.classList.add('invisible');
        r_reglaevent.classList.add('invisible');
    }
    if (rep == 5){
        r_balance.classList.add('invisible');
        r_edores.classList.add('invisible');
        r_balanza.classList.add('invisible');
        r_edocta.classList.add('invisible');
        r_regla.classList.remove('invisible');
        r_reglaevent.classList.add('invisible');
    }
    if (rep == 6){
        r_balance.classList.add('invisible');
        r_edores.classList.add('invisible');
        r_balanza.classList.add('invisible');
        r_edocta.classList.add('invisible');
        r_regla.classList.add('invisible');
        r_reglaevent.classList.remove('invisible');
    }  */
    
}

function traerdatos() {
    fetch ("edocta304.json")
    .then (res => res.json())
    .then (datos => {

        for (let llave of datos.reporte){
            com_nombre.innerHTML = ''
            com_titulo.innerHTML = ''
            nomdepto.innerHTML = ''
            clasmov.innerHTML = ''
            sdoinicial.innerHTML = ''
            totalcargos.innerHTML = ''
            totalabonos.innerHTML = ''
            sdofinal.innerHTML = ''
            
            //Antes validaba al 304; Pero se harán pruebas con el 101 en la reunión con el COMINTÉ 2019-10-29.
            if (llave.id == 101){
                com_nombre.innerHTML = `${datos.reporte[i].edocta.header.com_nombre}`
                com_titulo.innerHTML = `${datos.reporte[i].edocta.header.com_titulo}`
                nomdepto.innerHTML = `${datos.reporte[i].edocta.header.idsoc} - ${datos.reporte[i].edocta.header.nomsoc}`
                clasmov.innerHTML = `Movimientos de <strong>${datos.reporte[i].edocta.header.descclasmov}</strong>`
                sdoinicial.innerHTML = `${datos.reporte[i].edocta.header.sdoini}`
                totalcargos.innerHTML = `${datos.reporte[i].edocta.header.com_totalcargos}`
                totalabonos.innerHTML = `${datos.reporte[i].edocta.header.com_totalabonos}`
                sdofinal.innerHTML = `${datos.reporte[i].edocta.header.sdoinigral}`

                //console.log(datos.reporte[i].edocta.detail);
                of_detalle(datos.reporte[i].edocta.detail, totalcargos, totalabonos);
            }
            i++;
        }
        // console.log(datos.reporte[0].edocta.detail);
        // pintadatos(datos.reporte[0].edocta.detail);
        //pintadatos(datos.reporte["0"].edocta["0"].detail);
    })
    }

function of_detalle(datos, totalcargos, totalabonos){
    contenido.innerHTML = ''

    for (let valor of datos){
    detail.innerHTML += `
    <tr> 
        <!-- <th scope="row">${valor.fechmov}</th> -->
        <td>${valor.fechmov}</td>
        <td>${valor.idcta}</td>
        <td>${valor.com_concepto}</td>
        <td>${valor.com_referencia}</td>
        <td>${valor.com_recibo}</td>
        <td class="text-right">${valor.com_cargo}</td>
        <td class="text-right">${valor.com_abono}</td>
        <td class="text-right">${valor.sdoparcial}</td>
        </tr>            
    `
    }
    //Al terminar el CICLO, agrega el último renglón para los TOTALES.
    detail.innerHTML += `
    <tr class="bg-secondary text-white"  style="background -color: rgb(0,120,100)">                    
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><strong>TOTAL</strong></td>
        <td class="text-right"><strong>${totalcargos.innerHTML}</strong></td>
        <td class="text-right"><strong>${totalabonos.innerHTML}</strong></td>
        <td class="text-right"></td>
        </tr>            
    `
}

function of_generaPDF (){              
    html2canvas(document.querySelector("#edocta"))
    .then(canvas => {
        var imgn = canvas.toDataURL("image/png");                     
        var doc = new jsPDF({
                orientation: 'portrait',                          
                size: 'letter'
            });
        
        //doc.fromHTML($("#edoctaImg").get(0), 10, 10); //Convierte a PDF desde un elemento HTML.                
        doc.addImage(imgn, 'JPEG', 0, 3, 210, 100);  //coord: x=1, y=5, width=210, height=100
        doc.save('EstadoDeCuenta.pdf');
    });
    
    /*

    html2canvas(document.querySelector("#edocta"))
    .then(canvas => {
        var imgn = canvas.toDataURL("image/png"); 
        //var doc = new jsPDF('1','pt','letter',true);
        var doc = new jsPDF({
                orientation: 'portrait',                          
                size: 'letter'
            })
        doc.addImage(imgn,'JPEG',1,5); //coordenadas x=1, y=5.
        doc.save('EdoCta.pdf');
        //document.body.appendChild(canvas)  //Agrega al BODY la imagen capturada. 
        //document.querySelector("#capturaimagen").appendChild(canvas); //Agrega al DIV la imagen capturada.                   
        //document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");  //Agrega una clase al <H1>.
        //document.getElementsByTagName("canvas")[0].setAttribute("id", "edoctaImg"); //Agrega un ID a la etiqueta <CANVAS>.
        //document.getElementsByTagName("canvas")[0].setAttribute("style", "width:750px; height:440px"); //Agrega CSS.
    });  */
}

