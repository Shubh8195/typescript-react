import "./App.css";
import { useEffect, useRef } from "react";
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

function App() {
  const editorRef = useRef(null);
  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

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
        <Resizable
          enable={{ left: true, right: true }}
          minWidth={padding * 2 + 400}
        >
          <div
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
