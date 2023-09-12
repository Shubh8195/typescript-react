import useStore from "@/store/Store";
import { Switch } from "../ui/switch";

const BackgroundSwitch = () => {
  const showBackground: boolean = useStore((state) => state.showBackground);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Background
      </label>
      <Switch
        checked={showBackground}
        onCheckedChange={(checked) =>
          useStore.setState({ showBackground: checked })
        }
        className="my-1.5"
      />
    </div>
  );
};
 
export default BackgroundSwitch;
