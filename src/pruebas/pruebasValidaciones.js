import { validarTituloNuevaTarea } from "../validaciones/validaciones";

function probarValidacionTituloNuevaTarea() {
	console.assert(
		validarTituloNuevaTarea("") === "La tarea debe tener un nombre",
		"La validación del titulo con un string vacío no ha funcionado correctamente"
	);
}
probarValidacionTituloNuevaTarea();
