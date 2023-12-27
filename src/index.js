// Evento flip del botón agregar tarea
const $botonAgregarTarea = document.querySelector("#boton-agregar-tarea");

function agregaEventoBoton(){
	$botonAgregarTarea.classList.add("fa-flip");

	setTimeout(() => {
		$botonAgregarTarea.classList.remove("fa-flip");
	}, 1000);
}
// Evento flip del botón agregar tarea

// Agrega tareas al apretar el botón correspondiente //

$botonAgregarTarea.addEventListener(("click"), () => {
	agregaEventoBoton();

	const tituloNuevaTarea = document.querySelector("#entrada-nueva-tarea").value;
	const listaALaQueAgregarTarea = "lista-tareas-pendientes";
	const contextoTarea = "nueva tarea";

	const error = validarTituloNuevaTarea(tituloNuevaTarea);

	if(error !== "") {
		mostrarErrorTituloTarea(error);
		return false;
	} else {
		agregarNuevaTarea(listaALaQueAgregarTarea, tituloNuevaTarea);
		guardarTareasEnLocalStorage(contextoTarea, tituloNuevaTarea);
		borrarErrorTituloTarea();
	}
});

function agregarNuevaTarea(listaALaQueAgregarTarea, tituloNuevaTarea) {
	const $listaTareas = document.querySelector(`.${listaALaQueAgregarTarea}`);

	const nuevaTarea = document.createElement("li");
	nuevaTarea.className = "tarea tarea-pendiente";

	const nuevoContenedorEstado = document.createElement("div");
	nuevoContenedorEstado.className = "contenedor-estado-tarea";

	const nuevoEstadoTarea = document.createElement("input");
	nuevoEstadoTarea.className = "form-check-input estado-tarea";
	nuevoEstadoTarea.type = "checkbox";
	nuevoEstadoTarea.id = "flexCheckDefault";

	if(listaALaQueAgregarTarea === "lista-tareas-completas") {
		nuevoEstadoTarea.checked = true;
	}

	const nuevoTituloTarea = document.createElement("p");
	nuevoTituloTarea.className = "nombre-tarea";
	nuevoTituloTarea.textContent = tituloNuevaTarea;

	const nuevoContenedorOpciones = document.createElement("div");
	nuevoContenedorOpciones.className = "contenedor-opciones-tarea";

	const nuevoBotonOpciones = document.createElement("button");
	nuevoBotonOpciones.className = "boton-opciones-tarea";
	nuevoBotonOpciones.type="button dropdown-toggle";
	nuevoBotonOpciones.setAttribute("data-bs-toggle", "dropdown");

	const nuevoIconoBoton = document.createElement("i");
	nuevoIconoBoton.className = "fa-solid fa-ellipsis icono-opciones-tareas";

	const nuevaListaOpciones = document.createElement("ul");
	nuevaListaOpciones.className = "dropdown-menu";

	const nuevaOpcionPrioridadTres = document.createElement("li");
	nuevaOpcionPrioridadTres.className = "bloque-opciones-tareas";

	const nuevaPrioridadTres = document.createElement("div");
	nuevaPrioridadTres.className = "opciones-tareas opcion-prioridad-3";
	nuevaPrioridadTres.textContent = "Prioridad: 3";

	const nuevaOpcionPrioridadDos = document.createElement("li");
	nuevaOpcionPrioridadDos.className = "bloque-opciones-tareas";

	const nuevaPrioridadDos = document.createElement("div");
	nuevaPrioridadDos.className = "opciones-tareas opcion-prioridad-2";
	nuevaPrioridadDos.textContent = "Prioridad: 2";

	const nuevaOpcionPrioridadUno = document.createElement("li");
	nuevaOpcionPrioridadUno.className = "bloque-opciones-tareas";

	const nuevaPrioridadUno = document.createElement("div");
	nuevaPrioridadUno.className = "opciones-tareas opcion-prioridad-1";
	nuevaPrioridadUno.textContent = "Prioridad: 1";

	const nuevoBloqueEliminarTarea = document.createElement("li");
	nuevoBloqueEliminarTarea.className = "bloque-opciones-tareas";

	const nuevoContenedorBorrarTarea = document.createElement("div");
	nuevoContenedorBorrarTarea.className = "bloque-borrar-tarea";
	
	const nuevoIconoBorrarTarea = document.createElement("i");
	nuevoIconoBorrarTarea.className = "fa-regular fa-trash-can borrar-tarea";

	const nuevoTextoBorrarTarea = document.createElement("div");
	nuevoTextoBorrarTarea.className = "opciones-tareas borrar-tarea";
	nuevoTextoBorrarTarea.textContent = "Eliminar tarea";

	nuevoContenedorEstado.appendChild(nuevoEstadoTarea);
	nuevoContenedorEstado.appendChild(nuevoTituloTarea);
	nuevaTarea.appendChild(nuevoContenedorEstado);

	nuevoBotonOpciones.appendChild(nuevoIconoBoton);
	nuevaOpcionPrioridadTres.appendChild(nuevaPrioridadTres);
	nuevaOpcionPrioridadDos.appendChild(nuevaPrioridadDos);
	nuevaOpcionPrioridadUno.appendChild(nuevaPrioridadUno);
	nuevoContenedorBorrarTarea.appendChild(nuevoIconoBorrarTarea);
	nuevoContenedorBorrarTarea.appendChild(nuevoTextoBorrarTarea);
	nuevoBloqueEliminarTarea.appendChild(nuevoContenedorBorrarTarea);
	
	nuevaListaOpciones.appendChild(nuevaOpcionPrioridadTres);
	nuevaListaOpciones.appendChild(nuevaOpcionPrioridadDos);
	nuevaListaOpciones.appendChild(nuevaOpcionPrioridadUno);
	nuevaListaOpciones.appendChild(nuevoBloqueEliminarTarea);

	nuevoContenedorOpciones.appendChild(nuevoBotonOpciones);
	nuevoContenedorOpciones.appendChild(nuevaListaOpciones);
	nuevaTarea.appendChild(nuevoContenedorOpciones);

	$listaTareas.appendChild(nuevaTarea);
}

