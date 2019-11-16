import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";
import styles from "./styles/NewPaletteFormStyles";
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import NavbarForm from './NavbarForm';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors:20 
  }
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "blue",
      colors: this.props.palettes[0].colors,
      newColorName: ""
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  componentDidMount(props) {
    ValidatorForm.addValidationRule("isColorNameUnique", value => this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule("isColorUnique", value => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
);
ValidatorForm.addValidationRule("isPaletteNameUnique", value => this.props.palettes.every(
  ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
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
    const newColor = {color:this.state.currentColor, name:this.state.newColorName}
    this.setState({colors:[...this.state.colors, newColor], newColorName:""});
  }
  handleChange(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }
  savePalette(newPaletteName){    
    const newPalette = {
      paletteName:newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    console.log(newPalette);
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }
  removeColor(newColor){
    this.setState({
      colors: this.state.colors.filter(color => color.name !== newColor)
    })
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      items: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  clearColors(){
    this.setState({colors: []})
  }
  addRandomColor(){
    const allColors = this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor=allColors[rand];
    this.setState({
      colors: [...this.state.colors, randomColor]
    })}
  render() {
    const { classes, maxColors } = this.props;
    const { open, currentColor, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>       
        <NavbarForm open={open} classes={classes} savePalette={this.savePalette} handleDrawerOpen={this.handleDrawerOpen}/>
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
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
              <ChromePicker
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
             value={this.state.newColorName}
             name='newColorName'
             onChange={this.handleChange}
             validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={["this field is required", "color names must be unique", "color already used"]}
             />
             <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: paletteIsFull?"grey":currentColor }}
            type='submit'
            disabled = {paletteIsFull}
          >{paletteIsFull? "Palette full": "Add Color"}
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
          <DraggableColorList color={colors} removeColor={this.removeColor} axis='xy' onSortEnd={this.onSortEnd}/>         
            
          
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);