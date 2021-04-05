import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from '../types';

import clienteAxios from '../config/axios'
import swal from 'sweetalert2'

// creac nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar a la api
      await clienteAxios.post('/productos', producto)

      //si todo sale bien, actualiza el state
      dispatch(agregarProductoExito(producto))

      //alerta
      swal.fire(
        'Correcto',
        'El producto se agrego correctamente',
        'success'
      )
    } catch (error) {
      console.log(error)
      dispatch(agregarProductoError(true))

      //alerta
      swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubor un error, intente de nuevo'
      })
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});


//si el producto se guarda en la base de datos
const agregarProductoExito = producto =>({
type: AGREGAR_PRODUCTO_EXITO,
payload: producto
})

// si hubo un error

const agregarProductoError = estado =>({
type: AGREGAR_PRODUCTO_ERROR,
payload: estado
  })
