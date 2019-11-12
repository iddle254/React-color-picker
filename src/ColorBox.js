import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

const styles = {
    colorBox: {
        width: "20%",
    height: props => (props.showingFullPalette ? "25%":"50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-0.35px",
    "&:hover button":{
        opacity: 1,
        transition: 0.5
    }
    },
    copyText:{
        color: props => chroma(props.background).luminance() >= 0.7 ? "black":"white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white":"black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)":"white",
        background: "rgba( 255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)":"white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        border: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        textDecoration: "none",
        opacity: 0
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    }
}

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
                <div style={{ background }} className={`copy-overlay ${copied && "show"}`} />
                <div className={`copy-msg ${copied && "show"}`}>
                    <h1 className={isLightColor &&"dark-text"}>Copied!!</h1>
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