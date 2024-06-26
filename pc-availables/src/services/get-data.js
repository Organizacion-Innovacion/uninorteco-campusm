import { request } from "@ombiel/aek-lib";
import { getEnlace } from "./links";

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-data")
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          // Adaptar la transformación de datos al nuevo formato
          const data = res.body.map((sala, index) => ({
            id: index + 1,
            nombre: sala.nombre,
            bloque: obtenerBloque(sala.nombre), // Obtener bloque del nombre
            piso: obtenerPiso(sala.nombre), // Obtener piso del nombre
            computadorasDisponibles: sala.computadorasDisponibles,
            enlace: getEnlace(index + 1)
          }));
          resolve(data);
        }
      });
  });
};

// Funciones auxiliares para extraer bloque y piso del nombre
const obtenerBloque = (nombre) => {
  // Lógica para obtener el bloque del nombre
  // Implementar según el formato del nuevo nombre de sala
  return nombre.split('Bloque ')[1].split(' Piso')[0];
};

const obtenerPiso = (nombre) => {
  // Lógica para obtener el piso del nombre
  // Implementar según el formato del nuevo nombre de sala
  return parseInt(nombre.split('Piso ')[1].charAt(0));
};
