import useStore from "@/store/Store";
import { Switch } from "../ui/switch";

const DarkMode = () => {
  const darkMode: boolean = useStore((state) => state.darkMode);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Dark Mode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) =>
          useStore.setState({ darkMode: checked })
        }
        className="my-1.5"
      />
    </div>
  );
};
 
export default DarkMode;
