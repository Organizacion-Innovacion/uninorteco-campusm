import React from 'react';
import { Container, Divider, Typography, Link, List, ListItem, ListItemText, ListItemIcon, Box } from '@material-ui/core';
import { Cloud, LibraryBooks, Archive } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5e262',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative', // Añadido para posicionar el megáfono correctamente
  },
  orangeBarStyle: {
    backgroundColor: '#f5e262',
    padding: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  dividerWithText: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  dividerLine: {
    borderBottom: '3px solid #fff',
    flexGrow: 1,
  },
  dividerText: {
    margin: '0 10px',
    textTransform: 'uppercase',
    color: '#f5e262',
  },
  linkStyle: {
    color: '#fff',
    '&:hover': {
      color: '#f5e262',
    },
  },
  vignetteStyle: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    margin: '20px 0',
    marginRight: '20px',
    marginLeft: '20px',
    maxWidth: 'calc(100% - 40px)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
  },
  vignetteArrow: {
    content: '""',
    position: 'absolute',
    bottom: '-20px',
    right: '120px',
    width: '0',
    height: '0',
    borderTop: '20px solid #000',
    borderLeft: '20px solid transparent',
  },
  megaphoneImage: {
    position: 'absolute',
    bottom: '100px', // Ajuste para que esté justo debajo de la viñeta
    right: '20px',
    zIndex: 1,
    width: '140px',
  },
  footerImage: {
    width: '100%',
    marginTop: '20px',
  },
}));

const DatabaseComponent = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.orangeBarStyle}></Box>
      <Box className={classes.vignetteStyle}>
        <div className={classes.vignetteArrow}></div>
        <div className={classes.dividerWithText}>
          <Divider className={classes.dividerLine} style={{ marginRight: 5 }} />
          <Typography variant="body1" className={classes.dividerText}>
            Bases de datos
          </Typography>
          <Divider className={classes.dividerLine} style={{ marginLeft: 5 }} />
        </div>
        <Typography variant="body1" align="left" paragraph>
          Aprovecha tu cuenta Uninorte para poder acceder a las bases de datos, revistas y artículos académicos. Normalmente estas te pedirían membresía o que pagues por el artículo.
        </Typography>
        <Typography variant="body1" align="right" paragraph>
          <Link href="https://uninorte.libguides.com/az.php" target="_blank" rel="noopener" className={classes.linkStyle}>
            Ir a las bases de datos <strong>{'>'}</strong>
          </Link>
        </Typography>
        <div className={classes.dividerWithText}>
          <Divider className={classes.dividerLine} style={{ marginRight: 5 }} />
          <Typography variant="body1" className={classes.dividerText}>
            Otros servicios
          </Typography>
          <Divider className={classes.dividerLine} style={{ marginLeft: 5 }} />
        </div>
        <List>
          <ListItem button component="a" href="https://primo-tc-na01.hosted.exlibrisgroup.com/primo-explore/search?search_scope=uninorte_completo&vid=UNINORTE&lang=es_CO" target="_blank" rel="noopener">
            <ListItemIcon>
              <Cloud style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="SIBILA+" />
            <strong>{'>'}</strong>
          </ListItem>
          <ListItem button component="a" href="http://ezproxy.uninorte.edu.co:2048/login?url=http://sfxna11.hosted.exlibrisgroup.com/57UNINORTE/az?lang=spa" target="_blank" rel="noopener">
            <ListItemIcon>
              <LibraryBooks style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="AtoZ" />
            <strong>{'>'}</strong>
          </ListItem>
          <ListItem button component="a" href="http://manglar.uninorte.edu.co/" target="_blank" rel="noopener">
            <ListItemIcon>
              <Archive style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Repositorio Digital" />
            <strong>{'>'}</strong>
          </ListItem>
        </List>
      </Box>
      <img src="https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/images/megafono.png" alt="Megaphone Icon" className={classes.megaphoneImage} />
      <img src="https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/images/fondo-pie-de-pagina.png" alt="Footer Icon" className={classes.footerImage} />
    </Container>
  );
};

export default DatabaseComponent;
