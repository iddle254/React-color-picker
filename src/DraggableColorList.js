import React from 'react';
import DraggableColorbox from './DraggableColorbox';
import {SortableContainer} from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({color, removeColor}) => {
    return (
        <div style={{ height: "100%"}}>
            {color.map((color, i) => <DraggableColorbox 
                                                key={color.name}
                                                index={i}    
                                                handleClick={()=> removeColor(color.name)} 
                                                color={color.color} 
                                                name={color.name}
                                                />
            )}
        </div>
    )
})

export default DraggableColorList;