/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import "jest-localstorage-mock";

import { guardarTareasEnLocalStorage, cargarTareasDeLocalStorage, actualizarDatosTareaGuardada, eliminarTareaDeLocalStorage, eliminarTodasLasTareasDeLocalStorage } from "../to-do-list";
import listasTareas3Fixture from "../../../cypress/fixtures/listasTareas3.fixture";
import listasTareas4Fixture from "../../../cypress/fixtures/listasTareas4.fixture";

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

		localStorage.clear();
	});
});
