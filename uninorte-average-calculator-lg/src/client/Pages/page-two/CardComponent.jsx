import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import { validateGrade } from '../../utils/semester-grades';
import { validateGradeType } from '../../utils/validations';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 20,
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
  },
  grade: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000', // black text color
  },
  gradeInput: {
    textAlignLast: 'center',
    color: '#000000', // black text color
  },
  text: {
    maxWidth: '60%',
    color: '#000000', // White text color
  },
  blueCard: {
    backgroundColor: '#87ceeb', // Light blue background
    color: '#000000', // text color
  },
  greenCard: {
    backgroundColor: '#32cd32', // Light green background
    color: '#000000', // White text color
  },
  whiteText: {
    color: '#000000', // White text color
  },
}));

export default function CardComponent({ title, grade, weight, text, updateQualifications, updateLock, canLock = true, cardType, gradeInputWidth }) {
  const classes = useStyles();
  const [editGrade, setEditGrade] = useState('');
  const [previousGrade, setPreviousGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const gradeContent = validateGradeType(grade);
    setEditGrade(parseFloat(gradeContent).toFixed(1)); // Convertir el grade a string y redondear a un decimal al iniciar
  }, [grade]);

  const handleGradeChange = (event) => {
    if (!isLocked) {
      const newValue = event.target.value;
      const validatedGrade = validateGrade(newValue);

      if (validatedGrade !== null) {
        setEditGrade(parseFloat(newValue).toFixed(1)); // Convertir el newValue a string y redondear a un decimal
        updateQualifications(parseFloat(newValue));
        if (newValue !== previousGrade.toString()) {
          setPreviousGrade(newValue);
        }
      } else if (newValue === "") {
        setEditGrade(0);
        updateQualifications(0);
      }
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    updateLock(!isLocked);
  };

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            {weight && (
              <Grid item>
                <Typography variant="body2" >Porcentaje: {weight} %</Typography>
              </Grid>
            )}
          </Grid>
          {text && (
            <Grid item>
              <Typography variant="body2" >{text}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item className={classes.grade}>
          <TextField
            className={classes.gradeInput}
            style={{ width: gradeInputWidth }}
            type="number"
            value={editGrade}
            onChange={handleGradeChange}
            disabled={isLocked}
            inputProps={{ style: { color: '#000000' } }} // Black text color in TextField
          />
          {canLock && (
            <IconButton onClick={toggleLock}>
              {isLocked ? <LockIcon style={{ color: '#000000' }} /> : <LockOpenIcon style={{ color: '#000000' }} />}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string,
  weight: PropTypes.number,
  updateQualifications: PropTypes.func.isRequired,
  updateLock: PropTypes.func,
  canLock: PropTypes.bool,
  cardType: PropTypes.string,
  gradeInputWidth: PropTypes.string, // Add this prop type
};

CardComponent.defaultProps = {
  gradeInputWidth: '2.5em', // Default value for the width
};
