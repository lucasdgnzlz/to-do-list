/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { agregarNuevaTarea, mostrarErrorTituloTarea, borrarErrorTituloTarea, gestionarOpcionesDeLasTareas, borrarTarea, gestionarTareaCompleta, gestionarTareaReiniciada, recrearTareasGuardadas, comprobarRepeticionDeTareas } from "../tareas";
import listasTareas1Fixture from "../../../cypress/fixtures/listasTareas1.fixture";

describe("agregarNuevaTarea", () => {
	beforeEach(() => {
		document.body.innerHTML = listasTareas1Fixture;
	});

	it("Agrega nueva tarea pendiente con título específico", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";

		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);

		expect($listaTareasPendientes.children.length).toBe(1);
	});

	it("Agrega una tarea completa a su respectiva lista", () => {
		const LISTA_SELECCIONADA = "lista-tareas-completas";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";

		const $listaTareasCompletas = document.querySelector(".lista-tareas-completas");
		expect($listaTareasCompletas.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);

		expect($listaTareasCompletas.children.length).toBe(1);
	});
});
