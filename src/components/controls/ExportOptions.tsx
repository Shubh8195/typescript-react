import { useEffect, type MutableRefObject } from "react";
import { toast } from "react-hot-toast";
import { toBlob, toPng } from "html-to-image";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ArrowBigUp,
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share,
} from "lucide-react";
import useStore from "@/store/Store";

interface ExportOptionsProps {
  targetRef: MutableRefObject<HTMLDivElement | null>;
}

type saveImage = (name: string, format: string) => any;

const ExportOptions: React.FC<ExportOptionsProps> = ({ targetRef }) => {
  const store = useStore();
  const copyImage = async () => {
    if (targetRef && targetRef.current) {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });

      if (imgBlob) {
        const img = new ClipboardItem({ "image/png": imgBlob });
        navigator.clipboard.write([img]);
      }
    }
  };

  const copyLink = () => {
    const state = useStore.getState();
    const queryParamsArray = Object.entries(state).map(([key, value]) => {
      // Encode the values as needed (e.g., using encodeURIComponent)
      if (key === "code") {
        value = btoa(state.code); // Encode the 'code' property with btoa
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

    const queryString = queryParamsArray.join("&");

    const queryParams = new URLSearchParams(queryString);

    navigator.clipboard.writeText(`${location.href}?${queryParams}`);
  };

  const saveImage: saveImage = async (name, format) => {
    let imgUrl, filename;
    if (targetRef && targetRef.current) {
      switch (format) {
        case "PNG":
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.png`;
          break;
        case "SVG":
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.svg`;
          break;

        default:
          return;
      }

      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = filename;
      a.click();
    }
  };

  useEffect(() => {
    function handleCopyShortcut(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "c") {
        event.preventDefault();
        copyImage();
      } else if (event.ctrlKey && event.shiftKey && event.key === "C") {
        event.preventDefault();
        copyLink();
      }
    }

    document.addEventListener("keydown", handleCopyShortcut);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleCopyShortcut);
    };
  }, []);

  useEffect(() => {
    function handleSaveShortcut(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveImage(store.title, "PNG");
      } else if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault();
        saveImage(store.title, "SVG");
      }
    }
    document.addEventListener("keydown", handleSaveShortcut);

    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem
          className="gap-2"
          onClick={() =>
            toast.promise(copyImage(), {
              loading: "Copying...",
              success: "Image copied to clipboard",
              error: "Something went wrong!",
            })
          }
        >
          <div className="w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Copy Image
            </div>
            <div className="flex items-center flex-en gap-1">
              <code>Ctrl</code>+ C
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            copyLink(), toast.success("Link copied to clipboard");
          }}
        >
          <div className="w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Link2Icon className="h-4 w-4" />
              Copy Link
            </div>
            <div className="flex items-center gap-1">
              <ArrowBigUp className="h-4 w-4" />
              +
              <code>Ctrl</code>+ C
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() =>
            toast.promise(saveImage(store.title, "PNG"), {
              loading: "Exporting PNG image...",
              success: "Exported Successfully",
              error: "Something went wrong!",
            })
          }
        >
          <div className="w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Save as PNG
            </div>
            <div className="flex items-center flex-en gap-1">
              <code>Ctrl</code>+ A
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() =>
            toast.promise(saveImage(store.title, "SVG"), {
              loading: "Exporting SVG image...",
              success: "Exported Successfully",
              error: "Something went wrong!",
            })
          }
        >
          <div className="w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Save as SVG
            </div>
            <div className="flex items-center gap-1">
              <ArrowBigUp className="h-4 w-4" />
              +
              <code>Ctrl</code>+ A
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
