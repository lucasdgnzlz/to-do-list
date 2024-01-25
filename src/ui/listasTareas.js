export function gestionarCambioDeLista (listaSeleccionada) {
	if(listaSeleccionada === "Pendientes") {
		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "";

		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else if(listaSeleccionada === "Completas"){
		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "";

		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else {
		return false;
	}
}

function mostrarListaActiva(listaSeleccionada) {
	const $opcionesListasDeTareas = document.querySelectorAll(".texto-opcion");
	
	$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
		if($opcionListaTarea.classList.contains("opcion-activa")) {
			$opcionListaTarea.classList.remove("opcion-activa");
		}
	});

	$opcionesListasDeTareas.forEach(($opcionListaTarea) => {
		if($opcionListaTarea.textContent === listaSeleccionada) {
			$opcionListaTarea.classList.add("opcion-activa");
		}
	});
}
