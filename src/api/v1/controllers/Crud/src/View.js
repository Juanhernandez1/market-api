// * retorna un areglo donde cada item en un único objeto para la vista
function ObjVista(data, Where) {
  const vista = [];
  data.forEach(element => {
    const objetopadre = { ...element };
    const result = {};
    Object.keys(objetopadre).forEach(valuep => {
      if (typeof objetopadre[valuep] === "object") {
        const objetohijo = { ...objetopadre[valuep] };
        Object.keys(objetohijo).forEach(valueh => {
          result[valueh] = objetohijo[valueh];
        });
      } else if (Where.indexOf(valuep) < 1) {
        result[valuep] = objetopadre[valuep];
      }
    });
    vista.push(result);
  });
  return vista;
}

function View(data, Where, include) {
  let dataVista;
  let contaObj = 0;
  // * Ciclo para crear un solo objeto por registro y no tenes objetos anidados
  do {
    if (include !== null) {
      dataVista = ObjVista(data, Where);
    }
    const objPrueba = { ...dataVista[0] };
    let contador2 = 0;
    Object.keys(objPrueba).forEach(propieda => {
      if (typeof objPrueba[propieda] === "object") {
        contador2 += 1;
      }
    });
    contaObj = contador2;
  } while (contaObj !== 0);

  return dataVista;
}

module.exports = View;
