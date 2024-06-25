import React, { useState, useEffect } from 'react';
import SalaUsuarioItem from './SalaUsuarioItem';
import { fetchData } from '../../../services/get-data';
import { Grid } from '@mui/material';

const SalaUsuarioList = () => {
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => setSalas(data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    return <div>Error al cargar las salas: {error.message}</div>;
  }

  if (salas.length === 0) {
    return <div>No hay datos de salas disponibles</div>;
  }

  return (
    <Grid container>
      {salas.map(sala => (
        <Grid item xs={6} sm={6} key={sala.id}>
          <SalaUsuarioItem sala={sala} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SalaUsuarioList;
