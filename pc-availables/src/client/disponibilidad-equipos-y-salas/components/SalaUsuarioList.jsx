import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Alert, CircularProgress, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SalaUsuarioItem from './SalaUsuarioItem';
import { fetchData } from '../../../services/get-data';
import RoomIcon from '@mui/icons-material/Room';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#e0e0e0',
    padding: '20px',
    minHeight: '100vh',
  },
  alert: {
    margin: '20px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#960A11',
    color: '#fff',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginRight: '10px',
    fontSize: '40px',
  },
  title: {
    fontSize: '2rem',
  },
}));

const SalaUsuarioList = () => {
  const [salasUsuario, setSalasUsuario] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    obtenerDatosSalaUsuario();
  }, []);

  const obtenerDatosSalaUsuario = () => {
    setLoading(true);
    fetchData()
      .then((data) => {
        setSalasUsuario(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.header}>
        <RoomIcon className={classes.icon} />
        <Typography variant="h4" component="h1" className={classes.title}>
          Lista de Salas disponibles
        </Typography>
      </Box>
      {loading && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Alert severity="error" className={classes.alert}>
          {error}
        </Alert>
      )}
      {!loading && !error && salasUsuario.length === 0 && (
        <Typography variant="h6" style={{ margin: '20px' }}>
          No hay datos de salas disponibles
        </Typography>
      )}
      <Grid container spacing={2}>
        {salasUsuario.map((sala, index) => (
          <Grid item xs={6} key={index}>
            <SalaUsuarioItem sala={sala} isRight={index % 2 !== 0} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SalaUsuarioList;
