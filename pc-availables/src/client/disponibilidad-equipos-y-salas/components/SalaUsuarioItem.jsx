import React from 'react';
import { Typography, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import { styled } from '@mui/system';

const CustomCard = styled(Card)({
  backgroundColor: '#ffffff',
  color: '#1d1d1b',
  margin: '15px',
  border: '3px solid #d10a11',
  '&:hover': {
    backgroundColor: '#EEEDEB',
    color: '#1d1d1b',
  },
});

const CustomCardActionArea = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '100%',
  padding: '10px',
});

const CustomCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const CustomTypography = styled(Typography)({
  fontWeight: 'bold',
});

const CustomLaptopIcon = styled(LaptopIcon)({
  color: '#d10a11',
});

const SalaUsuarioItem = ({ sala }) => {
  const { nombre, computadorasDisponibles, enlace } = sala; // Destructuración de las propiedades de sala

  return (
    <CustomCard variant="outlined">
      <CustomCardActionArea component="a" href={enlace} target="_blank" rel="noopener noreferrer">
        <CustomCardContent>
          <CustomTypography variant="h5" component="h2">
            {nombre}
          </CustomTypography>
          <Grid container alignItems="center">
            <Grid item>
              <CustomLaptopIcon />
            </Grid>
            <Grid item>
              <Typography variant="body2" component="span">
                {computadorasDisponibles} PCs disponibles
              </Typography>
            </Grid>
          </Grid>
        </CustomCardContent>
      </CustomCardActionArea>
    </CustomCard>
  );
};

export default SalaUsuarioItem;

