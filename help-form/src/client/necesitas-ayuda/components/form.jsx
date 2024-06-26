import React, { useState, useEffect } from 'react';
import { request } from "@ombiel/aek-lib";
import categoriasData from '../assets/json/categorias.json';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SelectComponent from './SelectComponent';
import CheckboxList from './CheckboxList';
import InputComponent from './InputComponent';
import TextAreaComponent from './TextAreaComponent';
import ButtonComponent from './ButtonComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
    borderRadius: '8px',
    color: '#FFFFFF',
  },
  header: {
    color: '#d10a11',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    fontFamily: 'Quicksand, sans-serif',
  },
  section: {
    marginBottom: theme.spacing(1), // Reducido el espaciado vertical entre secciones
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
}));

const HelpdeskForm = () => {
  const classes = useStyles();

  const initialFormData = {
    ubicacion: '',
    descripcion: '',
    ext: '',
    categorias: [],
    categoriaPrincipal: 'Servicios generales', // Establecer la categoría por defecto aquí
    user: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSending, setIsSending] = useState(false);
  const [categoriasOptions, setCategoriasOptions] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = () => {
      request.action("get-user").end((err, res) => {
        if (err) {
          setError('Error obteniendo la información del usuario.');
          return;
        }
        if (res && res.body) {
          const user = res.body.username;
          setFormData(prevState => ({ ...prevState, user }));
        }
      });
    };

    getUser();

    setCategoriasOptions(categoriasData.categorias);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaPrincipalChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, categoriaPrincipal: value, categorias: [] });
  };

  const handleCategoriaChange = (categoria) => {
    const updatedCategorias = formData.categorias.includes(categoria)
      ? formData.categorias.filter(c => c !== categoria)
      : [...formData.categorias, categoria];
    setFormData({ ...formData, categorias: updatedCategorias });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      const { user } = formData;
      const emailContents = `
        <h1>Se ha generado un nuevo caso de ayuda con la siguiente información:</h1>
        <ul>
          <li><strong>Usuario:</strong> ${user}</li>
          <li><strong>Ubicación:</strong> ${formData.ubicacion}</li>
          <li><strong>Descripción:</strong> ${formData.descripcion}</li>
          <li><strong>Extensión o Teléfono:</strong> ${formData.ext}</li>
          <li><strong>Categorías:</strong> ${formData.categorias.join(', ')}</li>
        </ul>
      `;
      try {
        await request.action("send-email").send({ emailContents });
        window.alert('Correo enviado correctamente.');
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        window.alert('Error al enviar el correo. Inténtalo de nuevo.');
      } finally {
        setIsSending(false);
      }
    } else {
      window.alert("Por favor, complete todos los campos del formulario antes de enviar.");
    }
  };

  const validateForm = () => {
    const { ubicacion, descripcion, ext, categorias } = formData;
    return [ubicacion, descripcion, ext].every(field => field.trim() !== '') && categorias.length > 0;
  };

  if (error) {
    return <p className={classes.error}>{error}</p>;
  }

  return (
    <form id="formHelpdesk" onSubmit={handleSubmit} encType="multipart/form-data">
      <Container maxWidth="md" className={classes.container}>
        <h1 className={classes.header}>Completa la siguiente información:</h1>
        <Grid container spacing={1}> {/* Reducido el espaciado horizontal */}
          <Grid item xs={12} className={classes.section}>
            <SelectComponent options={Object.keys(categoriasOptions)} value={formData.categoriaPrincipal} handleChange={handleCategoriaPrincipalChange} />
          </Grid>
          <Grid item xs={12} className={classes.section}>
            <CheckboxList formData={formData} categoriasOptions={categoriasOptions} handleCategoriaChange={handleCategoriaChange} />
          </Grid>
          <Grid item xs={12} className={classes.section}>
            <InputComponent 
              label="Ubicación" 
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              placeholder="Bloque-piso-salón/oficina" 
            />
          </Grid>
          <Grid item xs={12} className={classes.section}>
            <TextAreaComponent
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del problema"
            />
          </Grid>
          <Grid item xs={12} className={classes.section}>
            <InputComponent
              label="Extensión o Teléfono"
              name="ext"
              value={formData.ext}
              onChange={handleInputChange}
              type="number"
              placeholder="Extensión o Teléfono"
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonComponent disabled={isSending} />
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default HelpdeskForm;




