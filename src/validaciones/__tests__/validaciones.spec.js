import { validarTituloNuevaTarea } from "../validaciones";

describe("validarTituloNuevaTarea", () => {
	it("Debería devolver un texto indicando que la tarea debe tener nombre", () => {
		const NOMBRE_DE_PRUEBA = "";

		expect(validarTituloNuevaTarea(NOMBRE_DE_PRUEBA)).toBe("La tarea debe tener un nombre");
	});

	it("Debería devolver un texto indicando que el nombre proporcionado no es válido", () => {
		const NOMBRE_DE_PRUEBA = "    ";

		expect(validarTituloNuevaTarea(NOMBRE_DE_PRUEBA)).toBe("El nombre de la tarea no es válido");
	});

	it("Debería devolver un string vacío indicando que el título es válido", () => {
		const NOMBRE_DE_PRUEBA = "Hacer la tarea";

		expect(validarTituloNuevaTarea(NOMBRE_DE_PRUEBA)).toBe("");
	});
});
