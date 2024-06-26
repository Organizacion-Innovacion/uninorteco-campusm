import { request } from "@ombiel/aek-lib";
import { getEnlace } from "./links";

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-data")
      .end((err, res) => {
        if (err) {
          reject(new Error('Error al realizar la solicitud.'));
        } else if (!res.body) {
          reject(new Error('Respuesta vacía del servidor.'));
        } else {
          try {
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
          } catch (transformationError) {
            reject(new Error('Error al transformar los datos.'));
          }
        }
      });
  });
};

// Funciones auxiliares para extraer bloque y piso del nombre
const obtenerBloque = (nombre) => {
  // Lógica para obtener el bloque del nombre
  // Implementar según el formato del nuevo nombre de sala
  const parts = nombre.split('Bloque ');
  if (parts.length > 1) {
    return parts[1].split(' Piso')[0];
  }
  throw new Error('Formato de nombre inválido para obtener bloque.');
};

const obtenerPiso = (nombre) => {
  // Lógica para obtener el piso del nombre
  // Implementar según el formato del nuevo nombre de sala
  const parts = nombre.split('Piso ');
  if (parts.length > 1) {
    return parseInt(parts[1].charAt(0));
  }
  throw new Error('Formato de nombre inválido para obtener piso.');
};
