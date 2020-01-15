
var detalle = document.querySelector("#detail");
var com_nombre =  document.querySelector("#com_nombre");
var com_titulo =  document.querySelector("#com_titulo");
var nomdepto =  document.querySelector("#nomdepto");
var clasmov =  document.querySelector("#clasmov");
var sdoinicial =  document.querySelector("#sdoinicial");
var totalcargos =  document.querySelector("#cargos");
var totalabonos =  document.querySelector("#abonos");
var sdofinal =  document.querySelector("#sdofinal");

var m_dash = document.querySelector("#dash");
var m_balancegral = document.querySelector("#balancegral");
var m_edoredos = document.querySelector("#edoredos");
var m_balanza = document.querySelector("#balanza");
var m_edocta = document.querySelector("#edocta");
var m_regla = document.querySelector("#regla");
var m_reglaevent = document.querySelector("#reglaevent");

var r_dash = document.querySelector("#reportedash");
var r_balance = document.querySelector("#r_balance");
var r_edores = document.querySelector("#r_edores");
var r_balanza = document.querySelector("#r_balanza");
var r_edocta = document.querySelector("#r_edocta");

var r_regla = document.querySelector("#r_reglamento");
var r_reglaevent = document.querySelector("#r_reglamento_eventos");
let tab_particular = document.querySelector("#particular-tab");
let tab_mantto = document.querySelector("#mantto-tab");
var i=0;
let arr_ctrls=[]; // = [r_balance,r_edores,r_balanza,r_edocta,r_regla,r_reglaevent]; //Esta línea NO funcionó. or eso se usan los PUSH siguientes.
    arr_ctrls.push(r_balance, r_edores, r_balanza, r_edocta, r_regla, r_reglaevent, r_dash);

m_balancegral.addEventListener("click", function(e){                
    mostrar_reportes(1);
})
m_edoredos.addEventListener("click", function(e){                
    mostrar_reportes(2);
})
m_balanza.addEventListener("click", function(e){                
    mostrar_reportes(3);
})
m_edocta.addEventListener("click", function(e){                
    mostrar_reportes(4);
    //Dependiendo del tab que esté "activo" se carga el estado de cuenta.
    if(tab_particular.classList.contains("active")){
        traerdatos(1); //1=Particulares (Carga el Edocta.Particulares)
    }else{
        traerdatos(2); //1=Particulares (Carga el Edocta.Particulares)
    }
    
})
m_regla.addEventListener("click", function(e){                
    mostrar_reportes(5);
})
m_reglaevent.addEventListener("click", function(e){                
    mostrar_reportes(6);
})
m_dash.addEventListener("click", function(e){                
    mostrar_reportes(7);
})
tab_particular.addEventListener("click", function(e){                
    traerdatos(1); //1=Particulares
})
tab_mantto.addEventListener("click", function(e){                
    traerdatos(2); //2=Mantenimiento
})

function mostrar_reportes (rep){
    //Todos los controles se hacen INVISIBLES.
    for(let ctrl of arr_ctrls){
        ctrl.classList.add('invisible');
    }
    //Se hace VISIBLE el indicado en el parámetro. El -1 es porque el indice del arreglo inicia en CERO.
    arr_ctrls[rep - 1].classList.remove('invisible');
    
}

function traerdatos(opc) {
    let tipo_reporte='';
    if(opc==1){tipo_reporte="./reps/304part.json"};
    if(opc==2){tipo_reporte="./reps/304mantto.json"};

    fetch (tipo_reporte)
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


                //of_detalle(datos.reporte[i].edocta.detail, totalcargos, totalabonos);
                //...Línea anterior provoca error al llamarse por segunda vez la función traerDatos()...
                //dshbrd.js:156 Uncaught (in promise) TypeError: Cannot read property 'edocta' of undefined
                of_detalle(llave.edocta.detail, totalcargos, totalabonos); //Lo óptimo es usar "llave".
            }
            //i++;  //SE USÓ para leer "datos.reporte[i]", pero daba error de la línea 156. Es más óptimo usar "llave".
        }
        
    })
}

function of_detalle(datos, totalcargos, totalabonos){
    let j=0;
    let clase_r='';
    detalle.innerHTML = ''

    for (let valor of datos){
        j++;
        if(j % 2 == 0){
            clase_r = 'table-primary';
        }else{
            clase_r = 'table-light';
        }

    detalle.innerHTML += `
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
    detalle.innerHTML += `
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

}

