import { DownloadIcon, ImageIcon, Link2Icon, Share } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {toBlob} from "html-to-image"
import { toast } from "react-hot-toast";

const ExportOptions = ({ targetRef }) => {

    const copyImage = async () => {
        const imgBlob = await toBlob(targetRef.current, {
            pixelRatio: 2
        })
        const img = new ClipboardItem({"image/png": imgBlob})
        navigator.clipboard.write([img])
    }
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={() => toast.promise(copyImage() , {
            loading: "Copying...",
            success: "Image copied to clipboard",
            error: "Something went wrong!"
        })}>
          <ImageIcon />
          Copy Image
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Link2Icon />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <DownloadIcon />
          Save as PNG
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <DownloadIcon />
          Save as SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
