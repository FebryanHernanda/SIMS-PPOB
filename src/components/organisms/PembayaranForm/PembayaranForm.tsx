import { Button } from "../../atoms";
import { InputField } from "../../molecules";

const PembayaranForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-5">
        <InputField placeholder="Nominal Pembayaran"></InputField>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default PembayaranForm;
