import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  OBTENER_PRODUCTO_ELIMINAR_EXITO,
  OBTENER_PRODUCTO_ELIMINAR_ERROR,
} from '../types';

import clienteAxios from '../config/axios';
import swal from 'sweetalert2';

// creac nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar a la api
      await clienteAxios.post('/productos', producto);

      //si todo sale bien, actualiza el state
      dispatch(agregarProductoExito(producto));

      //alerta
      swal.fire('Correcto', 'El producto se agrego correctamente', 'success');
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));

      //alerta
      swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubor un error, intente de nuevo',
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// si hubo un error

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await clienteAxios.get('/productos');
      dispatch(descargarProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//seleciona y elimna el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenetProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenetProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR_EXITO,
});

const eliminarProductoError = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR_ERROR,
  payload: true,
});
