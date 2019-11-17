import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";

class ColorPickerForm extends Component {
    constructor(props) {
        super(props)

        this.state = {            
      currentColor: "blue",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(props) {
        ValidatorForm.addValidationRule("isColorNameUnique", value => this.props.palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
        );
        ValidatorForm.addValidationRule("isColorUnique", value => this.props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
          );
        }
    
  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex});
  }
  
  handleChange(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }
  handleSubmit(){      
    const newColor = {color:this.state.currentColor, name:this.state.newColorName};
    this.props.addColor(newColor);
  }

    render() {
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
            <ChromePicker
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator
             value={newColorName}
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
        )
    }
}

export default ColorPickerForm