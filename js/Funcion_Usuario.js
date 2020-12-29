const FormUsuarios = document.getElementById("FormUsuarios");
let agregar = [];
let comboCiudad = document.getElementById("ComboCiudad");
let comboProfesion = document.getElementById("Profesion");
let comboEstado = document.getElementById("Estado");

let btnGuardar = document.getElementById("Guardar");
let btnActualizar = document.getElementById("Actualizar");



const GuardarDatos = () => {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.
        getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const correo = document.getElementById("correo").value;
    const cboCiudad = comboCiudad.options[comboCiudad.selectedIndex].value;
    const cboProfesion =
        comboProfesion.options[comboProfesion.selectedIndex].value;
    const cboEstado = comboEstado.options[comboEstado.selectedIndex].value;
    const rbtnHombre = document.getElementById("rbtnHombre");
    const rbtnMujer = document.getElementById("rbtnMujer");

    let rbtnOpcion = "";

    if (rbtnHombre.checked) {
        rbtnOpcion = "Hombre";
    } else if (rbtnMujer.checked) {
        rbtnOpcion = "Mujer";
    }

    const Datos = {
        codigo,
        nombre,
        apellido,
        direccion,
        correo,
        cboCiudad,
        cboProfesion,
        cboEstado,
        rbtnOpcion,
    };

    if (agregar === null) {
        agregar = [];
    }
    agregar.push(Datos);

    localStorage.setItem("usuario", JSON.stringify(agregar));
    listar();
};

const listar = () => {
    $(document).ready(function () {
        let arrayLista = JSON.parse(localStorage.getItem("usuario"));
        agregar = arrayLista;
        $("#example").DataTable({
            processing: true,
            destroy: true,
            data: arrayLista,
            columns: [
                {
                    data: null,
                    render(data, type, full, number) {
                        return number.row + 1;
                    },
                },
                { data: "codigo" },
                { data: "nombre" },
                { data: "apellido" },
                { data: "direccion" },
                { data: "correo" },
                { data: "cboCiudad" },
                { data: "cboProfesion" },
                { data: "cboEstado" },
                { data: "rbtnOpcion" },
                {
                    data: "codigo",
                    render(data) {
                        return (
                            "<a class='btn btn-success' onclick=Editar('" +
                            data +
                            "')  title='Editar'><i class='fas fa-edit'></i><a/>  <a class='btn btn-danger' onclick=Eliminar('" +
                            data +
                            "')><i class='fas fa-trash-alt'></i><a/>"
                        );
                    },
                },
            ],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
            }
        });
    });
};

document.addEventListener("DOMContentLoaded", listar);

const Eliminar = (codigo) => {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));

    let elimina = arrayLista.findIndex(e => e.codigo === codigo)
    // console.log(elimina)
    if (elimina != -1) {
        arrayLista.splice(elimina, 1)
        console.log(arrayLista)
        localStorage.setItem("usuario", JSON.stringify(arrayLista));
        listar();
    }

}

const Editar = (codigo) => {
    let arrayLista = JSON.parse(localStorage.getItem("usuario"));

   
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let direccion = document.getElementById("direccion");
    let correo = document.getElementById("correo");
     let cboCiudad = comboCiudad.options[comboCiudad.selectedIndex];
     let cboProfesion =comboProfesion.options[comboProfesion.selectedIndex];
     let cboEstado = comboEstado.options[comboEstado.selectedIndex];
     let rbtnHombre = document.getElementById("rbtnHombre");
     let rbtnMujer = document.getElementById("rbtnMujer");

     let codigos = document.getElementById("codigo");

    let Edit = arrayLista.find(e => e.codigo == codigo);
    let Select = arrayLista.findIndex(e => e.codigo === codigo);
 
    btnActualizar.style.visibility = "hidden";
    btnGuardar.style.display = "block";

   codigos.value=Select;
  // codigos.value= Edit.codigo
   nombre.value= Edit.nombre
   apellido.value= Edit.apellido
   direccion.value= Edit.direccion
   correo.value= Edit.correo
   cboCiudad.text=Edit.cboCiudad
   cboProfesion.text=Edit.cboProfesion
   cboEstado.text=Edit.cboEstado
  
   let rbtnOpcion = "";

   if (rbtnHombre.checked) {
       rbtnOpcion = "Hombre";
   } else  {
       rbtnOpcion = "Mujer";
   }
   rbtnHombre.checked=Edit.rbtnOpcion
   rbtnMujer.checked=Edit.rbtnOpcion

   btnGuardar.style.display = "none";
   btnActualizar.style.visibility = "visible";
}

const Modificar=()=>{

    let arrayLista=JSON.parse(localStorage.getItem("usuario"))
    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.
        getElementById("apellido").value;
        let direccion = document.getElementById("direccion").value;
        let correo = document.getElementById("correo").value;
        let cboCiudad = comboCiudad.options[comboCiudad.selectedIndex].value;
        let cboProfesion =
        comboProfesion.options[comboProfesion.selectedIndex].value;
        let cboEstado = comboEstado.options[comboEstado.selectedIndex].value;
        let rbtnHombre = document.getElementById("rbtnHombre");
        let rbtnMujer = document.getElementById("rbtnMujer");

        let codigo = document.getElementById("codigo").value;
    
        let rbtnOpcion = "";

        btnActualizar.style.visibility = "hidden";
        btnGuardar.style.display = "block";

    if (rbtnHombre.checked) {
        rbtnOpcion = "Hombre";
    } else if (rbtnMujer.checked) {
        rbtnOpcion = "Mujer";
    }
    //arrayLista[codigo].codigo=codigo
    arrayLista[codigo].nombre=nombre
    arrayLista[codigo].apellido=apellido
    arrayLista[codigo].direccion=direccion
    arrayLista[codigo].correo=correo
    arrayLista[codigo].cboCiudad=cboCiudad
    arrayLista[codigo].cboProfesion=cboProfesion
    arrayLista[codigo].cboEstado=cboEstado
    localStorage.setItem("usuario", JSON.stringify(arrayLista));
    FormUsuarios.reset();
    listar();
    



    


}

const Actualiza = (document.getElementById("Actualizar").onclick = Modificar);


const comboLista = () => {
    comboCiudad.innerHTML = "";
    let arrayLista = JSON.parse(localStorage.getItem("ciudad"));
    comboCiudad.innerHTML += `<option selected disabled>---- Eliga Ciudad ----</option>`;

    /*
          for(let i=0; i<arrayLista.length;i++){
              Convertir=JSON.stringify(arrayLista[i].ciudad)
              comillas=Convertir.replace(/["']/g, "");
              comboCiudad.innerHTML +=`<option value='${comillas}'>${comillas}</option>`;
      
          }
      */

    for (let lista of arrayLista) {
        comboCiudad.innerHTML += `<option value='${lista.ciudad}'>${lista.ciudad}</option>`;
    }
};
document.addEventListener("DOMContentLoaded", comboLista);

FormUsuarios.addEventListener("submit", (e) => {
    GuardarDatos();
    FormUsuarios.reset();
    e.preventDefault();
});
