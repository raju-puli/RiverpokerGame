import React from "react";
// import { render } from "react-dom";
// import { Stage, Layer, Image } from "react-konva";
import { Image } from "react-konva";
// gifler will be imported into global window object
// import axe from '../../../../../assets/images/table/Animation_gif/Comp_2.gif'
import 'gifler';
// import {gifler} from 'gifler'

// the first very simple and recommended way:
const GIF = ({ src, x, y, visible1, sceonds }) => {
  const [hide, setHide] = React.useState(true)

  const imageRef = React.useRef(null);
  const canvas = React.useMemo(() => {
    const node = document.createElement("canvas");

    return node;
  }, []);

  React.useEffect(() => {

    // save animation instance to stop it on unmount
    let anim;
    window.gifler(src).get(a => {
      anim = a;
      anim.animateInCanvas(canvas);


      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);

        imageRef.current.getLayer().draw();
      };
      let clearGif = setTimeout(() => {
        setHide(false)
        anim.stop();
        visible1(false)
      }, 1000 * sceonds)

      return () => { clearTimeout(clearGif) }
    });

  }, [src, canvas]);

  return <Image height={150} x={x - 40} y={y - 30} visable={hide} width={150} image={canvas} ref={imageRef} />;
};

export default GIF;
