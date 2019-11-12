import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false} ;
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({copied:true}, () => {
            setTimeout(() => this.setState({ copied: false}), 1500);
        });
    }
    render() {
        const { background, name, moreURL, showingFullPalette, classes} =this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.8;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div style={{ background}} className={classes.colorBox}>
                <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.show}`} />
                <div className={`${classes.copyMsg} ${copied && classes.show}`}>
                    <h1 className={isLightColor && classes.colorName}>Copied!!</h1>
                    <p className={classes.copyText}>{background}</p>
                    </div>
                <div className='copy-container'>
                    <div className={classes.boxContent}>
                        <span className={isDarkColor && "light-text"}>{name}</span>
                    </div>
                    <button className={classes.copyButton} >Copy</button>
                </div>
                {showingFullPalette && (<Link to={moreURL} onCLick={e => e.stopPropagation()}>
                <span className={classes.seeMore} >MORE</span>
                </Link>)}                                
            </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);