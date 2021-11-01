import React, { Component,useState,useEffect } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Text,Line,Image } from 'react-konva';
import { useSpring,Spring, animated } from '@react-spring/konva';
import useImage from 'use-image';
//image import field
import product01 from "../assets/product01.png"
import "./HomePageKonva.scss"
import {easeCubic} from 'd3-ease'
// setup pattern & animation field
function Triangle1(){
  const p1 = useSpring({
    config:{duration: 1000},
    from: {
      x: window.innerWidth/5, 
        y: window.innerHeight/3,
        shadowBlur: 0,
        rotation:0,
        scaleX:0,
        scaleY:0,
        opacity:0, 
        offset: {
          x: 50,
          y: 55,
        }, 
    },
    to: {
      x: window.innerWidth/5,
        y: window.innerHeight/3.5,
        // shadowBlur:5,
        rotation:300,
        scaleX:0.5,
        scaleY:0.5,
        opacity:0.7,
        width: 50,
        height:  50
    }
  })
  return(
      <animated.Line {...p1} points={[23, 50, 23, 160, 100, 93]} fill={"hotpink"} stroke={"black"} strokeWidth={0} closed={true} draggable/>
  )
}
function Triangle2(){
  const p1 = useSpring({
    config:{duration: 1000},
    from: {
      x: window.innerWidth/5, 
        y: window.innerHeight/3,
        shadowBlur: 0,
        rotation:0,
        scaleX:0,
        scaleY:0,
        opacity:0, 
        fill: 'rgb(10,50,19)',
        offset: {
          x: 50,
          y: 55,
        }, 
    },
    to: {
      x: window.innerWidth/2.2,
        y: window.innerHeight/2,
        // shadowBlur:5,
        rotation:480,
        scaleX:0.4,
        scaleY:0.4,
        opacity:0.5,
        fill: 'hotpink',
        width: 50,
        height:  50
    }
  })
  return(
      <animated.Line {...p1} points={[23, 50, 23, 160, 100, 93]} fill={"#00D2FF"} stroke={"black"} strokeWidth={0} closed={true} draggable/>
  )
}






export function HomepageCanvas(){
  // const e = easeCubic(0.25);

  //Image field
  const [pro01] = useImage(product01);
  
  //***  resize config  ***//
  //***  resize config  ***//
  var SCENE_BASE_WIDTH = 800;
  var SCENE_BASE_HEIGHT = 600;
  const aspectRatio = 16 / 9
  const widthAR = window.innerWidth * 0.8
  console.log("widthAR", widthAR);
  const heightAR = widthAR / aspectRatio
  console.log("heightAR", heightAR);

  const [size, setSize] = React.useState({
    width: window.innerWidth * 0.8,
    // height: window.innerHeight
    height: (window.innerWidth * 0.8) / aspectRatio
  });
  React.useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth * 0.8,
        height: (window.innerWidth * 0.8) / aspectRatio
      });
    };

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const scale = size.width / SCENE_BASE_WIDTH;
  //***  resize config  ***//
  //***  resize config  ***//

 
  
  const styles = useSpring({
    
    to: async (next, cancel) => {
      await next({ opacity: 1, fill: '#ffaaee' })
      await next({ opacity: 1, fill: 'rgb(14,26,19)' })
    },
    config:{
      duration: 1200,
      easing:easeCubic,
      delay:2500,
      loop: true,
    },
    from: { opacity: 1, fill: 'red' },
    to:{ opacity: 1, fill: 'blue' }
  })
  const title = useSpring({
    config:{
      duration: 2500,
      easing:easeCubic,
    },
    from: {
        x: size.width/7, 
        y: size.height/6,
        // shadowBlur: 0,
        rotation:0,
        // scaleX:1,
        // scaleY:1,
        opacity:0,
    },
    to: {
        x: size.width/7,
        y: size.height/20,
        shadowBlur:20,
        opacity:1,
        
    }
  })