function validarTituloNuevaTarea(tituloNuevaTarea){
	const regex = /^(?! )[\w\s\-!@#$%^&*(),.?":{}|<>áéíóúÁÉÍÓÚüÜñÑ]+$/;

	if(tituloNuevaTarea === "") {
		return "La tarea debe tener un nombre";
	} else if(!regex.test(tituloNuevaTarea)) {
		return "El nombre de la tarea no es válido";
	}	else {
		return "";
	}
}

// Agrega tareas al apretar el botón correspondiente //

function mostrarErrorTituloTarea(error){
	const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
	$entradaTitulo.classList.add("is-invalid");

	const $contenedorMensajeError = document.querySelector(".contenedor-mensaje-error");
	$contenedorMensajeError.id = "";

	const $mensajeErrorTituloTarea = document.querySelector(".texto-error-titulo-tarea");
	$mensajeErrorTituloTarea.textContent = error;
}

function borrarErrorTituloTarea(){
	const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
	$entradaTitulo.classList.remove("is-invalid");

	const $contenedorMensajeError = document.querySelector(".contenedor-mensaje-error");
	$contenedorMensajeError.id = "oculto";
}

// Asigna funcionalidad a las opciones y completado de tareas//

const $contenedorTareas = document.querySelector(".lista-tareas-pendientes");

$contenedorTareas.addEventListener(("click"), (e) => {
	const $tareaSeleccionada = e.target.closest(".tarea");

	if(e.target.classList.contains("estado-tarea")) {
		gestionarTareaCompleta($tareaSeleccionada);
	} else {
		gestionarOpcionesDeLasTareas($tareaSeleccionada, e);
	}
});

const $contenedorTareasCompletas = document.querySelector(".lista-tareas-completas");

$contenedorTareasCompletas.addEventListener(("click"), (e) => {
	const $tareaSeleccionada = e.target.closest(".tarea");

	if(e.target.classList.contains("estado-tarea")) {
		gestionarTareaReiniciada(e, $tareaSeleccionada);
	} else {
		gestionarOpcionesDeLasTareas($tareaSeleccionada, e);
	}
});

function gestionarOpcionesDeLasTareas($tareaSeleccionada, e) {
	const nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;

	if(e.target.classList.contains("opcion-prioridad-3")){
		const nivelDePrioridad = "prioridad-3";
		agregarNivelDePrioridadATarea($tareaSeleccionada, nivelDePrioridad);
		cambiarColorNombreTareas($tareaSeleccionada);
		cambiarColorIconoOpcionesTareas($tareaSeleccionada);
		actualizarDatosTareaGuardada(nombreTarea);
	} else if(e.target.classList.contains("opcion-prioridad-2")){
		const nivelDePrioridad = "prioridad-2";
		agregarNivelDePrioridadATarea($tareaSeleccionada, nivelDePrioridad);
		cambiarColorNombreTareas($tareaSeleccionada);
		cambiarColorIconoOpcionesTareas($tareaSeleccionada);
		actualizarDatosTareaGuardada(nombreTarea);
	} else if(e.target.classList.contains("opcion-prioridad-1")){
		const nivelDePrioridad = "prioridad-1";
		agregarNivelDePrioridadATarea($tareaSeleccionada, nivelDePrioridad);
		cambiarColorNombreTareas($tareaSeleccionada);
		cambiarColorIconoOpcionesTareas($tareaSeleccionada);
		actualizarDatosTareaGuardada(nombreTarea);
	} else if(e.target.classList.contains("borrar-tarea")) {
		borrarTarea($tareaSeleccionada);
	} else {
		return false;
	}
}

function agregarNivelDePrioridadATarea($tareaSeleccionada, nivelDePrioridad) {
	if($tareaSeleccionada.classList.contains("prioridad-3")) {
		$tareaSeleccionada.classList.remove("prioridad-3");
		$tareaSeleccionada.classList.add(nivelDePrioridad);
	} else if($tareaSeleccionada.classList.contains("prioridad-2")) {
		$tareaSeleccionada.classList.remove("prioridad-2");
		$tareaSeleccionada.classList.add(nivelDePrioridad);
	} else if($tareaSeleccionada.classList.contains("prioridad-1")) {
		$tareaSeleccionada.classList.remove("prioridad-1");
		$tareaSeleccionada.classList.add(nivelDePrioridad);
	} else{
		$tareaSeleccionada.classList.add(nivelDePrioridad);
	}
}

function cambiarColorNombreTareas($tareaSeleccionada) {
	const $nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea");

	if($tareaSeleccionada.classList.contains("prioridad-3")) {
		$nombreTarea.style.color = "#fff";
	} else if($tareaSeleccionada.classList.contains("prioridad-2")) {
		$nombreTarea.style.color = "#fff";
	} else if($tareaSeleccionada.classList.contains("prioridad-1")) {
		$nombreTarea.style.color = "#808080";
	}
}

function cambiarColorIconoOpcionesTareas($tareaSeleccionada) {
	const $iconoOpcionesTarea = $tareaSeleccionada.querySelector(".icono-opciones-tareas");

	if($tareaSeleccionada.classList.contains("prioridad-3")) {
		$iconoOpcionesTarea.style.color = "#fff";
	} else if($tareaSeleccionada.classList.contains("prioridad-2")) {
		$iconoOpcionesTarea.style.color = "#fff";
	} else if($tareaSeleccionada.classList.contains("prioridad-1")) {
		$iconoOpcionesTarea.style.color = "#808080";
	}
}

function borrarTarea($tareaSeleccionada) {
	$tareaSeleccionada.parentNode.removeChild($tareaSeleccionada);
}

// Funcionalidad al completar tarea //

function gestionarTareaCompleta($tareaSeleccionada) {
	const listaALaQueAgregarTarea = "lista-tareas-completas";
	const nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;

	agregarNuevaTarea(listaALaQueAgregarTarea, nombreTarea);
	agregarMismasClasesATareaNueva(listaALaQueAgregarTarea, $tareaSeleccionada);
	borrarTarea($tareaSeleccionada);
	actualizarDatosTareaGuardada(nombreTarea);
}

function agregarMismasClasesATareaNueva(contextoLista, $tareaSeleccionada) {
	let $tareaNueva;

	const clasesTareaOriginal = $tareaSeleccionada.classList;
	let listaClasesTareaActualizada = "";
	
	clasesTareaOriginal.forEach((clase) => {
		if(!(clase === "tarea-pendiente" || clase === "tarea-completa")) {
			listaClasesTareaActualizada += `${clase} `;
		}
	});

	if(contextoLista === "lista-tareas-completas"){
		const $listaTareasCompletas = document.querySelector(".lista-tareas-completas");
		$tareaNueva = $listaTareasCompletas.querySelector(".tarea");

		listaClasesTareaActualizada += "tarea-completa";
		$tareaNueva.classList = listaClasesTareaActualizada;
	} else if(contextoLista === "lista-tareas-pendientes"){
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		$tareaNueva = $listaTareasPendientes.querySelector(".tarea");

		listaClasesTareaActualizada += "tarea-pendiente";
		$tareaNueva.classList = listaClasesTareaActualizada;
	}

	cambiarColorNombreTareas($tareaNueva);
	cambiarColorIconoOpcionesTareas($tareaNueva);
}

// Funcionalidad al reiniciar tarea //

function gestionarTareaReiniciada(e, $tareaSeleccionada){
	const listaALaQueAgregarTarea = "lista-tareas-pendientes";
	const nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;
	
	agregarNuevaTarea(listaALaQueAgregarTarea, nombreTarea);
	agregarMismasClasesATareaNueva(listaALaQueAgregarTarea, $tareaSeleccionada);
	borrarTarea($tareaSeleccionada);
}

// Funcionalidad cambio de listas //

const $opcionesListasDeTareas = document.querySelectorAll(".texto-opcion");

$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
	$opcionListaTarea.addEventListener(("click"), (e) => {
		const listaSeleccionada = (e.target).textContent;
		gestionarCambioDeLista(listaSeleccionada);
	});
});

