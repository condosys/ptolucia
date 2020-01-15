//export {datoschartpie, datoschartarea};

/*let datoschartpie = [70,20,10];
let datoschartarea = [100000, 100000, 200000, 150000, 100000, 1300000, 1500000, 2500000, 2000000, 300000, 2500000, 1500000];
let panoramaxmes = ['100,000', '100,000', '200,000', '1,500,000', '1,300,000', '1,400,000', '1,500,000', '2,500,000', '2,000,000', '300,000', '2,500,000', '1,500,000'];
let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let porcentaje = [5, 5, 10, 60, 65, 70, 75, 125, 100, 15, 125, 75];

let datoscxc = {
    mes: "Diciembre",
    cxcmes: "1,500,000",
    cxcmespresup: "2,000,000",
    cxcmesporciento: "75",     
    anio:"2019",
    cxcanioacum: "22,500,000",
    cxcaniopresup: "25,000,000",
    cxcanioporciento: "90",
  };*/


let datoschartpie = [70,20,10];
let datos = {
  importes: [100000, 100000, 200000, 150000, 100000, 1300000, 1500000, 2500000, 2000000, 300000, 2500000, 1500000],
  panoramaxmes: ['100,000', '100,000', '200,000', '1,500,000', '1,300,000', '1,400,000', '1,500,000', '2,500,000', '2,000,000', '300,000', '2,500,000', '1,500,000'],
  meses: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  porcentaje: [5, 5, 10, 60, 65, 70, 75, 125, 100, 15, 125, 75],
  datoscxc: {
    mes: "Diciembre",
    cxcmes: "1,500,000",
    cxcmespresup: "2,000,000",
    cxcmesporcentaje: "75",     
    anio:"2019",
    cxcanioacum: "22,500,000",
    cxcaniopresup: "25,000,000",
    cxcanioporcentaje: "90",
  }
}

//Se hace Exportable la función ex_... para que despache el arreglo de datos solicitado por parámetro.
export function ex_dataprovider(param){
  switch (param) {
    case "chartpie":
      return datoschartpie;      
      break;
    case "datos":
      return datos;
      break;
    default:
      break;
  }
}
