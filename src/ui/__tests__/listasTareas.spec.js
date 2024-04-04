/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { gestionarCambioDeLista } from "../listasTareas";
import listaTareasFixture1 from "../../../cypress/fixtures/listasTareas1.fixture";
import listaTareasFixture2 from "../../../cypress/fixtures/listasTareas2.fixture";

describe("gestionarCambioDeLista", () => {
	it("Muestra la lista de tareas pendientes y oculta la lista de tareas completas", () => {
		document.body.innerHTML = listaTareasFixture2;

		const LISTA_SELECCIONADA = "Pendientes";
		gestionarCambioDeLista(LISTA_SELECCIONADA);

		const listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		const listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");

		expect(listaTareasCompletas.id).toBe("oculto");
		expect(listaTareasPendientes.id).toBe("");
	});

	it("Muestra la lista de tareas completas y oculta la lista de tareas pendientes", () => {
		document.body.innerHTML = listaTareasFixture1;

		const LISTA_SELECCIONADA = "Completas";
		gestionarCambioDeLista(LISTA_SELECCIONADA);

		const listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		const listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");

		expect(listaTareasPendientes.id).toBe("oculto");
		expect(listaTareasCompletas.id).toBe("");
	});

	it("Debería devolver false al no cumplir las condiciones anteriores", () => {
		document.body.innerHTML = listaTareasFixture1;

		const LISTA_INNEXISTENTE = "Fruta";
    
		expect(gestionarCambioDeLista(LISTA_INNEXISTENTE)).toBe(false);
	});
});
