import React, { Component } from "react";
import { Container } from "@ombiel/aek-lib";
import SalaUsuarioList from "./components/SalaUsuarioList";
import { fetchData } from "../../services/get-data";

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: []
    };
  }

  componentDidMount() {
    // Llamar a la función fetchData para obtener los datos de las salas
    fetchData()
      .then(data => {
        this.setState({ salas: data });
      })
      .catch(error => {
        console.error("Error al cargar las salas:", error);
        // Manejo de errores, por ejemplo mostrar un mensaje al usuario
      });
  }

  render() {
    const { salas } = this.state;
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
