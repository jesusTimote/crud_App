const FormCiudad = document.getElementById("Ciudad");
let tabla = document.getElementById("table");

let agregar = [];

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
        localStorage.setItem("usuario", JSON.stringify(agregar));
    }
    ListCity() {
        tabla.innerHTML = "";
        let arrayLista = JSON.parse(localStorage.getItem("usuario"));
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
                      <td><a class='btn btn-success' style='margin-left:12px' title='Editar'><i class='fas fa-edit'></i><a/> |
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
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));
    
    let Eliminado = arrayLista.findIndex((e) => e.codigo === codigo);
    if (Eliminado !== -1) {
        arrayLista.splice(Eliminado, 1);
      
        console.log("eliminado")
        localStorage.setItem("usuario", JSON.stringify(arrayLista));
        const City = new Ciudad();
        City.ListCity();
    }

    
}