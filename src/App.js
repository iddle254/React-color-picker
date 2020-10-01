import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import TestNewformPalette from './TestNewformPalette';
import { generatePalette } from './colorHelper';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {palettes: seedColors}
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id){
    return this.state.palettes.find(function(palette) {
      
      return palette.id === id;
    });
  }
  savePalette(newPalette){
    this.setState({ palettes: [...this.state.palettes, newPalette]});
  }
  render() {
    return (
      <Switch>
        {/* //route New palette */}
        <Route exact path='/palette/test' render={()=><TestNewformPalette/>} />

        <Route exact path='/palette/new' render={(routeProps)=><NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette}/>} />
        {/* //route paletteList */}
        
        <Route exact path='/' render={(routeProps)=> <PaletteList palettes={this.state.palettes} {...routeProps}/>}/>
                {/* //route palette */}

        <Route exact path='/palette/:id' render={routeProps => (
          
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
            )}
             />
                     {/* //route single color palette */}

             <Route exact path='/palette/:paletteId/:colorId'
             render={routeProps => (
              <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} routeProps={routeProps} />
              )} />
      </Switch>
    );
  }  
}

export default App;
