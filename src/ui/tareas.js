import {actualizarDatosTareaGuardada, eliminarTareaDeLocalStorage} from "../storage/to-do-list.js";

export function agregarNuevaTarea(listaALaQueAgregarTarea, tituloNuevaTarea) {
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

export function mostrarErrorTituloTarea(error){
	const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
	$entradaTitulo.classList.add("is-invalid");

	const $contenedorMensajeError = document.querySelector(".contenedor-mensaje-error");
	$contenedorMensajeError.id = "";

	const $mensajeErrorTituloTarea = document.querySelector(".texto-error-titulo-tarea");
	$mensajeErrorTituloTarea.textContent = error;
}

export function borrarErrorTituloTarea(){
	const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
	$entradaTitulo.classList.remove("is-invalid");

	const $contenedorMensajeError = document.querySelector(".contenedor-mensaje-error");
	$contenedorMensajeError.id = "oculto";
}

export function gestionarOpcionesDeLasTareas($tareaSeleccionada, e) {
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
		eliminarTareaDeLocalStorage($tareaSeleccionada);
		actualizarDatosTareaGuardada(nombreTarea);
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

export function borrarTarea($tareaSeleccionada) {
	$tareaSeleccionada.parentNode.removeChild($tareaSeleccionada);
}

export function gestionarTareaCompleta($tareaSeleccionada) {
	const listaALaQueAgregarTarea = "lista-tareas-completas";
	const nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;

	agregarNuevaTarea(listaALaQueAgregarTarea, nombreTarea);
	agregarMismasClasesATareaNueva(listaALaQueAgregarTarea, $tareaSeleccionada);
	borrarTarea($tareaSeleccionada);
	actualizarDatosTareaGuardada(nombreTarea);
}

function agregarMismasClasesATareaNueva(contextoLista, $tareaSeleccionada) {
	const nombreTareaAnterior = ($tareaSeleccionada.querySelector(".nombre-tarea")).textContent;
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
		const $tareasCompletas = $listaTareasCompletas.querySelectorAll(".tarea");

		$tareasCompletas.forEach(($tarea) => {
			const nombreTareaCompleta = ($tarea.querySelector(".nombre-tarea")).textContent;

			if(nombreTareaAnterior === nombreTareaCompleta){
				$tareaNueva = $tarea;
			}
		});

		listaClasesTareaActualizada += "tarea-completa";
		$tareaNueva.classList = listaClasesTareaActualizada;
	} else if(contextoLista === "lista-tareas-pendientes"){
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		const $tareasPendientes = $listaTareasPendientes.querySelectorAll(".tarea");

		$tareasPendientes.forEach(($tarea) => {
			const nombreTareaPendiente = ($tarea.querySelector(".nombre-tarea")).textContent;

			if(nombreTareaAnterior === nombreTareaPendiente){
				$tareaNueva = $tarea;
			}
		});

		listaClasesTareaActualizada += "tarea-pendiente";
		$tareaNueva.classList = listaClasesTareaActualizada;
	}

	cambiarColorNombreTareas($tareaNueva);
	cambiarColorIconoOpcionesTareas($tareaNueva);
}

export function gestionarTareaReiniciada(e, $tareaSeleccionada){
	const listaALaQueAgregarTarea = "lista-tareas-pendientes";
	const nombreTarea = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;
	
	agregarNuevaTarea(listaALaQueAgregarTarea, nombreTarea);
	agregarMismasClasesATareaNueva(listaALaQueAgregarTarea, $tareaSeleccionada);
	borrarTarea($tareaSeleccionada);
	actualizarDatosTareaGuardada(nombreTarea);
}

export function recrearTareasGuardadas(listaALaQuePerteneceLaTareaGuardada, clasesTareaGuardada, nombreTareaGuardada){
	const $listaTareas = document.querySelector(`.${listaALaQuePerteneceLaTareaGuardada}`);

	const nuevaTarea = document.createElement("li");
	nuevaTarea.classList = clasesTareaGuardada;

	const nuevoContenedorEstado = document.createElement("div");
	nuevoContenedorEstado.className = "contenedor-estado-tarea";

	const nuevoEstadoTarea = document.createElement("input");
	nuevoEstadoTarea.className = "form-check-input estado-tarea";
	nuevoEstadoTarea.type = "checkbox";
	nuevoEstadoTarea.id = "flexCheckDefault";

	if(listaALaQuePerteneceLaTareaGuardada === "lista-tareas-completas") {
		nuevoEstadoTarea.checked = true;
	}

	const nuevoTituloTarea = document.createElement("p");
	nuevoTituloTarea.className = "nombre-tarea";
	nuevoTituloTarea.textContent = nombreTareaGuardada;

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

	cambiarColorNombreTareas(nuevaTarea);
	cambiarColorIconoOpcionesTareas(nuevaTarea);
}
