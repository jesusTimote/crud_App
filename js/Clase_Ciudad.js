const FormCiudad = document.getElementById("Ciudad");
let tabla = document.getElementById("table");
let agregar = [];
const btnActualiza=document.getElementById("Actualiza");
const btnCancelar=document.getElementById("Cancela");
const btnCiudad = document.getElementById("boton");
const busca = document.getElementById("buscar");
/*====== CLASES DE LOGICA =====*/
class Ciudad {
    constructor(codigo, ciudad) {
        this.codigo = codigo;
        this.ciudad = ciudad;
    }

    AddCity(City) {
        if (agregar === null) {
            agregar = [];
            console.log(agregar);
        }
        agregar.push(City);
        console.log(agregar);
        localStorage.setItem("ciudad", JSON.stringify(agregar));
    }
    ListCity() {
        tabla.innerHTML = "";
        let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
        agregar = arrayLista;

        //tabla.innerHTML += '';
        if (arrayLista === null) {
            console.log("sin datos");
        } else {
            for (let lista of arrayLista) {
                tabla.innerHTML += `
                  <tr>
                      <td> # </td>
                      <td>${lista.codigo}</td>
                      <td>${lista.ciudad}</td>
                      <td><a class='btn btn-success'  onclick=UpdateCity('${lista.codigo}') title='Editar'><i class='fas fa-edit'></i><a/> |
                          <a class="btn btn-danger" id="DeleteCity" onclick=DeleteCity('${lista.codigo}') title='Eliminar'><i class='fas fa-trash-alt'></i><a/> </td>
                  </tr>`;

                ///<td><buttom onclick=Editar('${lista.codigo}') type='button' class='btn btn-success'><i class='fas fa-edit'></i></buttom> | <buttom type='button' onclick=DeleteCity('${lista.codigo}') class='btn btn-danger'><i class=' fas fa-trash-alt'></i></buttom></td>
            }
        }
        
    }
    
     /*
       DeleteCity(codigo) {
              let arrayLista = JSON.parse(localStorage.getItem("usuario"));
              console.log(codigo)
              let Eliminado = arrayLista.findIndex((e) => e.codigo === codigo);
              if (Eliminado !== -1) {
                  arrayLista.splice(Eliminado, 1);
                  localStorage.setItem("usuario", JSON.stringify(arrayLista));
      
      
              }
          }
      */
      
}



/*===============Event DOM al TRAE TODO LOS DATOS AL CARGAR==============*/
document.addEventListener("DOMContentLoaded", () => {
    const ui = new Ciudad();
    ui.ListCity();
   
});

/*===============Event DE BOTON AN GUARDAR==============*/

FormCiudad.addEventListener("submit", (e) => {
    let codigo = document.getElementById("codigo").value;
    let ciudad = document.getElementById("ciudad").value;

    const City = new Ciudad(codigo, ciudad);

    City.AddCity(City);
    City.ListCity();
    FormCiudad.reset();
    e.preventDefault();
});

const DeleteCity=(codigo)=>{
    let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
    
    let Eliminado = arrayLista.findIndex((e) => e.codigo === codigo);
    if (Eliminado !== -1) {
        arrayLista.splice(Eliminado, 1);
      
        console.log("eliminado")
        localStorage.setItem("ciudad", JSON.stringify(arrayLista));
        const City = new Ciudad();
        City.ListCity();
    }

    
}

const UpdateCity = (codigo) => {
    let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
    let codi = document.getElementById("codi");
  
    let cod = document.getElementById("codigo");
    let ciudad = document.getElementById("ciudad");
  
    let Busca = arrayLista.find((e) => e.codigo == codigo);
    let Modifica = arrayLista.findIndex((e) => e.codigo === codigo);
  
    codi.value = Modifica;
    cod.value = Busca.codigo;
    ciudad.value = Busca.ciudad;
  
    btnCiudad.style.display = "none";
    btnActualiza.style.visibility = "visible";
    btnCancelar.style.visibility = "visible";
  };
  
  const Modifica = () => {
    let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
    let codi = document.getElementById("codi").value;
  
    let codigo = document.getElementById("codigo").value;
    let ciudad = document.getElementById("ciudad").value;
  
    arrayLista[codi].codigo = codigo;
    arrayLista[codi].ciudad = ciudad;
    localStorage.setItem("ciudad", JSON.stringify(arrayLista));
    const City = new Ciudad();
    City.ListCity();
    FormCiudad.reset();
    btnCancelar.style.visibility = "hidden";
    btnActualiza.style.visibility = "hidden";
    btnCiudad.style.display = "block";
  };
  const Actualiza = (document.getElementById("Actualiza").onclick = Modifica);



  btnCancelar.addEventListener('click',(e)=>{
    FormCiudad.reset();
    e.preventDefault();
    btnActualiza.style.visibility = "hidden";
    btnCiudad.style.display = "block";
  
    btnCancelar.style.visibility = "hidden";
  })



  busca.addEventListener("keyup", () => {
    tabla.innerHTML = "";
    let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
    let IngresaMinuscula = busca.value.toLowerCase();
    for (lista of arrayLista) {
      let BuscaMinuscula = lista.ciudad.toLowerCase();
      if (BuscaMinuscula.indexOf(IngresaMinuscula) !== -1) {
        tabla.innerHTML += `
              <tr>
                  <td> # </td>
                  <td>${lista.codigo}</td>
                  <td>${lista.ciudad}</td>
                  <td><buttom onclick=Editar('${lista.codigo}') type='button' class='btn btn-success'><i class='fas fa-edit'></i></buttom> | <buttom type='button' onclick=Eliminar('${lista.codigo}')  class='btn btn-danger'><i class=' fas fa-trash-alt'></i></buttom></td>
              </tr>`;
      }
    }
  });