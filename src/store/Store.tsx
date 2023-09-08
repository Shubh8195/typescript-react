import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface UseStore {
//   code: string
//   title: string
//   theme: string
//   darkMode: boolean;
//   showBackground: boolean;
//   language: string
//   autoDetectLanguage: boolean;
//   fontSize: number;
//   fontStyle: string
//   padding: number;
// }

const useStore = create(
  persist(
    () => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: true,
      fontSize: 18,
      fontStyle: "jetBrainsMono",
      padding: 64,
    }),
    {
      name: "user-preferences",
    }
  )
);

export default useStore;