function gestionarCambioDeLista (listaSeleccionada) {
	if(listaSeleccionada === "Pendientes") {
		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "";

		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "oculto";
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else if(listaSeleccionada === "Completas"){
		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "";

		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "oculto";
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else if(listaSeleccionada === "Total") {
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "";

		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "oculto";
		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	}
}

function mostrarListaActiva(listaSeleccionada) {
	const $opcionesListasDeTareas = document.querySelectorAll(".texto-opcion");
	
	$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
		if($opcionListaTarea.classList.contains("opcion-activa")) {
			$opcionListaTarea.classList.remove("opcion-activa");
		}
	});

	$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
		if($opcionListaTarea.textContent === listaSeleccionada) {
			$opcionListaTarea.classList.add("opcion-activa");
		}
	});
}

const $botonVaciarListasTareas = document.querySelector(".opcion-vaciar-listas");

$botonVaciarListasTareas.addEventListener(("click"), () => {
	const $totalDeTareas = document.querySelectorAll(".tarea");

	$totalDeTareas.forEach(($tarea) => {
		borrarTarea($tarea);
	});
});

// Funcionalidad localStorage //

let tareasGuardadasEnLocalStorage = [];

function guardarTareasEnLocalStorage(contextoTarea, nombreTarea){	
	if(contextoTarea !== "nueva tarea"){
		localStorage.setItem("tareasGuardadas", JSON.stringify(tareasGuardadasEnLocalStorage));
	} else{
		const $tareas = document.querySelectorAll(".tarea");

		$tareas.forEach((tarea, i) => {
			let tituloTarea = tarea.querySelector(".nombre-tarea").textContent;

			if(tituloTarea === nombreTarea){
				const nombreKey = `tarea_${i + 1}`;
				const informacionTareaAGuardar = {
					[nombreKey]: {
						"nombreTarea": nombreTarea,
						"clasesTarea": tarea.classList,
					}
				};
				tareasGuardadasEnLocalStorage.push(informacionTareaAGuardar);

				localStorage.setItem("tareasGuardadas", JSON.stringify(tareasGuardadasEnLocalStorage));
			}
		});
	}
}

