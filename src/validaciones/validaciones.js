export function validarTituloNuevaTarea(tituloNuevaTarea){
	const regex = /^(?! )[\w\s\-!@#$%^&*(),.?":{}|<>áéíóúÁÉÍÓÚüÜñÑ]+$/;

	if(tituloNuevaTarea === "") {
		return "La tarea debe tener un nombre";
	} else if(!regex.test(tituloNuevaTarea)) {
		return "El nombre de la tarea no es válido";
	}	else {
		return "";
	}
}
