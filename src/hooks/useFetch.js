/**
 * Hooks for getting data from hooks state of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, { useState, useEffect } from 'react';
import PxpClient from 'pxp-client';



const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      PxpClient
        .doRequest({
          url: url,
          params: options.params,
          method: options.method || 'POST',
        })
        .then((resp) => {
          setResponse(resp);
        }).catch((err) => {
        setError(err);
      });
    };
    fetchData();
  }, []);
  return { response, error };
};

export default useFetch;


