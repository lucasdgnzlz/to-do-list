export function activarEventoBoton($botonAgregarTarea){
	$botonAgregarTarea.classList.add("fa-flip");

	setTimeout(() => {
		$botonAgregarTarea.classList.remove("fa-flip");
	}, 1000);
}
