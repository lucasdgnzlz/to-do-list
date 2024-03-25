export let tareasGuardadasEnLocalStorage = [];

export function guardarTareasEnLocalStorage(contextoTarea, nombreTarea){	
	if(contextoTarea !== "nueva tarea"){
		localStorage.setItem("tareasGuardadas", JSON.stringify(tareasGuardadasEnLocalStorage));
	} else{
		const $tareas = document.querySelectorAll(".tarea");

		$tareas.forEach((tarea) => {
			let tituloTarea = tarea.querySelector(".nombre-tarea").textContent;
			const nombreKey = "tarea";

			if(tituloTarea === nombreTarea){
				const informacionTareaAGuardar = {
					[nombreKey]: {
						"nombreTarea": nombreTarea,
						"clasesTarea": tarea.classList,
					}
				};
				tareasGuardadasEnLocalStorage.push(informacionTareaAGuardar);

				localStorage.setItem("tareasGuardadas", JSON.stringify(tareasGuardadasEnLocalStorage));
			}
		});
	}
}

export function cargarTareasDeLocalStorage(DATA_A_BUSCAR){
	if(DATA_A_BUSCAR === undefined){
		throw new Error("Se necesita el nombre de la data que se requiere para cargar la misma");
	}
	
	const tareasGuardadas = JSON.parse(localStorage.getItem(`${DATA_A_BUSCAR}`));

	if(tareasGuardadas === null) {
		throw new Error(`La data ${DATA_A_BUSCAR} no se encontro en el localStorage`);
	}

	return tareasGuardadas;
}

export function actualizarDatosTareaGuardada(nombreTareaActualizada){
	const contextoTarea = "actualización de tarea";
	let NOMBRE_KEY = "tarea";
	let tareaActualizada;

	tareasGuardadasEnLocalStorage.forEach((tareaEnLista, i) => {
		const $tareas = document.querySelectorAll(".tarea");
		const tituloTareaAComparar = ($tareas[i].querySelector(".nombre-tarea")).textContent;

		if(tituloTareaAComparar === nombreTareaActualizada){
			tareaActualizada = {
				[NOMBRE_KEY]: {
					"nombreTarea": nombreTareaActualizada,
					"clasesTarea": $tareas[i].classList
				}
			};				
		}
	});

	tareasGuardadasEnLocalStorage.forEach((tareaEnLista, i) => {
		const indicadorTareaEnLista = Object.keys(tareaEnLista)[0];
		const nombreTareaGuardada = tareasGuardadasEnLocalStorage[i][indicadorTareaEnLista]["nombreTarea"];

		if(nombreTareaActualizada === nombreTareaGuardada){
			tareasGuardadasEnLocalStorage[i] = tareaActualizada;
		}
	});

	guardarTareasEnLocalStorage(contextoTarea, nombreTareaActualizada);
}

export function eliminarTareaDeLocalStorage($tareaSeleccionada) {
	const nombreTareaSeleccionada = $tareaSeleccionada.querySelector(".nombre-tarea").textContent;

	tareasGuardadasEnLocalStorage = tareasGuardadasEnLocalStorage.filter(tareaGuardada => {
		const indicadorTareaGuardada = Object.keys(tareaGuardada)[0];
		const nombreTareaGuardada = tareaGuardada[indicadorTareaGuardada]["nombreTarea"];

		return nombreTareaGuardada !== nombreTareaSeleccionada;
	});

	actualizarDatosTareaGuardada(nombreTareaSeleccionada);
}

export function eliminarTodasLasTareasDeLocalStorage(){
	const CONTEXTO_TAREA = "actualización de tarea";

	tareasGuardadasEnLocalStorage = [];
	guardarTareasEnLocalStorage(CONTEXTO_TAREA, null);
}
