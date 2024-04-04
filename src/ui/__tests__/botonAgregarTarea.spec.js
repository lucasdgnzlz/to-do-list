/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { activarEventoBoton } from "../botonAgregarTarea";
import listasTareas1Fixture from "../../../cypress/fixtures/listasTareas1.fixture";

describe("activarEventoBoton", () => {
	it("Debería agregar y quitar clase a un elemento", (done) => {
		document.body.innerHTML = listasTareas1Fixture;

		const $botonAgregarTarea = document.querySelector("#boton-agregar-tarea");

		$botonAgregarTarea.addEventListener("click", () => {
			activarEventoBoton($botonAgregarTarea);
			setTimeout(() => {
				expect($botonAgregarTarea.classList.contains("fa-flip")).toBe(true);

				setTimeout(() => {
					expect($botonAgregarTarea.classList.contains("fa-flip")).toBe(false);
					done();
				}, 1000);
			}, 0);
		});

		$botonAgregarTarea.click();
	});
});
