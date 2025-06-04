import { Button } from "../../atoms";
import { InputField } from "../../molecules";

const TopupForm = () => {
  return (
    <>
      <form>
        <div className="flex flex-col gap-5">
          <InputField placeholder="Masukan Nominal Top Up" />
          <Button type="submit" variant="disabled">
            Top Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default TopupForm;
