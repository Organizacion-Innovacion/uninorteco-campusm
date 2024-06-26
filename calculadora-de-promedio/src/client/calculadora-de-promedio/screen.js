import React from 'react';
import { Grid, Divider, Typography } from '@mui/material';
import CardComponent from './components/CardComponent';

const Screen = () => {
  const handleVerParcelacion = () => {
    // Lógica para manejar la acción de "Ver parcelación"
    console.log('Ver parcelación');
  };

  return (
    <Grid container spacing={2}>
      {/* Listado de Tarjetas de Materias */}
      
      {[1, 2, 3, 4, 5].map((index) => (
        <Grid item xs={12} key={index}>
          <CardComponent
            title={`Materia ${index}`}
            description={`Créditos: 3`}
            grade={4.5}
            editable={true}
            showLock={true}
            onClickDetails={handleVerParcelacion}
            cardType="blue" // Tipo de tarjeta según el color
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      
      {/* Tarjeta de Promedio Semestral */}
      
      <Grid item xs={12}>
        <CardComponent
          title="Promedio Semestral"
          description={`Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de:`}
          grade={4.3}
          cardType="green" // Tipo de tarjeta según el color
        />
      </Grid>
      
      {/* Tarjeta de Promedio Acumulado */}
      
      <Grid item xs={12}>
        <CardComponent
          title="Promedio Acumulado"
          description={`Promediado con este semestre`}
          grade={3.6}
          cardType="green" // Tipo de tarjeta según el color
        />
      </Grid>
    </Grid>
  );
};

export default Screen;
