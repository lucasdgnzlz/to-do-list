export default `<main>
<div class="contenedor-tareas">
  <div class="contenedor-agregar-tareas">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Agregá una tarea!"
        aria-label="Agregar tarea"
        aria-describedby="button-addon2"
        id="entrada-nueva-tarea"
      />
      <button class="btn btn-outline-secondary" type="button" id="boton-agregar-tarea">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <div class="contenedor-mensaje-error" id="oculto">
      <p class="texto-error-titulo-tarea"></p>
    </div>
  </div>

  <div class="menu-tareas">
    <div class="contenedor-opciones-menu">
      <div class="menu-opcion menu-opcion-pendientes">
        <p class="texto-opcion opcion-pendientes opcion-activa">Pendientes</p>
      </div>
      <div class="menu-opcion menu-opcion-completas">
        <p class="texto-opcion opcion-completas">Completas</p>
      </div>
    </div>
    <div class="contenedor-boton-agregar-lista">
      <button class="boton-opciones-listas-tareas" type="button dropdown-toggle" data-bs-toggle="dropdown">
        <i class="fa-solid fa-ellipsis icono-boton-agregar-lista"></i>
      </button>

      <ul class="dropdown-menu">
        <li class="opciones-lista-menu-tareas">
          <div class="opciones-menu-lista opcion-vaciar-listas">
            <i class="fa-regular fa-trash-can"></i>
            <div class="texto-opcion-vaciar-listas">Vaciar listas</div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="contenedor-lista-tareas-pendientes" id="">
    <ul class="lista-tareas-pendientes">
      <li class="tarea tarea-pendiente ">
        <div class="contenedor-estado-tarea">
          <input class="form-check-input estado-tarea" type="checkbox" id="flexCheckDefault">
          <p class="nombre-tarea" style="color: rgb(73, 103, 68);">Hacer ejercicio</p>
        </div>
      </li>
      <li class="tarea tarea-pendiente ">
        <div class="contenedor-estado-tarea">
          <input class="form-check-input estado-tarea" type="checkbox" id="flexCheckDefault">
          <p class="nombre-tarea" style="color: rgb(73, 103, 68);">Hacer ejercicio</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="contenedor-lista-tareas-completas" id="oculto">
    <ul class="lista-tareas-completas"></ul>
  </div>
</div>
</main>`;
