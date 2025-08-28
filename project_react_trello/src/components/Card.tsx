import React from "react";
import { CardContainer } from "../utils/styles";

interface CardProps{
    text:string;
}

export const Card = ({text}: CardProps) =>{
    return <CardContainer>{text}</CardContainer>
}