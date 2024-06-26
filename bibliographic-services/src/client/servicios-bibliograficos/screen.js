import React, { useEffect, useState } from 'react';
import { Container, Divider, Typography, Link, List, ListItem, ListItemText, ListItemIcon, Box, IconButton, Collapse, CssBaseline } from '@material-ui/core';
import { Cloud, LibraryBooks, Archive } from '@material-ui/icons';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#444444',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Quicksand, sans-serif',
  },
  header: {
    backgroundImage: 'linear-gradient(to right, black, #d10a11)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '25px',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontSize: '2rem',
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    width: '100%',
    marginBottom: '20px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  linkStyle: {
    color: '#d10a11',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  listItem: {
    '&:hover $arrowIcon': {
      transform: 'translateX(5px)',
    },
  },
  listItemIcon: {
    color: '#d10a11',
  },
  arrowIcon: {
    color: '#d10a11',
    transition: 'transform 0.3s',
  },
  expandIcon: {
    color: '#d10a11',
  },
  expandedContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '15px',
    marginTop: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  },
}));

const services = [
  {
    text: 'SIBILA+',
    icon: <Cloud />,
    link: 'campusm://openURL?url=https://primo-tc-na01.hosted.exlibrisgroup.com/primo-explore/search?search_scope=uninorte_completo&vid=UNINORTE&lang=es_CO',
    description: 'Accede a una plataforma avanzada de búsqueda que te permite encontrar recursos académicos de manera rápida y eficiente.',
  },
  {
    text: 'AtoZ',
    icon: <LibraryBooks />,
    link: 'campusm://openURL?url=http://ezproxy.uninorte.edu.co:2048/login?url=http://sfxna11.hosted.exlibrisgroup.com/57UNINORTE/az?lang=spa',
    description: 'Explora el listado completo de bases de datos disponibles para estudiantes y profesores de Uninorte.',
  },
  {
    text: 'Repositorio Digital',
    icon: <Archive />,
    link: 'campusm://openURL?url=https://manglar.uninorte.edu.co/',
    description: 'Consulta y descarga documentos académicos y publicaciones almacenadas en el repositorio digital de Uninorte.',
  },
];

const DatabaseComponent = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: 'white' }}>Bases de Datos</Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>Accede a recursos académicos</Typography>
        <Divider style={{ backgroundColor: '#d10a11', margin: '10px 0' }} />
        <Typography variant="body1" paragraph>
          Aprovecha tu cuenta Uninorte para poder acceder a las bases de datos, revistas y artículos académicos. Normalmente estas te pedirían membresía o que pagues por el artículo.
        </Typography>
        <Typography variant="body1" align="right">
          <Link href="campusm://openURL?url=https://uninorte.libguides.com/az.php" target="_blank" rel="noopener" className={classes.linkStyle}>
            Ir a las bases de datos <ArrowForwardIosIcon fontSize="small" />
          </Link>
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>Otros servicios</Typography>
        <Divider style={{ backgroundColor: '#d10a11', margin: '10px 0' }} />
        <List>
          {services.map((item, index) => (
            <Box key={index}>
              <ListItem button onClick={() => handleExpandClick(index)} className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>{item.text}</Typography>
                </ListItemText>
                {expanded === index ? <ExpandLessIcon className={classes.expandIcon} /> : <ExpandMoreIcon className={classes.expandIcon} />}
              </ListItem>
              <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <Box className={classes.expandedContainer}>
                  <Typography variant="body1" paragraph style={{ lineHeight: '1.6' }}>
                    {item.description}
                  </Typography>
                  <Typography variant="body1" align="right">
                    <Link href={item.link} target="_blank" rel="noopener" className={classes.linkStyle}>
                      Ir a {item.text} <ArrowForwardIosIcon fontSize="small" />
                    </Link>
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Container>
  );
};

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
});

export default function MainComponent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DatabaseComponent />
    </ThemeProvider>
  );
}






