
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
let partcontent = document.querySelector("#part-content");
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
    leeEdoCtaPart();
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



function leeEdoCtaPart() {
    fetch ("../admon/edocta304.json")
    .then (res => res.json())
    .then (datos => {

        for (let llave of datos.reporte){
            //console.log(llave);
            
            //Antes validaba al 304; Pero se harán pruebas con el 101 en la reunión con el COMINTÉ 2019-10-29.
            if (llave.id == 101){
                struct_edocta = `
            <div class="card bg-light border-primary text-dark" id="repcta">
                <div class="card-header border-primary pt-2 pb-1">
                    <h4 id="com_nombre" class="text-center">${llave.edocta.header.com_nombre}</h4>
                    <h6 id="com_titulo" class="text-center">${llave.edocta.header.com_titulo}</h6>
                </div> 
                <div class="card-body pt-2 pb-2">  
                    <div class="card-group"></div>
                        <div class="card border-primary">
                            <div class="card-body pb-0 pt-2 table-primary">
                                <h6 class="card-title" id="nomdepto">${llave.edocta.header.idsoc} - ${llave.edocta.header.nomsoc}</h6>
                                <h6 class="card-title" id="clasmov">Movimientos de <strong>${llave.edocta.header.descclasmov}</strong></h6>
                            </div>
                        </div> 
                        <div class="card border-primary">
                            <div class="card-body pb-0 pt-2 table-primary">
                                <table class="table table-sm table-borderless mb-1">
                                <thead>
                                    <tr class="text-dark"  style="font-size:1rem">
                                    <th class="text-right" scope="col">Saldo Inical</th>
                                    <th class="text-right" scope="col">Cargos</th>
                                    <th class="text-right" scope="col">Abonos</th>
                                    <th class="text-right pr-3" scope="col">Saldo Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-dark" style="font-size:1.1rem">
                                    <!--<th scope="row">1</th>-->
                                    <td id="sdoinicial" class="text-right">${llave.edocta.header.sdoini}</td>
                                    <td id="cargos" class="text-right">${llave.edocta.header.com_totalcargos}</td>
                                    <td id="abonos" class="text-right">${llave.edocta.header.com_totalabonos}</td>
                                    <td id="sdofinal" class="text-right pr-3">${llave.edocta.header.sdoinigral}</td>
                                    </tr>
                                </tbody>
                                </table>                        
                            </div>
                        </div>                  
                    </div>
                    <div class="table-responsive pt-2">
                        <table class="table table-striped bg-light table-sm mb-0">
                            <thead>
                                <tr class="bg-primary text-white" style="font-size: 1rem;">
                                <th id="h_fecha">Fecha</th>
                                <th id="h_cuenta">Cuenta</th>
                                <th id="h_concepto">Concepto</th>
                                <th id="h_ref">Referencia</th>
                                <th id="h_recibo">Recibo</th>
                                <th class="text-right">Cargos</th>
                                <th class="text-right">Abonos</th>
                                <th class="text-right">Saldo</th>
                                </tr>
                            </thead>
                            <tbody id="detail" class="text-dark"> `
                            of_detalle(llave.edocta.detail, llave.edocta.header.com_totalcargos,llave.edocta.header.com_totalabonos); //Lo óptimo es usar "llave".
            struct_edocta += `
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card-footer text-center border-primary pt-0 pb-0" style="font-size: 1rem">
                    <i>--- Fin del Reporte ---</i>
                </div>

            </div> `
            partcontent.innerHTML = struct_edocta;


                //com_nombre.innerHTML = `${llave.edocta.header.com_nombre}`
                //com_titulo.innerHTML = `${llave.edocta.header.com_titulo}`
                //nomdepto.innerHTML = `${llave.edocta.header.idsoc} - ${llave.edocta.header.nomsoc}`
                //clasmov.innerHTML = `Movimientos de <strong>${llave.edocta.header.descclasmov}</strong>`
                //sdoinicial.innerHTML = `${llave.edocta.header.sdoini}`
                //totalcargos.innerHTML = `${llave.edocta.header.com_totalcargos}`
                //totalabonos.innerHTML = `${llave.edocta.header.com_totalabonos}`
                //sdofinal.innerHTML = `${llave.edocta.header.sdoinigral}`

                //of_detalle(llave.edocta.detail, totalcargos, totalabonos); //Lo óptimo es usar "llave".
            }
        }        
    })
}

function of_detalle(datos, totalcargos, totalabonos){
    let j=0;
    let clase_r='';
    //contenido.innerHTML = ''

    for (let valor of datos){
        j++;
        if(j % 2 == 0){
            clase_r = 'table-primary';
        }else{
            clase_r = 'table-light';
        }

    struct_edocta += `
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
    struct_edocta += `
    <tr class="bg-primary text-white"  style="background -color: r gb(0,150,50)">                    
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><strong>TOTAL</strong></td>
        <td class="text-right"><strong>${totalcargos}</strong></td>
        <td class="text-right"><strong>${totalabonos}</strong></td>
        <td class="text-right"></td>
        </tr>            
    `
}