//** BG_Triangle1 **//
  //** BG_Triangle1 **//
  const [BGTriangle1,setBGTriangle1] = useSpring(()=>({
    config:{
      duration: 2500,
      easing:easeCubic,
    },
    to: async (next, cancel) => {
      await next({
        x: size.width/2.4,
        y: size.height/2,
        opacity:0.1,
        scaleX:1.4,
        scaleY:1.4,
      })
    },

    from: {
        x: size.width/2.4, 
        y: size.height/1.6,
        opacity:0,
        scaleX:1.4,
        scaleY:1.4,
        // rotation:30,
    },
  }))
  const [BGTriangleLoop1, setBGTriangleLoop1] = useSpring(() => ({
    config:{
      duration: 200000,
      // easing:easeCubic,
      // delay:2500,
    },
    from: { 
      x: size.width/2.4,
      y: (size.height/2),
      rotation:0,
      scaleX:1.4,
        scaleY:1.4,
         opacity: 0.1 },
  }))

    useEffect(() => {
      const timer = setTimeout(() => {
        setBGTriangleLoop1({
          x: size.width/2.4,
          y: (size.height/2),
          rotation:360,
          scaleX:1.4,
        scaleY:1.4,
          loop: true ,
        })
        setBGTriangleNowEffect(BGTriangleLoop1)

      }, 2500);
      return () => clearTimeout(timer);
    }, [])

  const[ BGTriangleNowEffect, setBGTriangleNowEffect]=useState(BGTriangle1)
  //** BG_Triangle1 **//
  //** BG_Triangle1 **//

  // ** BG LINE Animation **//
  // ** BG LINE Animation **//
  const LineAnimation = useSpring({
    config:{
      duration:1500,
      },
    from:{
      opacity: 0
    },
    to:{
      opacity:1
    }
  })
  // ** BG LINE Animation **//
  // ** BG LINE Animation **//

  // ** product Animation ** //
  // ** product Animation ** //
  const [proSpring01,setProSpring01] = useSpring(()=>({
    config:{
      duration: 2500,
      easing:easeCubic,
    },
    // loop:true,
    to: async (next, cancel) => {
      await next({
        x: size.width/4,
        y: size.height/4,
        shadowBlur:20,
        scaleX:0.4,
        scaleY:0.4,
        opacity:1,
      })
      // cancel()
    },

    from: {
        x: size.width/4, 
        y: size.height/3,
        shadowBlur: 0,
        scaleX:0.4,
        scaleY:0.4,
        opacity:0,
        // rotation:30,
    },
  }))
  const [loop, setLoop] = useSpring(() => ({
    config:{
      duration: 1300,
      easing:easeCubic,
      // delay:2500,
    },
    from: { 
      x: size.width/4,
      y: (size.height/4),
      scaleX:0.4,
        scaleY:0.4,
        shadowBlur:20,
         opacity: 1 },
  }))
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoop({
          x: size.width/4,
          y: (size.height/4)+9,
          opacity: 1,
          scaleX:0.4,
        scaleY:0.4,
        shadowBlur:20,
          loop: { reverse: true },
        })
        setNowEffect(loop)

      }, 2500);
      return () => clearTimeout(timer);
    }, [])

  const[ nowEffect, setNowEffect]=useState(proSpring01)

  // ** product Animation ** //
  // ** product Animation ** //
  


  //** Triangle1 **//
  //** Triangle1 **//
  const [TriangleA1,setTriangleA1]  = useSpring(()=>({
    config:{duration: 800},
    to: async (next, cancel) => {
      await next({
        x: size.width/4,
        y: size.height/3.5,
        // shadowBlur:5,
        rotation:630,
        scaleX:0.5,
        scaleY:0.5,
        opacity:0.7,
        width: 50,
        height:  50
      })
    },
    from: {
      x: size.width/2.5, 
        y: size.height/3,
        shadowBlur: 0,
        rotation:0,
        scaleX:0,
        scaleY:0,
        opacity:0, 
    },
    // to: {
    //   x: size.width/5,
    //     y: size.height/3.5,
    //     // shadowBlur:5,
    //     rotation:630,
    //     scaleX:0.5,
    //     scaleY:0.5,
    //     opacity:0.7,
    //     width: 50,
    //     height:  50
    // }
  }))

  const [TLoop1, setTLoop1] = useSpring(() => ({
    config:{
      duration: 100000,
      // easing:easeCubic,
      // delay:2500,
    },
    from: { 
      x: size.width/4,
      y: (size.height/3.5),
      rotation:630,
      scaleX:0.5,
        scaleY:0.5,
         opacity: 0.7 },
  }))

    useEffect(() => {
      const timer = setTimeout(() => {
        setTLoop1({
          x: size.width/4,
          y: (size.height/3.5),
          scaleX:0.5,
        scaleY:0.5,
          rotation:930,
        })
        setTNowEffect1(TLoop1)

      }, 800);
      return () => clearTimeout(timer);
    }, [])
  const [TNowEffect1,setTNowEffect1]= useState(TriangleA1)
  //** Triangle1 **//
  //** Triangle1 **//

  //** Triangle2 **//
  //** Triangle2 **//
  const [TriangleA2,setTriangleA2]  = useSpring(()=>({
    config:{duration: 800},
    to: async (next, cancel) => {
      await next({
        x: size.width/1.8,
        y: size.height/1.6,
        // shadowBlur:5,
        rotation:480,
        opacity:0.5,
        fill: 'hotpink',
      })
    },
    from: {
      x: size.width/3, 
        y: size.height/3,
        shadowBlur: 0,
        rotation:0,
        opacity:0, 
        fill: 'rgb(10,50,19)',
    },
    
  }))

  const [TLoop2, setTLoop2] = useSpring(() => ({
    config:{
      duration: 100000,
      // easing:easeCubic,
      // delay:2500,
    },
    from: { 
      x: size.width/1.8,
      y: (size.height/1.6),
      rotation:480,
         opacity: 0.7 },
  }))

    useEffect(() => {
      const timer = setTimeout(() => {
        setTLoop2({
          x: size.width/1.8,
          y: (size.height/1.6),
          rotation:730,
        })
        setTNowEffect2(TLoop2)

      }, 800);
      return () => clearTimeout(timer);
    }, [])
  const [TNowEffect2,setTNowEffect2]= useState(TriangleA2)
  //** Triangle2 **//
  //** Triangle2 **//


  

  




    return(
      // <Stage width={window.innerWidth} height={window.innerHeight} className={"Konva_canvas"}>
      <Stage width={size.width}
      height={size.height}
      scaleX={scale}
      scaleY={scale} className={"Konva_canvas"}>
        <Layer>
          {/* Background*/}
          {/* Cross line*/}
          {/* <animated.Line points={[0, 0, {widthAR}, {heightAR}]} stroke={"grey"} strokeWidth={3} closed={true} draggable/> */}
          <animated.Line {...LineAnimation} points={[0, 0, 1000, 560]} stroke={"lightgrey"} strokeWidth={1} closed={true} />
          <animated.Line {...LineAnimation} points={[0, 860, 800, 0]} stroke={"lightgrey"} strokeWidth={1} closed={true} />
          {/* BG_Triangle1*/}
          <animated.Line  points={[23, 50, 23, 160, 100, 93]} fill={"purple"} stroke={"black"} strokeWidth={0} closed={true} />
          <animated.Line {...BGTriangleNowEffect}  offsetX={117} offsetY={131} points={[23, 50, 80, 250, 250, 93]} opacity={1} fill={"white"} stroke={"black"} strokeWidth={0} closed={true} />
          <animated.Line {...BGTriangleNowEffect}  offsetX={117} offsetY={131} points={[23, 50, 80, 250, 250, 93]}  fill={"darkBlue"} stroke={"black"} strokeWidth={0} closed={true} />



          {/* Title*/}
          <animated.Text text="SNEAKER" fill={`white`} fontStyle={`bold`} fontSize={120} fontWeight={900} className={"Konva_title"}{...title}/>
          {/* Product*/}
          <animated.Image  image={pro01} {...nowEffect} />
          {/* Triangle1 */}
          <animated.Line {...TNowEffect1} points={[23, 50, 23, 160, 100, 93]} offsetX={48} offsetY={101} fill={"hotpink"} stroke={"black"} strokeWidth={0} closed={true} />
          {/* Triangle2 */}
          <animated.Line {...TNowEffect2} points={[23, 50, 23, 130, 80, 93]} offsetX={48} offsetY={101} fill={"#00D2FF"} stroke={"black"} strokeWidth={0} closed={true} />

        </Layer>
      </Stage>
    )
  
}