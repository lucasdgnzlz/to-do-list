/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import "jest-localstorage-mock";

import { guardarTareasEnLocalStorage, cargarTareasDeLocalStorage, actualizarDatosTareaGuardada, eliminarTareaDeLocalStorage, eliminarTodasLasTareasDeLocalStorage } from "../to-do-list";
import listasTareas3Fixture from "../../../cypress/fixtures/listasTareas3.fixture";
import listasTareas4Fixture from "../../../cypress/fixtures/listasTareas4.fixture";
import listasTareas5Fixture from "../../../cypress/fixtures/listasTareas5.fixture";

describe("guardarTareasEnLocalStorage", () => {
	afterEach(() => {
		eliminarTodasLasTareasDeLocalStorage();
	});

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

describe("cargarTareasDeLocalStorage", () => {
	afterEach(() => {
		eliminarTodasLasTareasDeLocalStorage();
	});

	it("Debería devolver un error al llamar a la función con un parámetro undefined", () => {
		const parametroDePrueba = undefined;

		expect(() => {
			cargarTareasDeLocalStorage(parametroDePrueba);
		}).toThrow(new Error ("Se necesita el nombre de la data que se requiere para cargar la misma"));
	});

	it("Debería devolver un error al cargar los datos y que el resultado sea null", () => {
		const parametroDePrueba = "tareasGuardadass";

		expect(() => {
			cargarTareasDeLocalStorage(parametroDePrueba);
		}).toThrow(new Error (`La data ${parametroDePrueba} no se encontro en el localStorage`));
	});

	it("Debería cargar correctamente la data guardada en localStorage", () => {
		document.body.innerHTML = listasTareas3Fixture;
		const CONTEXTO_TAREA = "nueva tarea";
		const NOMBRE_TAREA = "Hacer ejercicio";

		const dataARecibir = [{"tarea": {"clasesTarea": {"0": "tarea", "1": "tarea-pendiente"}, "nombreTarea": "Hacer ejercicio"}}];
		const dataABuscar = "tareasGuardadas";

		guardarTareasEnLocalStorage(CONTEXTO_TAREA, NOMBRE_TAREA);
		expect(cargarTareasDeLocalStorage(dataABuscar)).toEqual(dataARecibir);
	});
});

describe("actualizarDatosTareaGuardada", () => {
	beforeEach(() => {
		eliminarTodasLasTareasDeLocalStorage();
	});

	it("Actualiza datos de las tareas guardadas en localStorage", () => {
		document.body.innerHTML = listasTareas3Fixture;

		const CONTEXTO_TAREA = "nueva tarea";
		const NOMBRE_TAREA = "Hacer ejercicio";
		guardarTareasEnLocalStorage(CONTEXTO_TAREA, NOMBRE_TAREA);

		const nombreTareaActualizada = "Hacer ejercicio";
		document.body.innerHTML = listasTareas4Fixture;

		actualizarDatosTareaGuardada(nombreTareaActualizada);

		const tareaActualizada = [{"tarea": {"clasesTarea": {"0": "tarea", "1": "tarea-pendiente", "2": "prioridad-3"}, "nombreTarea": "Hacer ejercicio"}}];
		const DATA_A_BUSCAR = "tareasGuardadas";

		expect(JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`))).toEqual(tareaActualizada);
	});
});

describe("eliminarTareaDeLocalStorage", () => {
	beforeEach(() => {
		eliminarTodasLasTareasDeLocalStorage();
	});

	afterEach(() => {
		eliminarTodasLasTareasDeLocalStorage();
	});

	it("Elimina una tarea específica de localStorage", () => {
		document.body.innerHTML = listasTareas3Fixture;

		const CONTEXTO_TAREA = "nueva tarea";
		const NOMBRE_TAREA = "Hacer ejercicio";
		guardarTareasEnLocalStorage(CONTEXTO_TAREA, NOMBRE_TAREA);

		const tareaARecibir = [{"tarea": {"clasesTarea": {"0": "tarea", "1": "tarea-pendiente"}, "nombreTarea": "Hacer ejercicio"}}];
		const DATA_A_BUSCAR = "tareasGuardadas";
		expect(JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`))).toEqual(tareaARecibir);

		const $tareaSeleccionada = document.querySelector(".tarea");
		eliminarTareaDeLocalStorage($tareaSeleccionada);
		expect(JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`))).toEqual([]);
	});
});

describe("eliminarTodasLasTareasDeLocalStorage", () => {
	it("", () => {
		document.body.innerHTML = listasTareas5Fixture;

		const CONTEXTO_PRIMER_TAREA = "nueva tarea";
		const NOMBRE_PRIMER_TAREA = "Hacer ejercicio";
		guardarTareasEnLocalStorage(CONTEXTO_PRIMER_TAREA, NOMBRE_PRIMER_TAREA);

		const CONTEXTO_SEGUNDA_TAREA = "nueva tarea";
		const NOMBRE_SEGUNDA_TAREA = "Pasear al perro";
		guardarTareasEnLocalStorage(CONTEXTO_SEGUNDA_TAREA, NOMBRE_SEGUNDA_TAREA);

		const tareaARecibir = [{"tarea": {"clasesTarea": {"0": "tarea", "1": "tarea-pendiente"}, "nombreTarea": "Hacer ejercicio"}}, {"tarea": {"clasesTarea": {"0": "tarea", "1": "tarea-pendiente"}, "nombreTarea": "Pasear al perro"}}];
		const DATA_A_BUSCAR = "tareasGuardadas";

		expect(JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`))).toEqual(tareaARecibir);
		eliminarTodasLasTareasDeLocalStorage();
		expect(JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`))).toEqual([]);
	});
});
