import React, { useState, useEffect } from 'react';
import SalaUsuarioItem from './SalaUsuarioItem';
import { fetchData } from '../../../services/get-data';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RoomIcon from '@mui/icons-material/Room';

const SalaUsuarioList = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => {
        setSalas(data);
        setLoading(false);
        setError(null); // Limpiar cualquier error previo al cargar correctamente
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#ffffff', color: '#1d1d1b', textAlign: 'center', padding: '20px', marginBottom: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ErrorOutlineIcon style={{ fontSize: 40, marginBottom: -8, marginRight: 10, verticalAlign: 'middle' }} />
        <Typography variant="h5" component="h1" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Error al cargar las salas
        </Typography>
      </Box>
    );
  }

  if (salas.length === 0) {
    return (
      <Typography variant="h6" style={{ margin: '20px' }}>
        No hay datos de salas disponibles
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#1d1d1b', color: '#fff', textAlign: 'center', padding: '20px', marginBottom: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <RoomIcon style={{ fontSize: 40, marginBottom: -8, marginRight: 10, verticalAlign: 'middle' }} />
        <Typography variant="h4" component="h1" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Lista de Salas disponibles
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {salas.map(sala => (
          <Grid item key={sala.id} xs={6}>
            <SalaUsuarioItem sala={sala} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SalaUsuarioList;
