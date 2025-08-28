import React from "react";
import { ColumnContainer, ColumnTitle } from "../utils/styles";
import { AddNewItem } from "./AddNewItem";

interface ColumnProps{
    text:string
}

export const Column = ({text, children }:React.PropsWithChildren<ColumnProps>) => {
    // console.log((props));
    // const {text} = props;
    // console.log(text);
    
    return (
        <ColumnContainer>
            <ColumnTitle>
                {text}
            </ColumnTitle>
            {children}
            <AddNewItem 
            toggleButtonText="Add another task"
            onAdd={console.log}
            dark
            />
        </ColumnContainer>
    )
}