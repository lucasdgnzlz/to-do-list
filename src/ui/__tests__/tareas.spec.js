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

describe("mostrarErrorTituloTarea", () => {
	it("Debería mostrar el error en el título al querer agregar una tarea", () => {
		document.body.innerHTML = listasTareas1Fixture;

		const $textoErrorTituloTarea = document.querySelector(".texto-error-titulo-tarea");
		expect($textoErrorTituloTarea.textContent).toBe("");
		const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
		expect($entradaTitulo.classList.contains("is-invalid")).toBe(false);

		const ERROR_TITULO = "El nombre de la tarea no es válido";
		mostrarErrorTituloTarea(ERROR_TITULO);

		expect($textoErrorTituloTarea.textContent).toBe("El nombre de la tarea no es válido");
		expect($entradaTitulo.classList.contains("is-invalid")).toBe(true);
	});
});

describe("borrarErrorTituloTarea", () => {
	it("Deja de mostrar el error del titulo de una nueva tarea", () => {
		document.body.innerHTML = listasTareas1Fixture;

		const $textoErrorTituloTarea = document.querySelector(".texto-error-titulo-tarea");
		expect($textoErrorTituloTarea.textContent).toBe("");
		const $entradaTitulo = document.querySelector("#entrada-nueva-tarea");
		expect($entradaTitulo.classList.contains("is-invalid")).toBe(false);

		const ERROR_TITULO = "El nombre de la tarea no es válido";
		mostrarErrorTituloTarea(ERROR_TITULO);

		expect($textoErrorTituloTarea.textContent).toBe("El nombre de la tarea no es válido");
		expect($entradaTitulo.classList.contains("is-invalid")).toBe(true);

		borrarErrorTituloTarea();
		expect($textoErrorTituloTarea.textContent).toBe("");
		expect($entradaTitulo.classList.contains("is-invalid")).toBe(false);
	});
});
