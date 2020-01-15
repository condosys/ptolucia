
var contenido = document.querySelector("#detail");
var com_nombre =  document.querySelector("#com_nombre");
var com_titulo =  document.querySelector("#com_titulo");
var nomdepto =  document.querySelector("#nomdepto");
var clasmov =  document.querySelector("#clasmov");
var sdoinicial =  document.querySelector("#sdoinicial");
var totalcargos =  document.querySelector("#cargos");
var totalabonos =  document.querySelector("#abonos");
var sdofinal =  document.querySelector("#sdofinal");

var rep_dash = document.querySelector("#dash");
var rep_balancegral = document.querySelector("#balancegral");
var rep_edoredos = document.querySelector("#edoredos");
var rep_balanza = document.querySelector("#balanza");
var rep_edocta = document.querySelector("#edocta");
var rep_regla = document.querySelector("#regla");
var rep_reglaevent = document.querySelector("#reglaevent");

var r_dash = document.querySelector("#reportedash");
var r_balance = document.querySelector("#r_balance");
var r_edores = document.querySelector("#r_edores");
var r_balanza = document.querySelector("#r_balanza");
var r_edocta = document.querySelector("#r_edocta");

var r_regla = document.querySelector("#r_reglamento");
var r_reglaevent = document.querySelector("#r_reglamento_eventos");
var i=0;
let arr_ctrls=[]; 

arr_ctrls.push(r_balance, r_edores, r_balanza, r_edocta, r_regla, r_reglaevent, r_dash);

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
    traerdatos();
})
rep_regla.addEventListener("click", function(e){                
    mostrar_reportes(5);
})
rep_reglaevent.addEventListener("click", function(e){                
    mostrar_reportes(6);
})
rep_dash.addEventListener("click", function(e){                
    mostrar_reportes(7);
})

function mostrar_reportes (rep){
    //Todos los controles se hacen INVISIBLES.
    for(let ctrl of arr_ctrls){
        ctrl.classList.add('invisible');
    }
    //Se hace VISIBLE el indicado en el parámetro. El -1 es porque el indice del arreglo inicia en CERO.
    arr_ctrls[rep - 1].classList.remove('invisible');    
}

function traerdatos() {
    fetch ("../admon/edocta304.json")
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
            //console.log(llave);
            
            //Antes validaba al 304; Pero se harán pruebas con el 101 en la reunión con el COMINTÉ 2019-10-29.
            if (llave.id == 101){
                com_nombre.innerHTML = `${llave.edocta.header.com_nombre}`
                com_titulo.innerHTML = `${llave.edocta.header.com_titulo}`
                nomdepto.innerHTML = `${llave.edocta.header.idsoc} - ${llave.edocta.header.nomsoc}`
                clasmov.innerHTML = `Movimientos de <strong>${llave.edocta.header.descclasmov}</strong>`
                sdoinicial.innerHTML = `${llave.edocta.header.sdoini}`
                totalcargos.innerHTML = `${llave.edocta.header.com_totalcargos}`
                totalabonos.innerHTML = `${llave.edocta.header.com_totalabonos}`
                sdofinal.innerHTML = `${llave.edocta.header.sdoinigral}`

                of_detalle(llave.edocta.detail, totalcargos, totalabonos); //Lo óptimo es usar "llave".
            }
        }        
    })
}

function of_detalle(datos, totalcargos, totalabonos){
    let j=0;
    let clase_r='';
    contenido.innerHTML = ''

    for (let valor of datos){
        j++;
        if(j % 2 == 0){
            clase_r = 'table-primary';
        }else{
            clase_r = 'table-light';
        }

    detail.innerHTML += `
    <tr class="${clase_r}"> 
        <!-- <th scope="row">${valor.fechmov}</th> -->
        <td id="d_fecha">${valor.fechmov}</td>
        <td id="d_cuenta">${valor.idcta}</td>
        <td id="d_concepto">${valor.com_concepto}</td>
        <td id="d_ref">${valor.com_referencia}</td>
        <td id="d_recibo">${valor.com_recibo}</td>
        <td class="text-right">${valor.com_cargo}</td>
        <td class="text-right">${valor.com_abono}</td>
        <td class="text-right">${valor.sdoparcial}</td>
        </tr>            
    `
    }
    //Al terminar el CICLO, agrega el último renglón para los TOTALES.
    detail.innerHTML += `
    <tr class="bg-primary text-white"  style="background -color: r gb(0,150,50)">                    
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