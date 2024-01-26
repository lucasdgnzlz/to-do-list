/// <reference types="Cypress"/>

const URL = "http://192.168.1.41:8080";

context("To-Do List", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	describe("Comprueba visibilidad de los elementos", () => {
		it("Comprueba visibilidad de los elementos del header", () => {
			cy.get(".titulo")
				.should("be.visible")
				.should("have.text", "To-DoList");
		});

		it("Comprueba la visibilidad de la interfaz sin tareas", () => {
			cy.get("#entrada-nueva-tarea")
				.should("be.visible")
				.should("have.attr", "placeholder", "Agregá una tarea!");

			cy.get("#boton-agregar-tarea").should("be.visible");

			cy.get(".opcion-pendientes")
				.should("be.visible")
				.should("have.text", "Pendientes");

			cy.get(".opcion-completas")
				.should("be.visible")
				.should("have.text", "Completas");

			cy.get(".boton-opciones-listas-tareas").should("be.visible");
		});
	});
});
