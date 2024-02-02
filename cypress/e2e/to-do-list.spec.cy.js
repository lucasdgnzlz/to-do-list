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

			cy.get("#entrada-nueva-tarea").should("have.class", "is-invalid");
		});

		it("Prueba agregar tarea poniéndole un nombre correcto", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Pasear al perro");
			
			cy.get("#entrada-nueva-tarea").should("have.value", "Pasear al perro");

			cy.get("#boton-agregar-tarea").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Pasear al perro");

			localStorage.clear();
		});

		it("Agrega tarea luego de intentar agrega una con error en el título", () => {
			cy.get(".texto-error-titulo-tarea")
				.should("not.be.visible")
				.should("not.have.text");

			cy.get("#entrada-nueva-tarea").should("have.value", "");
			cy.get("#boton-agregar-tarea").click();

			cy.get(".texto-error-titulo-tarea")
				.should("be.visible")
				.should("have.text", "La tarea debe tener un nombre");

			cy.get("#entrada-nueva-tarea").should("have.class", "is-invalid");

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea").type("Pasear al perro");
			cy.get("#boton-agregar-tarea").click();
			
			cy.get(".texto-error-titulo-tarea")
				.should("not.be.visible")
				.should("have.text", "");

			cy.get("#entrada-nueva-tarea").should("not.have.class", "is-invalid");

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Pasear al perro");

			localStorage.clear();
		});
	});
});
