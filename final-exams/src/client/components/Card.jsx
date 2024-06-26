import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContentComponent from "./CardContentComponent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: 10,
  },
});

const SimpleCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContentComponent {...props} />
    </Card>
  );
};

export default SimpleCard;
