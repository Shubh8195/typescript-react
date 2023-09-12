import { useRef } from "react";
import "./App.css";
import CodeEditor from "@/components/CodeEditor";
import { cn } from "./lib/utils";
import { fonts, themes } from "./option";
import useStore from "./store/Store";
import { Card } from "@/components/ui/card";
import ExportOptions from "@/components/controls/ExportOptions";

function App() {
  const editorRef= useRef(null);
  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  return (
    <>
      <main
        className={
          "dark min-h-screen flex justify-center items-center text-white bg-neutral-950"
        }
      >
        <link
          rel="stylesheet"
          href={themes[theme]?.theme}
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={fonts[fontStyle].src}
          crossOrigin="anonymous"
        />
        <div
          className={cn(
            "overflow-hidden mb-2 transition-all ease-out",
            showBackground ? themes[theme].background : "ring ring-neutral-900"
          )}
          style={{ padding }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>
        <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur" >
          <ExportOptions targetRef={editorRef}/>
        </Card>
      </main>
    </>
  );
}

export default App;
