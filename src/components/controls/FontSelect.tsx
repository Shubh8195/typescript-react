import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fonts } from "@/option";
import useStore from "@/store/Store";

const FontSelect = () => {
  const fontStyle: string = useStore((state) => state.fontStyle);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Fonts
      </label>
      <Select value={fontStyle} onValueChange={(fontStyle)=> useStore.setState({fontStyle}) }>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(fonts).map(([name, font]: [string, any]) => (
            <SelectItem key={name} value={name}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSelect;
