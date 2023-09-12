
import useStore from "@/store/Store";
import { Slider } from "../ui/slider";

const PaddingSlider = () => {
    const padding: number = useStore((state) => state.padding);
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider 
      className="w-44 my-5"
      value={[padding]}
      step={8}
      max={128}
      onValueChange={([padding]) => useStore.setState({padding})}
      />
    </div>
  );
};

export default PaddingSlider;
