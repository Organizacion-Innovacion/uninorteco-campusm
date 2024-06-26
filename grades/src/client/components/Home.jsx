import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Typography } from "@material-ui/core";
import GradeCard from "./GradeCard";
import SelectComponent from "./SelectComponent";
import { fetchUserData, fetchUserTerms, fetchUserGrades } from "../utils/apiUtils";

const useStyles = makeStyles({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "red",
  },
});

const Screen = () => {
  const classes = useStyles();
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState([]);
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const username = await fetchUserData();
        setUser(username);
        setIsLoading(false);
      } catch (err) {
        console.error('Error in fetchUserData:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTerms = async () => {
      if (user) {
        setIsLoading(true);
        setError('');
        try {
          const termsResponse = await fetchUserTerms(user);
          setTerms(termsResponse);
          setSelectedTerm(termsResponse[0]?.PERIODO || '');
          setIsLoading(false);
        } catch (err) {
          console.error('Error in fetchUserTerms:', err.message);
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchTerms();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const subjectsGradesResponse = await fetchUserGrades(selectedTerm, user);
        setSubjectsGrades(subjectsGradesResponse);
        setIsLoading(false);
      } catch (err) {
        console.error('Error in fetchUserGrades:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (selectedTerm && user) {
      fetchData();
    }
  }, [selectedTerm, user]);

  const handleSelectChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <Container>
      {error ? (
        <div className={classes.errorContainer}>
          <Typography variant="h6">{error}</Typography>
        </div>
      ) : (
        <>
          <SelectComponent
            value={selectedTerm}
            onChange={handleSelectChange}
            options={terms}
          />
          {isLoading ? (
            <div className={classes.loaderContainer}>
              <CircularProgress />
            </div>
          ) : (
            subjectsGrades.map((subjectGrade) => (
              <GradeCard
                key={subjectGrade.materia}
                gradeName={subjectGrade.materia}
                items={subjectGrade.items}
                className={classes.container}
              />
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default Screen;
