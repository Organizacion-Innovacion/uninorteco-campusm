import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SimpleCard from "./Card";
import FinalExamService from "../logic-domain/final-exams-domain";
import { DateTimeService } from "../logic-domain/date-services";
import HeaderComponent from "./HeaderComponent";
import { fetchUserData } from "../logic-domain/user-service";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  message: {
    textAlign: 'center',
    color: theme.palette.error.main,
    marginTop: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [dato, setDato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await fetchUserData();
        setUser(username);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const examService = new FinalExamService(user);
        const groupedExams = await examService.getGroupExamByDate();
        if (groupedExams) {
          setDato(groupedExams);
        } else {
          setDato([]);
        }
        setError(null);
        setLoading(false);
      } catch (errorApi) {
        console.error("Error fetching exam data:", errorApi);
        setError(errorApi);
        setLoading(false);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return (
      <Container className={classes.container}>
        <Typography variant="h6" className={classes.message}>
          Hubo un error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!dato || Object.keys(dato).length === 0) {
    return (
      <Container className={classes.container}>
        <Typography variant="h6" className={classes.message}>
          No tienes exámenes finales asignados en este momento.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      {Object.keys(dato).map((fecha) => {
        const { day, month, year, dayName } = DateTimeService.formatDate(fecha);
        return (
          <div key={fecha}>
            <HeaderComponent
              day={day}
              month={month}
              year={year}
              dayName={dayName}
            />
            {dato[fecha].map((item) => (
              <SimpleCard
                key={item.DESCRIPCION}
                title={item.DESCRIPCION}
                hour={item.HORA}
                teacher={item.PROFESOR}
                classRoom={item.LUGAR}
              />
            ))}
          </div>
        );
      })}
    </Container>
  );
}
