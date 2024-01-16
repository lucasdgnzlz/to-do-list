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
