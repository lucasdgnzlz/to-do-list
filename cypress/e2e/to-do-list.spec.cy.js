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

	describe("Verifica funcionalidad al agregar y eliminar tareas", () => {
		it("Prueba agregar tarea sin escribir el nombre de la misma", () => {
			cy.get(".texto-error-titulo-tarea")
				.should("not.be.visible")
				.should("not.have.text");

			cy.get("#entrada-nueva-tarea").should("have.value", "");

			cy.get("#boton-agregar-tarea").click();

			cy.get(".texto-error-titulo-tarea")
				.should("be.visible")
				.should("have.text", "La tarea debe tener un nombre");
		});
	});
});
