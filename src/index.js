// Evento flip del botón agregar tarea
const $botonAgregarTarea = document.querySelector("#boton-agregar-tarea");

function agregaEventoBoton(){
	$botonAgregarTarea.classList.add("fa-flip");

	setTimeout(() => {
		$botonAgregarTarea.classList.remove("fa-flip");
	}, 1000);
}

$botonAgregarTarea.addEventListener("mouseover", () => {
	agregaEventoBoton();
});
// Evento flip del botón agregar tarea