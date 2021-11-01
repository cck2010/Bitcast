import React, { Component,useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Text,Line,Image } from 'react-konva';
import { useSpring,Spring, animated } from '@react-spring/konva';
import star from "../assets/start.png"
import useImage from 'use-image';

// setup pattern & animation field

function Starpop(){
  var amplitude = 100;
  var period = 2000;
      // in ms
  var centerX = window.innerWidth / 2;
  const [image] = useImage(star);
  const p3 = useSpring({
    config:{duration: 5000},
    from: {
      x: window.innerWidth/2,
      y: window.innerHeight/2-20,
      rotation:0,
      opacity:0.7,
      scaleX:1,
      scaleY:1,

    },
    to: {
      config:{duration: 500},
      x: window.innerWidth/2 -200 + Math.floor(Math.random()*550),
      y: window.innerHeight/2-500,
      rotation: Math.floor(Math.random()*350),
      scaleX:1,
      scaleY:1,
      // scaleX:Math.random()*9,

    },
    to: {
      config:{duration: 500},
      x: window.innerWidth/2 -200 + Math.floor(Math.random()*550),
      y: window.innerHeight/2-500,
      rotation: Math.floor(Math.random()*500),
      scaleX:1,
      scaleY:1,
      // scaleX:Math.random()*9,

    },
  })
  return (
      <animated.Image  image={image} {...p3} width={30} height={30} />
  )
}





export function Canvass(){
  const[starList, setStar] = useState([]);
  const onAddBtnClick = event => {
    // console.log("input")
    setStar(starList.concat(<Starpop />));
  };
  const [image] = useImage(star);
  const starAnimation = useSpring({
    config:{duration: 1000},
    from: {
      x: window.innerWidth/2,
        y: window.innerHeight/2,
    },
    to: {
      x: window.innerWidth/2,
        y: window.innerHeight/2,
    
    }
  })
    return(
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {starList}
          <animated.Image  image={image} {...starAnimation} width={30} height={30} onClick={onAddBtnClick} />

        </Layer>
      </Stage>
    )
  
}