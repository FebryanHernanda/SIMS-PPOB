import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import type { RootState } from "../../../redux/store";
import { setNominal } from "../../../redux/slices/PembayaranSlices";
import { openModal } from "../../../redux/slices/DialogSlices";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { moneyFormat } from "../../../utils/moneyFormat";

const PembayaranForm = () => {
  const dispatch = useDispatch();
  const nominalState = useSelector((state: RootState) => state.payment.nominal);
  type FormValues = {
    nominal: string;
  };

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nominal: nominalState,
    },
  });

  useEffect(() => {
    if (nominalState !== watch("nominal")) {
      setValue("nominal", nominalState);
    }
  }, [nominalState, setValue, watch]);

  const onSubmit = (data: FormValues) => {
    if (data.nominal && !isNaN(Number(data.nominal))) {
      dispatch(setNominal(data.nominal));
      dispatch(openModal());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <Controller
          name="nominal"
          control={control}
          render={({ field }) => {
            const rawValue = field.value.replace(/\D/g, "");
            const formattedValue = moneyFormat(rawValue);

            return (
              <InputField
                type="text"
                placeholder="Masukkan Nominal Top Up"
                value={formattedValue}
                onChange={(e) => {
                  const onlyNumber = e.target.value.replace(/\D/g, "");
                  field.onChange(onlyNumber);
                }}
              />
            );
          }}
        />
        <Button type="submit">Bayar</Button>
      </div>
      {errors.nominal && (
        <p className="text-red-500 text-sm mt-1">{errors.nominal.message}</p>
      )}
    </form>
  );
};

export default PembayaranForm;
