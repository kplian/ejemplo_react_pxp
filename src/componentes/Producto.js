import React from 'react';
import TableEnde from "./table/TableEnde";

const Producto = () => {

  const config = {
    columns: {
      nombre: {
        label: 'Nombre',
        render: (row) => {
          return (
            <div>
              <b>Nombre: {row.nombre}</b>
              <b>Precio: {row.precio}</b>
            </div>
          )
        }
      },
      precio: {
        label: 'Precio'
      }
    },
    idStore: 'id_categoria',
    getDataTable: {
      url: 'tienda/Producto/listarProducto',
      params: {
        start: 0,
        limit: 10,
        sort: 'id_producto',
        dir: 'ASC'
      },
      load: true,
      method: 'POST',
    }
  };



  return (
    <div>
      <TableEnde config={config} />
    </div>
  );
};

export default Producto;
