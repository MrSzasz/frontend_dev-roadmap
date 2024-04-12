import { LuArrowUp } from "react-icons/lu";
import { Button } from "../ui/button";

const GoToTop = (): React.ReactElement => {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      variant="outline"
      className="flex gap-2 justify-center items-center cursor-none"
      data-interactive
    >
      <LuArrowUp /> Inicio
    </Button>
  );
};

export default GoToTop;
