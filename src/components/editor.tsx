import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

import { useState } from "react";

import "./editor.css";

type Editprops = {
  language: string;
  value: string;
  extension: any;
  onChange:any;
};

const iconclass1="bi bi-arrows-angle-contract";
const iconClass2="bi bi-arrows-angle-expand"


const Editor = (props: Editprops) => {
  const [first, setfirst] = useState(false)
  const [width, setWidth] = useState<string>("600px")
  const [icon, setIcon] = useState(iconclass1)
 const handleClick=():void=>{
  if(first!==true){
    setfirst(true)
    setWidth("200px")
    setIcon(iconClass2)
  }
  else{
    setfirst(false)
    setWidth("600px")
    setIcon(iconclass1)
  }
 }
  return (
    <div className="container" style={{width:`${width}`}}>
      <div className="oc">
        <h6>{props.language}</h6>
        <div className="buttoncont">
          <button className="fullscreen" onClick={()=>{handleClick()}}>
          <i className={icon}></i>
          </button>
        
        </div>
      </div>
      <div className="editor">
        <CodeMirror
          value={props.value}
          height="400px"
          theme={dracula}
          extensions={[props.extension]}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default Editor;
