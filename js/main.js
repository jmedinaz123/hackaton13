const CardContenedor=document.querySelector('.contenedorCard');
const ModalCerrar=document.querySelector('.modalContenedorCerrar');
const ModalEdit=document.querySelector('.modalContenedorEdit');
const ModalCrear=document.querySelector('.modalContenedorCrear');

initApp();
function initApp(){
    CardContenedor.addEventListener('click', accionesCard)
}

function accionesCard(e){
    if(e.target.classList.contains('card-icono-imgCerrar')){
        let card=e.target.parentElement.parentElement;
        ModalCerrar.classList.remove('ocultarModalCerrar');
        accionesModelCerrar(card);
                   }
    if(e.target.classList.contains('card-icono-imgEdit')){
        let card=e.target.parentElement.parentElement;
        
        ModalEdit.classList.remove('ocultarModalEdit');
        accionesModalEditar(card);
                    }
if(e.target.classList.contains('letraCard--agregar')){
        let cardContenedor=e.target.parentElement.parentElement;
        ModalCrear.classList.remove('ocultarModalCrear');
        accionesModalCrear(cardContenedor);
                     }
                       }   
function accionesModalCrear(cardContenedor){
    ModalCrear.addEventListener('click', (e)=>{

        //Cerrar el modal de editar
        if(e.target.classList.contains('modalCrear-btn--Cancelar')||
            e.target.classList.contains('modalCrear-imgX')||
            e.target.classList.contains('modalContenedorCrear')){
            cerrarModal();
                    }
        //Aceptar el modal
        if(e.target.classList.contains('modalCrear-btn--Aceptar')){
            let modalCrearArg=e.target.parentElement.parentElement;

            btnmodalCrearProcesar(modalCrearArg)
        }
})

}

function accionesModalEditar(card){
    colocarDatosAlForomulario(card)
    ModalEdit.addEventListener('click', (e)=>{

        //Cerrar el modal de editar
        if(e.target.classList.contains('modalEdit-btn--Cancelar')||
            e.target.classList.contains('modalEdit-imgX')||
            e.target.classList.contains('modalContenedorEdit')){
            cerrarModal();
                    }
        //Aceptar el modal
        if(e.target.classList.contains('modalEdit-btn--Aceptar')){
            let modalEditar=e.target.parentElement.parentElement;
            procesarCambio(modalEditar, card)
        }


    })
}
function procesarCambio(modalEditar, card){

    const obtenerInfIngresado={
        nombre: modalEditar.querySelector(".modalEdit-secForm-formNombre").value,
        apellido: modalEditar.querySelector(".modalEdit-secForm-formApellido").value,
        correo: modalEditar.querySelector(".modalEdit-secForm-formCorreo").value,
        telefono: modalEditar.querySelector(".modalEdit-secForm-formTelef").value,
        pais: modalEditar.querySelector(".modalEdit-secForm-formPais").value,
        imgURL:modalEditar.querySelector(".modalEdit-secForm-formUrl"),
        about: modalEditar.querySelector(".modalEdit-secForm-formTxtArea").value
    }
    
    card.querySelector(".letraCard--Nombre").textContent=obtenerInfIngresado.nombre
    card.querySelector(".letraCard--Apellido").textContent=obtenerInfIngresado.apellido
    card.querySelector(".letraCard--Telf").textContent=obtenerInfIngresado.telefono
    card.querySelector(".letraCard--Corr").textContent=obtenerInfIngresado.correo
    card.querySelector(".letraCard--Pais").textContent=obtenerInfIngresado.pais
    card.querySelector(".letraCard--About").textContent=obtenerInfIngresado.about
    
    console.log(obtenerInfIngresado.imgURL.files[0])
    
    
    if(obtenerInfIngresado.imgURL.files[0]==undefined){

    }else {
        let imagenNueva
        imagenNueva=URL.createObjectURL(obtenerInfIngresado.imgURL.files[0])
        //card.querySelector(".card-img-principal").setAttribute('src',`${imagenNueva}`)
        
        card.querySelector(".card-fotoContenedor").innerHTML=`
        <img class="card-img " src="${imagenNueva}" alt="">
       
        `
    }
 
    cerrarModal();
   
}

