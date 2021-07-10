import React, {useEffect, useState} from 'react';
import PxpClient from "pxp-client";
import useFetch from "../../hooks/useFetch";
import MarcaTable from "./MarcaTable";

const Marca = () => {



  const handleInsert = () => {
    PxpClient.doRequest({
      url: 'tienda/Marca/insertarMarca',
      params: {
        nombre: 'nueva marca'
      },
    }).then((resp) => {
      console.log('resp',resp.datos)
    }).catch((err) => {
      console.log('err',err)
    })
  }







  return (
    <div>
      Marca
      <a onClick={handleInsert}>insertar marca</a>


      <MarcaTable/>
    </div>
  );
};

export default Marca;
