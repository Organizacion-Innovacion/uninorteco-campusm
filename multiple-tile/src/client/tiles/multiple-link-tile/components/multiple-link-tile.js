import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

const services = [
  { id: 1, name: 'Mis Notas', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/mis-notas-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 2, name: 'Evaluacion Docente', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/evaluacion-docente-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 3, name: 'Calculadora de Promedio', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/calculadora-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 4, name: 'Mis Examenes Finales', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/finales-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 5, name: 'Servicios Bibliograficos', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/servicios-biblio-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 6, name: 'Financiamiento', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/financiamiento-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 7, name: 'Enlaces de Interes', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/enlaces-interes-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 8, name: 'Centro Medico', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/centro-medico-rounded.png', url: 'https://www.uninorte.edu.co' }
];

const ServicesList = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Quicksand:400,500,700']
      }
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} key={service.id}>
          <ListItem
            button
            component="a"
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ paddingTop: 2, paddingBottom: 2 }} // Ajuste de padding vertical
          >
            <ListItemAvatar>
              <Avatar alt={service.name} src={service.image} style={{ width: 60, height: 60 }} /> {/* Ajuste del tamaño del avatar */}
            </ListItemAvatar>
            <ListItemText 
              primary={service.name} 
              primaryTypographyProps={{ style: { fontFamily: 'Quicksand, sans-serif', fontSize: '1.1rem' } }} 
            />
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesList;
