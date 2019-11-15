import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";
import styles from "./styles/NewPaletteFormStyles";
import DraggableColorbox from './DraggableColorbox';



class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "blue",
      colors: [{color:"blue",name:"blue"}],
      newName: ""
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule("isColorUnique", value => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
);
}

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex});
  }
  addNewColor(){
    const newColor = {color:this.state.currentColor, name:this.state.newName}
    this.setState({colors:[...this.state.colors, newColor], newColor:""});
  }
  handleChange(evt){
    this.setState({newName: evt.target.value});
  }

  render() {
    const { classes } = this.props;
    const { open, currentColor } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Color App
          </Typography>
        </Toolbar>
      </AppBar>
        
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
                onClick={this.addRandomColor}
              >
                Random Color
              </Button>
              <ChromePicker
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
             value={this.state.newName}
             onChange={this.handleChange}
             validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={["this field is required", "color names must be unique", "color already used"]}
             />
             <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: currentColor }}
            type='submit'
          >Add Color
          </Button>
          </ValidatorForm>
          
            </div>
            
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          
            {this.state.colors.map(color => <DraggableColorbox color={color.color} name={color.name}/>
            )}
          
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);