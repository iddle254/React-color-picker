import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import {Link} from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class NavbarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(props) {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => this.props.palettes.every(
      ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
    )
    );
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
      }

    render() {
        const {classes, open, savePalette, handleDrawerOpen} = this.props;
        const {newPaletteName} = this.state;
        return (
            <div>
                <AppBar
        position="fixed"
        color="default"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Color App
          </Typography>
          <ValidatorForm onSubmit={()=> savePalette(newPaletteName)}>
          <TextValidator 
          name='newPaletteName'
          label="Palette Name" 
          value={this.state.newPalleteName} 
          onChange={this.handleChange}
          />
          <Button color="primary" variant="contained" type='submit'>Save Palette</Button>
          <Link to="/">
          <Button variant="contained" color="secondary">Go Back</Button>
          </Link>
            </ValidatorForm>          
        </Toolbar>
      </AppBar>
            </div>
        )
    }
}

export default NavbarForm