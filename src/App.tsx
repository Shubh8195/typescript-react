import "./App.css";
import { useEffect, useRef, useState } from "react";
import useStore from "./store/Store";

import { cn } from "./lib/utils";
import CodeEditor from "@/components/CodeEditor";
import { Card, CardContent } from "@/components/ui/card";
import { Resizable } from "re-resizable";

import ExportOptions from "@/components/controls/ExportOptions";
import ThemeSelect from "./components/controls/ThemeSelect";
import LanguageSelect from "./components/controls/LanguageSelect";
import FontSelect from "./components/controls/FontSelect";
import FontSizeSelect from "./components/controls/FontSizeSelect";
import PaddingSlider from "./components/controls/PaddingSlider";
import BackgroundSwitch from "./components/controls/BackgroundSwitch";
import DarkMode from "./components/controls/DarkMode";
import { fonts, themes } from "./option";
import { Undo2 } from "lucide-react";

function App() {
  const editorRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [defaultWidth, setDefaultWidth] = useState<number | string>("");
  const [width, setWidth] = useState<number | string>("");
  const [isResizing, setIsResizing] = useState<boolean | null>(null);

  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  useEffect(() => {
    // Simulate data loading (replace this with your data loading logic)
    setTimeout(() => {
      // Once data is loaded, set dataLoaded to true
      setDataLoaded(true);
    }, 2000); // Adjust the timeout as needed

    // This effect will run whenever dataLoaded or elementRef changes
  }, [dataLoaded]);

  useEffect(() => {
    const element = document.getElementById("code-container");

    if (dataLoaded && element) {
      const elementWidth = element.clientWidth;
      setDefaultWidth(elementWidth);
      setWidth(elementWidth);
    }
  }, [dataLoaded]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);

    useStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  });
  return (
    <>
      <main
        className={
          "dark min-h-screen flex flex-col justify-center items-center text-white bg-neutral-950"
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
        <Resizable
          enable={{ left: true, right: true }}
          minWidth={padding * 2 + 400}
          size={{ width: width }}
          onResize={(_, __, elementRef) => {
            setWidth(elementRef.clientWidth);
            setIsResizing(true);
          }}
          onResizeStop={() => {
            setIsResizing(false);
          }}
        >
          <div
            id="code-container"
            className={cn(
              "overflow-hidden mb-2 transition-all ease-out",
              showBackground
                ? themes[theme].background
                : "ring ring-neutral-900"
            )}
            style={{ padding }}
            ref={editorRef}
          >
            <CodeEditor />
          </div>
        </Resizable>
        {isResizing === null ? null : typeof isResizing === "boolean" &&
          isResizing ? (
          <div className="inline-flex items-center justify-center w-full my-3">
            <hr
              className={`h-px bg-gray-200 border-0 dark:bg-gray-700`}
              style={{ width: width + "px" }}
            />
            <span className="absolute px-3 text-xs font-medium text-neutral-400  bg-neutral-950">
              {width} px
            </span>
          </div>
        ) : (
          <div
            className="flex gap-1 my-3 items-center text-neutral-400 cursor-pointer  hover:text-white"
            onClick={() => {
              setWidth(defaultWidth);
              setIsResizing(null);
            }}
          >
            <Undo2 className="text-xs h-4 w-4 font-medium  " />
            <span className="text-xs font-medium">Reset width</span>
          </div>
        )}
        <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
          <CardContent className="flex flex-wrap gap-6 p-0">
            <ThemeSelect />
            <LanguageSelect />
            <FontSelect />
            <FontSizeSelect />
            <PaddingSlider />
            <BackgroundSwitch />
            <DarkMode />
            <div className="w-px bg-neutral-800 " />
            <div className="place-self-center">
              <ExportOptions targetRef={editorRef} />
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default App;
