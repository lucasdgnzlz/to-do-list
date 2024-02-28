/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import "jest-localstorage-mock";

import { guardarTareasEnLocalStorage, cargarTareasDeLocalStorage, actualizarDatosTareaGuardada, eliminarTareaDeLocalStorage, eliminarTodasLasTareasDeLocalStorage } from "../to-do-list";
import listasTareas1Fixture from "../../../cypress/fixtures/listasTareas1.fixture";
import listasTareas3Fixture from "../../../cypress/fixtures/listasTareas3.fixture";

describe("guardarTareasEnLocalStorage", () => {
	it("Prueba guardar datos de una nueva tarea en localStorage", () => {
		document.body.innerHTML = listasTareas3Fixture;
		const CONTEXTO_TAREA = "nueva tarea";
		const NOMBRE_TAREA = "Hacer ejercicio";

		const datosAComparar = [{tarea: {nombreTarea: "Hacer ejercicio", clasesTarea: {"0": "tarea", "1": "tarea-pendiente"}}}];
		const NOMBRE_KEY_DATOS_LOCAL_STORAGE = "tareasGuardadas";


		guardarTareasEnLocalStorage(CONTEXTO_TAREA, NOMBRE_TAREA);
		expect(JSON.parse(localStorage.getItem(NOMBRE_KEY_DATOS_LOCAL_STORAGE))).toEqual(datosAComparar);
		localStorage.clear();
	});
});