function cargarTareasDeLocalStorage(DATA_A_BUSCAR){
	if(DATA_A_BUSCAR === undefined){
		throw new Error("Se necesita el nombre de la data que se requiere para cargar la misma");
	}
	
	const tareasGuardadas = JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`));

	if(tareasGuardadas === null) {
		throw new Error(`La data ${DATA_A_BUSCAR} no se encontro en el localStorage`);
	}

	return tareasGuardadas;
}

function actualizarDatosTareaGuardada(nombreTareaActualizada){	
	const contextoTarea = "actualización de tarea";

	tareasGuardadasEnLocalStorage.forEach((tareaEnLista, i) => {
		const nombreTareaEnLista = Object.keys(tareaEnLista)[0];
		const nombreTareaEspecifica = tareaEnLista[`tarea_${i + 1}`]["nombreTarea"];
		const $tareas = document.querySelectorAll(".tarea");

		if(nombreTareaEnLista === `tarea_${i + 1}`) {

			if(nombreTareaEspecifica === nombreTareaActualizada){
				const nombreKey = `tarea_${i + 1}`;
				const tareaActualizada = {
					[nombreKey]: {
						"nombreTarea": nombreTareaActualizada,
						"clasesTarea": $tareas[i].classList
					}
				};

				tareasGuardadasEnLocalStorage[i] = tareaActualizada;
			}	
		}
	});

	guardarTareasEnLocalStorage(contextoTarea, nombreTareaActualizada);
}

// Funcionalidad al iniciar la página //

function iniciarPagina() {
	const DATA_A_BUSCAR = ["tareasGuardadas"];

	try{
		const tareasGuardadas = cargarTareasDeLocalStorage(DATA_A_BUSCAR);
		enlistarTareasGuardadas(tareasGuardadas);
		mostrarTareasGuardadasEnLocalStorage(tareasGuardadasEnLocalStorage);
	} catch(e) {
		return console.error(e);
	}
}
iniciarPagina();
