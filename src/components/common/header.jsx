import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const Header = props => {
  const { name, variant } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant={variant}>{name}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
