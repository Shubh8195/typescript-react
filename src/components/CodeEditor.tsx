import { useEffect } from "react";
import { cn } from "@/lib/utils";
import flourite from "flourite";
import { codeSnippets, fonts } from "@/option";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import useStore from "@/store/Store";
const CodeEditor = () => {
  const store = useStore();

  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    useStore.setState({ code: randomSnippet.code });
  }, []);

  useEffect(() => {
    if (store.autoDetectLanguage) {
      const { language } = flourite(store.code, { noUnknown: true });

      useStore.setState({ language: language.toLowerCase() || "plaintext" });
    }
  }, [store.autoDetectLanguage, store.code]);

  return (
    <div
      className={cn(
        "min-w-[400px] border-2 rounded-xl shadow-2xl",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full w-3 h-3 bg-red-500"></div>
          <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
          <div className="rounded-full w-3 h-3 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) => useStore.setState({ title: e.target.value })}
            spellCheck={false}
            onClick={(e) => {
              // e.persist();
              const target = e.target as HTMLInputElement;
              target.select();
            }}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200"
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => useStore.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" })
              .value
          }
          style={{
            fontFamily: fonts[store.fontStyle].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => {
            // e.persist();
            const target = e.target as HTMLTextAreaElement;
            target.select();
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
