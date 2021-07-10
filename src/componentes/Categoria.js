import React, {useState} from 'react';
import TableEnde from "./table/TableEnde";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

const Categoria = () => {


  const config = {
    columns: {
      nombre: {
        label: 'Nombre'
      },
      color: {
        label: 'Color'
      }
    },
    idStore: 'id_categoria',
    getDataTable: {
      url: 'tienda/Categoria/listarCategoria',
      params: {
        start: 0,
        limit: 10,
        sort: 'id_categoria',
        dir: 'ASC'
      },
      load: true,
      method: 'POST',
    },
    urlAdd: 'tienda/Categoria/insertarCategoria',
    urlDelete: 'tienda/Categoria/eliminarCategoria',
  };


  const [value, setValue] = useState('');
  const handleClick = () => {
    console.log(value)
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      {/*<TableEnde config={config} />*/}
      <TextField
        required
        id="standard-required"
        label="Required"
        value={value}
        onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Agregar
      </Button>
    </div>
  );
};

export default Categoria;
