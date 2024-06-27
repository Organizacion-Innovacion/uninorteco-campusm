import React from 'react';
import { Typography, Card, CardActionArea, CardContent, Grid, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LaptopIcon from '@mui/icons-material/Laptop';

// Estilos personalizados
const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '8px',
      height: '100%',
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      backgroundColor: '#960A11', // Color del borde izquierdo
    },
  },
  rightBorder: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '8px',
      height: '100%',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      backgroundColor: '#960A11', // Color del borde derecho
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px', // Espacio entre el icono y el texto
  },
  number: {
    marginRight: '8px', // Espacio entre el número y el icono
  },
}));

const SalaUsuarioItem = ({ sala, isRight }) => {
  const classes = useStyles(); // Inicializar los estilos

  return (
    <Card variant="outlined" className={`${classes.card} ${isRight ? classes.rightBorder : ''}`}>
      <CardActionArea href={sala.enlace} target="_blank" rel="noopener noreferrer">
        <CardContent>
          <Typography variant="h5" component="h2">
            {sala.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Bloque: {sala.bloque}, Piso: {sala.piso}
          </Typography>
          <Grid container justifyContent='flex-end' spacing={2}>
            <Grid item>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item className={classes.iconContainer}>
              <LaptopIcon className={classes.icon} />
              <Typography variant="body2" component="span">
                {sala.computadorasDisponibles}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SalaUsuarioItem;