function colocarDatosAlForomulario(card){
    const info = {
        nombre : card.querySelector('.letraCard--Nombre').textContent,
        apellido : card.querySelector('.letraCard--Apellido').textContent,
        telefono : card.querySelector('.letraCard--Telf').textContent,
        correo : card.querySelector('.letraCard--Corr').textContent,
        pais : card.querySelector('.letraCard--Pais').textContent,
        about : card.querySelector('.letraCard--About').textContent,
        url:card.querySelector('.card-img').src
     }

    let indiceLista; 
    PaisObtenido=info.pais
    switch(PaisObtenido){
       case PaisObtenido=='Perú': indiceLista=0;break;
       case PaisObtenido=='Venezuela': indiceLista=1;break;
       case PaisObtenido=='Argentina': indiceLista=2;break;
       case PaisObtenido=='Brasil': indiceLista=3;break;
       case PaisObtenido=='Argentina': indiceLista=4;break;
       default: indiceLista=5
    }
    ModalEdit.querySelector(".modalEdit-secForm-formNombre").value=info.nombre
    ModalEdit.querySelector(".modalEdit-secForm-formApellido").value=info.apellido
    ModalEdit.querySelector(".modalEdit-secForm-formCorreo").value=info.correo
    ModalEdit.querySelector(".modalEdit-secForm-formTelef").value=info.telefono
    ModalEdit.querySelector(".modalEdit-secForm-formPais").selectedIndex=indiceLista
    
    ModalEdit.querySelector(".modalEdit-secForm-formTxtArea").value=info.about
   

}


function accionesModelCerrar(card){
   
    ModalCerrar.addEventListener('click', (e)=>{
        if(e.target.classList.contains('modalCerrar-btn--Cancelar')||
            e.target.classList.contains('modalCerrar-imgX')||
            e.target.classList.contains('modalContenedorCerrar')){
            cerrarModal();
                    }   
        if(e.target.classList.contains('modalCerrar-btn--Aceptar')){
                    card.remove();
                    cerrarModal();
                        }
    }
    )
} 

function cerrarModal(){
    const modal1=document.querySelector('.modalContenedorCerrar')
    modal1.classList.add('ocultarModalCerrar')
    const modal2=document.querySelector('.modalContenedorEdit')
    modal2.classList.add('ocultarModalEdit')
    const modal3=document.querySelector('.modalContenedorCrear')
    modal3.classList.add('ocultarModalCrear')
        }



function resetearValoresDelModal(modalEditar){
    modalEditar.querySelector(".modalEdit-secForm-formNombre").value=""
    modalEditar.querySelector(".modalEdit-secForm-formApellido").value=""
    modalEditar.querySelector(".modalEdit-secForm-formCorreo").value=""
    modalEditar.querySelector(".modalEdit-secForm-formTelef").value=""
    modalEditar.querySelector(".modalEdit-secForm-formPais").value=""
    modalEditar.querySelector(".modalEdit-secForm-formTxtArea").value=""
        }


function btnmodalCrearProcesar(modalCrear){
const obtenerInfIngresado={
    nombre: modalCrear.querySelector(".modalCrear-secForm-formNombre").value,
    apellido: modalCrear.querySelector(".modalCrear-secForm-formApellido").value,
    correo: modalCrear.querySelector(".modalCrear-secForm-formCorreo").value,
    telefono: modalCrear.querySelector(".modalCrear-secForm-formTelef").value,
    pais: modalCrear.querySelector(".modalCrear-secForm-formPais").value,
    imgURL:modalCrear.querySelector(".modalCrear-secForm-formUrl"),
    about: modalCrear.querySelector(".modalCrear-secForm-formTxtArea").value
            }
    //Crear nuevo card
    let imagenNueva

    if(obtenerInfIngresado.imgURL.files[0]==undefined){
        imagenNueva=""
    }else {
        imagenNueva=URL.createObjectURL(obtenerInfIngresado.imgURL.files[0])
        
    }
    const template=document.createElement('div')
        template.innerHTML=`
            <div class="card">
            <div class="icono icono--left">
                <img class="icono-img card-icono-imgEdit" src="img/edit.png" alt="">
                <p class="letraCard letraCard--icono">Edit</p>
            </div>
            <div class="icono icono--right">
                <img class="icono-img card-icono-imgCerrar" src="img/delete.svg" alt="">
                <p class="letraCard letraCard--icono">Delete</p>
            </div>
            <div class="card-fotoContenedor">
                <img class="card-img " src="${imagenNueva}" alt="">

            </div>
            
            <div class="card-contenido">
                <p class="letraCard">
                    <span class="letraCard--Nombre">${obtenerInfIngresado.nombre}</span>   
                    <span class="letraCard--Apellido">${obtenerInfIngresado.apellido}</span>
                    
                </p>
                <p class="letraCard">
                    <span class="letraCard--Telf">${obtenerInfIngresado.telefono}</span>
                    |
                    <span class="letraCard--Corr">${obtenerInfIngresado.correo}</span> 
                </p>
                <p class="letraCard letraCard--Pais">${obtenerInfIngresado.pais}</p>
                <P class="letraCard letraCard--About">${obtenerInfIngresado.about}</P>
            </div>
        </div>
            `
    CardContenedor.appendChild(template)
    cerrarModal();
        }