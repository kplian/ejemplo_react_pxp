import React, {useEffect, useState} from 'react';
import TableEnde from "../table/TableEnde";

const config = {
  columns: {
    nombre: {
      label: 'Nombre'
    }
  },
  idStore: 'id_marca',
  getDataTable: {
    url: 'tienda/Marca/listarMarca',
    params: {
      start: 0,
      limit: 10,
      sort: 'id_marca',
      dir: 'ASC'
    },
    load: true,
    method: 'POST',
  },
  urlAdd: 'tienda/Marca/insertarMarca',
  urlDelete: 'tienda/Marca/eliminarMarca',

};






const MarcaTable = () => {


  return (
    <div>
      <TableEnde config={config} />
    </div>
  );
}

export default  MarcaTable;

