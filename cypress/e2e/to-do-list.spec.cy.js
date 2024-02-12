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

		it("Prueba agregar tarea y eliminarla", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Alimentar al gato");
			cy.get("#entrada-nueva-tarea").should("have.value", "Alimentar al gato");

			cy.get("#boton-agregar-tarea").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
			cy.get(".lista-tareas-pendientes").children().should("be.visible");

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Alimentar al gato");

			cy.get(".boton-opciones-tarea")
				.should("be.visible")
				.click();

			cy.get(".contenedor-opciones-tarea ul").should("be.visible");
			cy.get(".contenedor-opciones-tarea ul").children().should("have.length", 4);
			cy.get(".bloque-borrar-tarea").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			localStorage.clear();
		});

		it("", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Alimentar al gato");
			cy.get("#boton-agregar-tarea").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
			cy.get(".lista-tareas-pendientes").children().should("be.visible");

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Alimentar al gato");

			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Alimentar al gato");
			
			cy.get("#boton-agregar-tarea").click();
			
			cy.get(".texto-error-titulo-tarea")
				.should("be.visible")
				.should("have.text", "Ya existe una tarea con ese mismo nombre");
			
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
		});

		it("Prueba agregar varias tareas, y eliminarlas todas", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Alimentar al gato");
			cy.get("#entrada-nueva-tarea").should("have.value", "Alimentar al gato");

			cy.get("#boton-agregar-tarea").click();

			cy.get("#entrada-nueva-tarea").type("Comprar ropa");
			cy.get("#entrada-nueva-tarea").should("have.value", "Comprar ropa");

			cy.get("#boton-agregar-tarea").click();

			cy.get("#entrada-nueva-tarea").type("Dominar al mundo");
			cy.get("#entrada-nueva-tarea").should("have.value", "Dominar al mundo");

			cy.get("#boton-agregar-tarea").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 3);
			cy.get(".lista-tareas-pendientes").children().should("be.visible");

			cy.get(".boton-opciones-listas-tareas").should("be.visible").click();
			cy.get(".opcion-vaciar-listas").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");
		});
	});

	describe("Verifica correcta aplicación de los niveles de prioridades a las tareas", () => {
		it("Prueba dar prioridades a una tarea específica", () => {
			cy.get("#entrada-nueva-tarea")
				.should("have.text", "")
				.type("Alimentar al gato");
			cy.get("#entrada-nueva-tarea").should("have.value", "Alimentar al gato");

			cy.get("#boton-agregar-tarea").click();

			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
			cy.get(".lista-tareas-pendientes").children().should("be.visible");

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Alimentar al gato");

			cy.get(".boton-opciones-tarea")
				.should("be.visible")
				.click();

			cy.get(".contenedor-opciones-tarea ul").should("be.visible");
			cy.get(".contenedor-opciones-tarea ul").children().should("have.length", 4);
			cy.get(".opcion-prioridad-3").should("be.visible").click();

			cy.get(".tarea-pendiente").should("have.class", "prioridad-3");

			cy.get(".boton-opciones-tarea")
				.should("be.visible")
				.click();

			cy.get(".opcion-prioridad-2").should("be.visible").click();
			cy.get(".tarea-pendiente").should("have.class", "prioridad-2");

			cy.get(".boton-opciones-tarea")
				.should("be.visible")
				.click();

			cy.get(".opcion-prioridad-1").should("be.visible").click();
			cy.get(".tarea-pendiente").should("have.class", "prioridad-1");

			localStorage.clear();
		});
	});

	describe("Comprueba funcionamiento de las listas de tareas", () => {
		it("Verifica funcionamiento de cambio de listas", () => {
			cy.get(".opcion-pendientes")
				.should("be.visible")
				.should("have.class", "opcion-activa");
			cy.get(".lista-tareas-pendientes").should("be.visible");

			cy.get(".opcion-completas")
				.should("be.visible")
				.should("not.have.class", "opcion-activa");
			cy.get(".lista-tareas-completas").should("not.be.visible");

			cy.get(".opcion-completas").click();
			cy.get(".opcion-completas")
				.should("be.visible")
				.should("have.class", "opcion-activa");
			cy.get(".lista-tareas-completas").should("be.visible");

			cy.get(".opcion-pendientes")
				.should("be.visible")
				.should("not.have.class", "opcion-activa");
			cy.get(".lista-tareas-pendientes").should("not.be.visible");
		});

		it("Comprueba correcto funcionamiento de completado de tareas", () => {
			cy.get(".lista-tareas-pendientes").should("be.visible");

			cy.get("#entrada-nueva-tarea").should("be.visible").type("Comer más sano");
			cy.get("#boton-agregar-tarea").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
			cy.get(".lista-tareas-completas").should("not.have.descendants", "li");

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Comer más sano");
			
			cy.get(".lista-tareas-pendientes li .estado-tarea")
				.should("be.visible")
				.click();

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");
			cy.get(".lista-tareas-completas").should("have.descendants", "li");
			cy.get(".lista-tareas-completas").children().should("have.length", 1);

			cy.get(".lista-tareas-completas li")
				.should("not.be.visible")
				.should("have.class", "tarea tarea-completa")
				.contains("p", "Comer más sano");

			cy.get(".lista-tareas-pendientes").should("be.visible");
			cy.get(".lista-tareas-completas").should("not.be.visible");

			cy.get(".opcion-completas").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("not.be.visible");
			cy.get(".lista-tareas-completas").should("be.visible");

			cy.get(".opcion-pendientes").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("be.visible");
			cy.get(".lista-tareas-completas").should("not.be.visible");

			localStorage.clear();
		});
	});

	describe("Comprueba guardado de tareas en localStorage", () => {
		it("Prueba que las tareas pendientes se guarden correctamente en localStorage", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("be.visible")
				.type("Ejercitarse");
			cy.get("#boton-agregar-tarea").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Ejercitarse");

			cy.reload();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);
			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Ejercitarse");

			localStorage.clear();
		});

		it("Prueba que las tareas completas se guarden correctamente en localStorage", () => {
			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");

			cy.get("#entrada-nueva-tarea")
				.should("be.visible")
				.type("Ejercitarse");
			cy.get("#boton-agregar-tarea").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("have.descendants", "li");
			cy.get(".lista-tareas-pendientes").children().should("have.length", 1);

			cy.get(".lista-tareas-pendientes li")
				.should("have.class", "tarea tarea-pendiente")
				.contains("p", "Ejercitarse");

			cy.get(".lista-tareas-pendientes li .estado-tarea").should("be.visible").click();

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");
			cy.get(".lista-tareas-completas").should("have.descendants", "li");
			cy.get(".lista-tareas-completas li")
				.should("have.class", "tarea tarea-completa")
				.contains("p", "Ejercitarse");

			cy.reload();

			cy.get(".opcion-completas")
				.should("be.visible")
				.should("not.have.class", "opcion-activa")
				.click();

			cy.get(".lista-tareas-pendientes").should("not.have.descendants", "li");
			cy.get(".lista-tareas-completas").should("have.descendants", "li");
			cy.get(".lista-tareas-completas li")
				.should("have.class", "tarea tarea-completa")
				.should("be.visible")
				.contains("p", "Ejercitarse");

			localStorage.clear();
		});
	});
});
