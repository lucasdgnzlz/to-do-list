import {activarEventoBoton} from "./ui/botonAgregarTarea.js";

import {agregarNuevaTarea, mostrarErrorTituloTarea, borrarErrorTituloTarea, gestionarOpcionesDeLasTareas, gestionarTareaCompleta, gestionarTareaReiniciada, borrarTarea, recrearTareasGuardadas} from "../src/ui/tareas.js";

import {gestionarCambioDeLista} from "./ui/listasTareas.js";

import {validarTituloNuevaTarea} from "./validaciones/validaciones.js";

import {guardarTareasEnLocalStorage, cargarTareasDeLocalStorage, tareasGuardadasEnLocalStorage, eliminarTodasLasTareasDeLocalStorage}  from "../src/storage/to-do-list.js";

const $botonAgregarTarea = document.querySelector("#boton-agregar-tarea");
const $contenedorTareasPendientes = document.querySelector(".lista-tareas-pendientes");
const $contenedorTareasCompletas = document.querySelector(".lista-tareas-completas");
const $opcionesListasDeTareas = document.querySelectorAll(".texto-opcion");
const $botonVaciarListasTareas = document.querySelector(".opcion-vaciar-listas");

$botonAgregarTarea.addEventListener(("click"), () => {
	activarEventoBoton($botonAgregarTarea);

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

$contenedorTareasPendientes.addEventListener(("click"), (e) => {
	const $tareaSeleccionada = e.target.closest(".tarea");

	if(e.target.classList.contains("estado-tarea")) {
		gestionarTareaCompleta($tareaSeleccionada);
	} else {
		gestionarOpcionesDeLasTareas($tareaSeleccionada, e);
	}
});

$contenedorTareasCompletas.addEventListener(("click"), (e) => {
	const $tareaSeleccionada = e.target.closest(".tarea");

	if(e.target.classList.contains("estado-tarea")) {
		gestionarTareaReiniciada(e, $tareaSeleccionada);
	} else {
		gestionarOpcionesDeLasTareas($tareaSeleccionada, e);
	}
});

$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
	$opcionListaTarea.addEventListener(("click"), (e) => {
		const listaSeleccionada = (e.target).textContent;
		gestionarCambioDeLista(listaSeleccionada);
	});
});

$botonVaciarListasTareas.addEventListener(("click"), () => {
	const $totalDeTareas = document.querySelectorAll(".tarea");

	$totalDeTareas.forEach(($tarea) => {
		borrarTarea($tarea);
	});

	eliminarTodasLasTareasDeLocalStorage();
});

function enlistarTareasGuardadas(dataTareas) {
	dataTareas.forEach((tarea) => {
		tareasGuardadasEnLocalStorage.push(tarea);
	});
}

function gestionarDataTareasGuardadas(dataTareas){
	dataTareas.forEach((tareaGuardada) => {
		const indicadorTarea = Object.keys(tareaGuardada)[0];
		const listaClasesTareaGuardada = tareaGuardada[indicadorTarea]["clasesTarea"];
		const keysClasesTareaGuardada = Object.keys(listaClasesTareaGuardada);
		const cantidadClasesTareaGuardada = keysClasesTareaGuardada.length;
		const nombreTareaGuardada = tareaGuardada[indicadorTarea]["nombreTarea"];
		let listaALaQuePerteneceLaTareaGuardada;
		let clasesTareaGuardada;

		for(let i = 0; i < cantidadClasesTareaGuardada; i++){
			if(clasesTareaGuardada === undefined){
				clasesTareaGuardada = `${listaClasesTareaGuardada[i]} `;
			} else{
				clasesTareaGuardada += `${listaClasesTareaGuardada[i]} `;
			}

			if(listaClasesTareaGuardada[i] === "tarea-pendiente"){
				listaALaQuePerteneceLaTareaGuardada = "lista-tareas-pendientes";
			} else if(listaClasesTareaGuardada[i] === "tarea-completa"){
				listaALaQuePerteneceLaTareaGuardada = "lista-tareas-completas";
			}
		}

		recrearTareasGuardadas(listaALaQuePerteneceLaTareaGuardada, clasesTareaGuardada, nombreTareaGuardada);
	});
}

function iniciarPagina() {
	const DATA_A_BUSCAR = ["tareasGuardadas"];

	try{
		const tareasGuardadas = cargarTareasDeLocalStorage(DATA_A_BUSCAR);
		enlistarTareasGuardadas(tareasGuardadas);
		gestionarDataTareasGuardadas(tareasGuardadas);
	} catch(e) {
		return console.error(e);
	}
}
iniciarPagina();
