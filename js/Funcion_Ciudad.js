let agregar = [];
const FormCiudad = document.getElementById("Ciudad");
const btnCiudad = document.getElementById("boton");
let tabla = document.getElementById("table");
const btnActualiza=document.getElementById("Actualiza");
const btnCancelar=document.getElementById("Cancela");

/*=================METODO GUARDAR==================*/

const Guardar = () => {
  let codigo = document.getElementById("codigo").value;
  let ciudad = document.getElementById("ciudad").value;

  const Datos = {
    codigo,
    ciudad,
  };

  if (agregar === null) {
    agregar = [];
    console.log(agregar);
  }

  if (codigo == "" || ciudad == "") {
    alert("completar todos los campos");
  } else {
    agregar.push(Datos);
    console.log(agregar);
    localStorage.setItem("usuario", JSON.stringify(agregar));
    listar();
  }
};

/*=================METODO LISTAR==================*/

const listar = () => {
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
                <td><buttom onclick=Editar('${lista.codigo}') type='button' class='btn btn-success'><i class='fas fa-edit'></i></buttom> | <buttom type='button' onclick=Eliminar('${lista.codigo}')  class='btn btn-danger'><i class=' fas fa-trash-alt'></i></buttom></td>
            </tr>`;
    }
  }
};
document.addEventListener("DOMContentLoaded", listar);

const busca = document.getElementById("buscar");

/*=================METODO FILTRAR==================*/

busca.addEventListener("keyup", () => {
  tabla.innerHTML = "";
  let arrayLista = JSON.parse(localStorage.getItem("usuario"));
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

/*=================METODO ELIMINAR==================*/

const Eliminar = (codigo) => {
  let arrayLista = JSON.parse(localStorage.getItem("usuario"));

  let Eliminado = arrayLista.findIndex((e) => e.codigo === codigo);
  if (Eliminado !== -1) {
    arrayLista.splice(Eliminado, 1);
    localStorage.setItem("usuario", JSON.stringify(arrayLista));

    listar();
  }
};

/*=================METODO EDITAR==================*/
const Editar = (codigo) => {
  let arrayLista = JSON.parse(localStorage.getItem("usuario"));
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
  let arrayLista = JSON.parse(localStorage.getItem("usuario"));
  let codi = document.getElementById("codi").value;

  let codigo = document.getElementById("codigo").value;
  let ciudad = document.getElementById("ciudad").value;

  arrayLista[codi].codigo = codigo;
  arrayLista[codi].ciudad = ciudad;
  localStorage.setItem("usuario", JSON.stringify(arrayLista));
  listar();
  FormCiudad.reset();

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


/*================= FORMULARIO==================*/
FormCiudad.addEventListener("submit", (e) => {
  Guardar();

  FormCiudad.reset();
  e.preventDefault();
});

/*
tabla.innerHTML += `
            <tr>
                <td> # </td>
                <td>${lista.codigo}</td>
                <td>${lista.ciudad}</td>
                <td><a class='btn btn-success' onclick=Editar('
                ${lista.codigo} ') style='margin-left:12px' title='Editar'><i class='fas fa-edit'></i><a/>  <a class='btn btn-danger' onclick=Eliminar('
                ${lista.codigo}')><i class='fas fa-trash-alt'></i><a/></td>
            </tr>`;
*/
