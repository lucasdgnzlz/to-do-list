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

describe("gestionarOpcionesDeLasTareas", () => {
	beforeEach(() => {
		document.body.innerHTML = listasTareas1Fixture;
	});

	it("Prueba funcionalidad al darle prioridad nivel 3 a una tarea", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");
		expect($tareaCreada.classList.contains("prioridad-3")).toBe(false);

		const eventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-3"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, eventoClick);
		expect($tareaCreada.classList.contains("prioridad-3")).toBe(true);
	});

	it("Prueba funcionalidad al asignarle la prioridad nivel 2 a una tarea", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");
		expect($tareaCreada.classList.contains("prioridad-2")).toBe(false);

		const eventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-2"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, eventoClick);
		expect($tareaCreada.classList.contains("prioridad-2")).toBe(true);
	});

	it("Prueba funcionalidad al asignarle la prioridad nivel 1 a una tarea", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");
		expect($tareaCreada.classList.contains("prioridad-1")).toBe(false);

		const eventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-1"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, eventoClick);
		expect($tareaCreada.classList.contains("prioridad-1")).toBe(true);
	});

	it("Prueba la funcionalidad de la opción para borrar una tarea específica", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");

		const eventoClick = {
			target: {
				classList: {
					contains: className => className === "borrar-tarea"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, eventoClick);
		expect($listaTareasPendientes.children.length).toBe(0);
	});

	it("Prueba que la función devuelva false en caso de no encontrar una opción elegida", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");
		const eventoClick = {
			target: {
				classList: {
					contains: className => className === "nada"
				}
			}
		};

		expect(gestionarOpcionesDeLasTareas($tareaCreada, eventoClick)).toBe(false);
	});

	it("Prueba cambiar de prioridad una tarea teniendo otras asignada", () => {
		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Hacer ejercicio";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);

		const $tareaCreada = document.querySelector(".tarea-pendiente");
		expect($tareaCreada.classList.contains("prioridad-1")).toBe(false);

		const primerEventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-1"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, primerEventoClick);
		expect($tareaCreada.classList.contains("prioridad-1")).toBe(true);

		const segundoEventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-2"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, segundoEventoClick);
		expect($tareaCreada.classList.contains("prioridad-2")).toBe(true);

		const tercerEventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-3"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, tercerEventoClick);
		expect($tareaCreada.classList.contains("prioridad-3")).toBe(true);

		const cuartoEventoClick = {
			target: {
				classList: {
					contains: className => className === "opcion-prioridad-1"
				}
			}
		};

		gestionarOpcionesDeLasTareas($tareaCreada, cuartoEventoClick);
		expect($tareaCreada.classList.contains("prioridad-1")).toBe(true);
	});
});

describe("gestionarTareaCompleta", () => {
	it("Prueba completar tarea", () => {
		document.body.innerHTML = listasTareas1Fixture;

		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Completar tareas";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		const $listaTareasCompletas = document.querySelector(".lista-tareas-completas");

		expect($listaTareasPendientes.children.length).toBe(0);
		expect($listaTareasCompletas.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);
		expect($listaTareasCompletas.children.length).toBe(0);

		const $tareaCreada = document.querySelector(".tarea-pendiente");

		gestionarTareaCompleta($tareaCreada);
		expect($listaTareasPendientes.children.length).toBe(0);
		expect($listaTareasCompletas.children.length).toBe(1);
	});
});

describe("gestionarTareaReiniciada", () => {
	it("Prueba reiniciar una tarea", () => {
		document.body.innerHTML = listasTareas1Fixture;

		const LISTA_SELECCIONADA = "lista-tareas-pendientes";
		const TITULO_NUEVA_TAREA = "Completar tareas";
		
		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		const $listaTareasCompletas = document.querySelector(".lista-tareas-completas");

		expect($listaTareasPendientes.children.length).toBe(0);
		expect($listaTareasCompletas.children.length).toBe(0);

		agregarNuevaTarea(LISTA_SELECCIONADA, TITULO_NUEVA_TAREA);
		expect($listaTareasPendientes.children.length).toBe(1);
		expect($listaTareasCompletas.children.length).toBe(0);

		const $tareaCreada = document.querySelector(".tarea-pendiente");

		gestionarTareaCompleta($tareaCreada);
		expect($listaTareasPendientes.children.length).toBe(0);
		expect($listaTareasCompletas.children.length).toBe(1);

		const $tareaCreadaCompleta = document.querySelector(".tarea-completa");

		gestionarTareaReiniciada($tareaCreadaCompleta);
		expect($listaTareasPendientes.children.length).toBe(1);
		expect($listaTareasCompletas.children.length).toBe(0);
	});
});

describe("recrearTareasGuardadas", () => {
	beforeEach(() => {
		document.body.innerHTML = listasTareas1Fixture;
	});

	it("Prueba recrear tarea pendiente guardada en localStorage", () => {
		const listaPertenecienteTarea = "lista-tareas-pendientes";
		const clasesTareaGuardadaEnLocalStorage = {
			"0": "tarea",
			"1": "tarea-pendiente",
			"2": "prioridad-2"
		};
		const nombreTareaGuardadaEnLocalStorage = "Sacar la basura";

		const $listaTareasPendientes = document.querySelector(".lista-tareas-pendientes");
		expect($listaTareasPendientes.children.length).toBe(0);

		recrearTareasGuardadas(listaPertenecienteTarea, clasesTareaGuardadaEnLocalStorage, nombreTareaGuardadaEnLocalStorage);
		expect($listaTareasPendientes.children.length).toBe(1);
	});

	it("Prueba recrear tarea completa guardada en localStorage", () => {
		const listaPertenecienteTarea = "lista-tareas-completas";
		const clasesTareaGuardadaEnLocalStorage = {
			"0": "tarea",
			"1": "tarea-pendiente",
			"2": "prioridad-2"
		};
		const nombreTareaGuardadaEnLocalStorage = "Sacar la basura";

		const $listaTareasCompletas = document.querySelector(".lista-tareas-completas");
		expect($listaTareasCompletas.children.length).toBe(0);

		recrearTareasGuardadas(listaPertenecienteTarea, clasesTareaGuardadaEnLocalStorage, nombreTareaGuardadaEnLocalStorage);
		expect($listaTareasCompletas.children.length).toBe(1);
	});
});
