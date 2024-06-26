import React, { Component } from "react";
import { Container } from "@ombiel/aek-lib";
import SalaUsuarioList from "./components/SalaUsuarioList";
import { fetchData } from "../../services/get-data";
import { CircularProgress, Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetchData()
      .then((data) => {
        this.setState({ salas: data, loading: false, error: null });
      })
      .catch((error) => {
        console.error("Error al cargar las salas:", error);
        this.setState({ loading: false, error: error.message });
      });
  }

  render() {
    const { salas, loading, error } = this.state;

    if (loading) {
      return (
        <Box style={{ textAlign: 'center', margin: '20px' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ backgroundColor: '#ffffff', color: '#1d1d1b', textAlign: 'center', padding: '20px', marginBottom: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <ErrorOutlineIcon style={{ fontSize: 40, marginBottom: -8, marginRight: 10, verticalAlign: 'middle' }} />
          <Typography variant="h5" component="h1" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            Error al cargar las salas
          </Typography>
          <Typography variant="body1">
            {error}
          </Typography>
        </Box>
      );
    }

    return (
      <Container>
        {salas.length > 0 ? (
          <SalaUsuarioList salas={salas} />
        ) : (
          <p>No hay datos de salas disponibles.</p>
        )}
      </Container>
    );
  }
}
