import {ex_dataprovider} from "./demo/datosgraficas.js";

    let datos = ex_dataprovider("datos");
    feather.replace();  //Habilita los iconos usados en el side-menu.
  
    let idcxcmestit = document.querySelector("#idcxcmestit");
    let idcxcmes = document.querySelector("#idcxcmes");
    let idcxcmespresup = document.querySelector("#idcxcmespresup");
    let idcxcmesporciento = document.querySelector("#idcxcmesporciento");
    let idcxcmesprogress = document.querySelector("#idcxcmesprogress");

    let idcxcaniotit = document.querySelector("#idcxcaniotit");
    let idcxcanioacum = document.querySelector("#idcxcanioacum");
    let idcxcaniopresup = document.querySelector("#idcxcaniopresup");
    let idcxcanioporciento = document.querySelector("#idcxcanioporciento");
    let idcxcanioprogress = document.querySelector("#idcxcanioprogress");

    let idchartareatit = document.querySelector("#idchartareatit");
    let idchartpietit = document.querySelector("#idchartpietit");
    let idpanoramamentit = document.querySelector("#idpanoramamentit");
    let idpanoramamensual =  document.querySelector("#idpanoramamensual");
    
    idcxcmestit.innerHTML = `Cobranza de ${datos.datoscxc.mes}`;
    idcxcmes.innerHTML = `${datos.datoscxc.cxcmes}`;
    idcxcmespresup.innerHTML = `${datos.datoscxc.cxcmespresup}`;
    idcxcmesporciento.innerHTML = `${datos.datoscxc.cxcmesporcentaje}%`;
    idcxcmesprogress.setAttribute("style","width:" + `${datos.datoscxc.cxcmesporcentaje}%`);
    idcxcmesprogress.setAttribute("aria-valuenow",`${datos.datoscxc.cxcmesporcentaje}`);

    idcxcaniotit.innerHTML = `Cobranza Anual ${datos.datoscxc.anio}`;
    idcxcanioacum.innerHTML = `${datos.datoscxc.cxcanioacum}`;
    idcxcaniopresup.innerHTML = `${datos.datoscxc.cxcaniopresup}`;
    idcxcanioporciento.innerHTML = `${datos.datoscxc.cxcanioporcentaje}%`;
    idcxcanioprogress.setAttribute("style","width:" + `${datos.datoscxc.cxcanioporcentaje}%`);
    idcxcanioprogress.setAttribute("aria-valuenow",`${datos.datoscxc.cxcanioporcentaje}`);

    idchartareatit.innerHTML = `Panorama General Cobranza ${datos.datoscxc.anio}`;
    idchartpietit.innerHTML = `Ingresos ${datos.datoscxc.anio}`;
    
    idpanoramamentit.innerHTML = `Panorama Mensual Cobranza ${datos.datoscxc.anio}`;
    
    for (let i=0; i < datos.panoramaxmes.length; i++){
      let color_barra;

      if(datos.porcentaje[i] < 50){ color_barra = 'bg-danger'};
      if(datos.porcentaje[i] >= 50 && datos.porcentaje[i] < 75){ color_barra = 'bg-warning'};
      if(datos.porcentaje[i] >= 75 && datos.porcentaje[i] <= 100){ color_barra = 'bg-success'};
      if(datos.porcentaje[i] > 100){ color_barra = 'bg-info'};

      idpanoramamensual.innerHTML += `
      <h4 class="small font-weight-bold mb-0 pt-1">${datos.meses[i]}:  $${datos.panoramaxmes[i]} <span class="float-right">${datos.porcentaje[i]}%</span></h4>
      <div class="progress mb-2">
        <div class="progress-bar ${color_barra}" role="progressbar" style="width: ${datos.porcentaje[i]}%" aria-valuenow="${datos.porcentaje[i]}" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      `;
    }

    let reporte_dash = document.querySelector("#reporte_dash");

    reporte_dash.addEventListener("click", function(e){                
      of_generaReporte();
    })


    function of_generaReporte (){              
    html2canvas(document.querySelector("#reportedash"))
      .then(canvas => {
        var imgn = canvas.toDataURL("image/png");                     
        var doc = new jsPDF({
                orientation: 'portrait',                          
                size: 'letter'
            });          
        //doc.fromHTML($("#edoctaImg").get(0), 10, 10); //Convierte a PDF desde un elemento HTML.                
        doc.addImage(imgn, 'JPEG', 9, 15, 190, 210);  //coord: x=9, y=15, width=190, height=210
        doc.save('reporte_dashboard.pdf');
      })
    }
