
function of_generaPDF (){              
    html2canvas(document.querySelector("#reportedash"))
    .then(canvas => {
        var imgn = canvas.toDataURL("image/png");                     
        var doc = new jsPDF({
                orientation: 'portrait',                          
                size: 'letter'
            });          
        //doc.fromHTML($("#edoctaImg").get(0), 10, 10); //Convierte a PDF desde un elemento HTML.                
        doc.addImage(imgn, 'JPEG', 0, 3, 210, 100);  //coord: x=1, y=5, width=210, height=100
        doc.save('reporte_dashboard.pdf');
    })
  }