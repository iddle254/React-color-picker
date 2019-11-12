import React from 'react';
import { withStyles } from "@material-ui/styles";

const styles = {
    PaletteFooter: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold"
    },
    
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem"
    }
}

function PaletteFooter (props){
    const { paletteName, emoji, classes} = props;

    return (
        <div>
            <footer className={classes.PaletteFooter}>
                    {paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </footer>
        </div>
    );
}
 export default withStyles(styles)(PaletteFooter);