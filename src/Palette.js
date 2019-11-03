import React, { Component } from 'react';
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 500 };
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level){
        this.setState({ level });
        console.log(level);
    }
    render() {
        const { level } = this.state;
        const colorBoxes = this.props.palette.colors[level].map(color => <ColorBox background={color.hex} name={color.name} />)
        return (
            <div className='Palette'>
                <Slider defaultValue={level} min={100} max={900} onAfterChange={this.changeLevel} step={100} />
                {/*navbar*/}
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/*footer*/}
            </div>
        )
    }
}

export default Palette