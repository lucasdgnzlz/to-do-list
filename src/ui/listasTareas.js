export function gestionarCambioDeLista (listaSeleccionada) {
	if(listaSeleccionada === "Pendientes") {
		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "";

		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "oculto";
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else if(listaSeleccionada === "Completas"){
		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "";

		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "oculto";
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
	} else if(listaSeleccionada === "Total") {
		const $listaTareasTotales = document.querySelector(".contenedor-lista-tareas-totales");
		$listaTareasTotales.id = "";

		const $listaTareasPendientes = document.querySelector(".contenedor-lista-tareas-pendientes");
		$listaTareasPendientes.id = "oculto";
		const $listaTareasCompletas = document.querySelector(".contenedor-lista-tareas-completas");
		$listaTareasCompletas.id = "oculto";
		mostrarListaActiva(listaSeleccionada);
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
