import { useState } from "react";
import { useEffect } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./App.css";
import Editor from "./components/editor";
import Navbar from "./components/navbar";

import useLocalStorage from "./hooks/useLocalstorage"

const extension1 = [javascript({ jsx: true })];
const extension2 = [html()];
const extension3 = [css()];

function App() {
  const [js, setJs] = useLocalStorage("Js","");
  const [htmlb, setHtmlb] = useLocalStorage("htmlb","");
  const [cssb, setCssb] = useLocalStorage("cssb","");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmlb}</body>
          <style>${cssb}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlb, cssb, js]);

  return (
    <div className="App">
      <Navbar />
      <div className="container-div">
        <Editor
          language={"html"}
          value={htmlb}
          extension={extension2}
          onChange={setHtmlb}
        />
        <Editor
          language={"css"}
          value={cssb}
          extension={extension3}
          onChange={setCssb}
        />{" "}
        <Editor
          language={"javascript"}
          value={js}
          extension={extension1}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="160"
          width="100%"
          height="420px"
        />
      </div>
    </div>
  );
}

export default App;
