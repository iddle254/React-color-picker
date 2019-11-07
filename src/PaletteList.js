import React, { Component } from 'react'
import { withStyles } from "@material-ui/styles";
import MiniPalette from './MiniPalette';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
}

class PaletteList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}> 
            <div className={classes.container} >
                <nav className={classes.nav}>
                    <h1>React colors</h1>
                </nav>
                <div className={classes.palettes}>
                {palettes.map(palette => (
                <p>
                    <MiniPalette {...palette}/>
                </p>
            ))}
                </div>
            </div>          
            
            </div>            
        )
    }
}

export default withStyles(styles)(PaletteList);