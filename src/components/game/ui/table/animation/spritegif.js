import{ useState, useEffect, useRef } from "react";
import { Group, Sprite } from "react-konva";
// import axe from '../../../../../assets/images/table/Animation_gif/Axehitting-1.png'


function Spritegif(props) {
  const [imgOptions, setImgOptions] = useState({
    image: null
  });

  const spriteRef = useRef();

  useEffect(() => {
    const image = new window.Image();
    // image.src = "https://konvajs.github.io/assets/blob-sprite.png";
    image.src = props.src;
    image.onload = () => {
      // set image only when it is loaded
      setImgOptions({
        image: image
      });

      spriteRef.current.start();
    };
  },[]);

  const animations = {
    // idle: [2, 2, 70, 119, 71, 2, 74, 119, 146, 2, 81, 119, 226, 2, 76, 119],
    punch: [
         60, 25,250, 200,
         363, 25, 250, 200,
        60, 328, 250, 200,
        363, 328, 250, 200,
        60, 631, 250, 200,
        363, 631, 250, 200,
        60, 934, 250, 200,
        363, 934, 250, 200,
        60, 1237, 250, 200,
        363, 1237, 250, 200,
        60, 1540, 250, 200,
        363, 1540, 250, 200,
        60, 1845, 250, 200,
        363, 1845, 250, 200,
        60, 2146, 250, 200,
        361, 2146, 250, 200,
        60, 2447, 250, 200,
        361, 2447, 250, 200,
        60, 2748, 250, 200,
        361, 2748, 250, 200,
        60, 3049, 250, 200,
        361, 3049, 250, 200,
        60, 3350, 250, 200,
        361, 3350, 250, 200,
        60, 3651, 250, 200,
        361, 3651, 250, 200,
        60, 3952, 250, 200,
        361, 3952, 250, 200,
        60, 4253, 250, 200,
        361, 4253, 250, 200,
        60, 4554, 250, 200,
        361, 4554, 250, 200,
        60, 4855, 250, 200,
        361, 4855, 250, 200,
        60, 5156, 250, 200,
        361, 5156, 250, 200,
        60, 5457, 250, 200,
        361, 5457, 250, 200,
        60, 5758, 250, 200,
        361, 5758, 250, 200,
        60, 6059, 250, 200,
        361, 6059, 250, 200,
        60, 6360, 250, 200,
        361, 6360, 250, 200,
        60, 6661, 250, 200,
        361, 6661, 250, 200,
        60, 6962, 250, 200,
        361, 6962, 250, 200,
        60, 7263, 250, 200,
        361, 7263, 250, 200,
        60, 7564, 250, 200,
        ]
  };

  return (

      
     
          <Group >
            {/* <Image image={imgOptions.image} x={0} y={0}/> */}
            <Sprite
              ref={spriteRef}
              image={imgOptions.image}
              animation="punch"
              frameRate={40}
              frameIndex={0}
              animations={animations}
              x={props.x}
              y={props.y}
              scaleX={0.8}
              scaleY={0.8}
              
            //   stroke={"#FF0000"}
            />
          </Group>
      
  );
}
export default Spritegif;



