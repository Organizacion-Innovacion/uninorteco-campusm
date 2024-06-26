import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { LockOpen as LockOpenIcon, Lock as LockIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Box)(({ cardtype }) => ({
  padding: '16px',
  borderRadius: '20px',
  boxShadow: 'none',
  backgroundColor: cardtype === 'blue' ? '#87ceeb' : cardtype === 'green' ? '#32cd32' : '#ffffff',
  color: '#000000',
  marginLeft: '10px', 
  marginRight: '10px',
}));

const GradeContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const GradeText = styled(Typography)({
  borderBottom: '1px solid #000000',
  paddingBottom: '4px',
  backgroundColor: 'transparent', // Eliminar el fondo blanco de la nota
  marginRight: '8px', // Margen derecho para separar la nota del borde derecho
  '& input': {
    background: 'transparent', // Asegurar que el fondo del input sea transparente
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    width: '50px',
    fontSize: 'inherit', // Mantener el tamaño de fuente igual que el texto
  },
});

const LockButton = styled(IconButton)({
  
});

const CardComponent = ({
  title,
  description,
  grade,
  editable,
  showLock,
  onClickLock,
  onClickDetails,
  cardType,
}) => {
  const [editGrade, setEditGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  const handleGradeChange = (event) => {
    event.persist();
    if (!isLocked) {
      const newValue = event.target.value;
      setEditGrade(newValue);
      // Puedes agregar una función prop para actualizar la nota aquí si es necesario
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    onClickLock(!isLocked);
  };

  return (
    <StyledCard cardtype={cardType}>
      <Grid container>
        <Grid item xs={12} container direction="column">
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1">
                {description}
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <GradeContainer>
                {editable ? (
                  <GradeText>
                    <input
                      type="number"
                      value={editGrade}
                      onChange={handleGradeChange}
                      disabled={isLocked}
                    />
                  </GradeText>
                ) : (
                  <GradeText>{editGrade}</GradeText>
                )}
                {showLock && (
                  <LockButton onClick={toggleLock}>
                    {isLocked ? <LockIcon /> : <LockOpenIcon />}
                  </LockButton>
                )}
                {!showLock && <Box width="24px" />} {/* Espacio para compensar cuando no hay icono de candado */}
              </GradeContainer>
            </Grid>
          </Grid>
          {onClickDetails && (
            <Typography variant="body2" onClick={onClickDetails} style={{ cursor: 'pointer' }}>
              Ver parcelación
            </Typography>
          )}
        </Grid>
      </Grid>
    </StyledCard>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  editable: PropTypes.bool,
  showLock: PropTypes.bool,
  onClickLock: PropTypes.func,
  onClickDetails: PropTypes.func,
  cardType: PropTypes.string,
};

CardComponent.defaultProps = {
  editable: false,
  showLock: false,
};

export default CardComponent;
