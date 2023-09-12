import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { themes } from "@/option";
import useStore from "@/store/Store";
const ThemeSelect = () => {
  const theme = useStore((state) => state.theme);
  
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Theme
      </label>
      <Select
        value={theme}
        onValueChange={(theme) => useStore.setState({ theme })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(themes).map(([name, theme]: [string, any]) => (
            <SelectItem key={name} value={name}>
              <div className="flex gap-2 items-center justify-between">
                <div className={cn("h-4 w-4 rounded-full", theme.background)} />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelect;
