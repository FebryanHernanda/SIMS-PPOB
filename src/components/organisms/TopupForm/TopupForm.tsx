import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { moneyFormat } from "../../../utils/moneyFormat";
import type { RootState } from "../../../redux/store";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import { setNominal } from "../../../redux/slices/TopUpSlices";
import { openModal } from "../../../redux/slices/DialogSlices";
type FormValues = {
  nominal: string;
};
const TopupForm = () => {
  const dispatch = useDispatch();
  const nominalState = useSelector((state: RootState) => state.topup.nominal);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nominal: "",
    },
  });

  const nominal = watch("nominal");

  useEffect(() => {
    setValue("nominal", nominalState);
  }, [nominalState, setValue]);

  useEffect(() => {
    dispatch(setNominal(nominal));
  }, [dispatch, nominal]);

  const onSubmit = (data: FormValues) => {
    if (data.nominal && !isNaN(Number(data.nominal))) {
      dispatch(openModal());
    }
    console.log("Data Kamu : ", data.nominal);
  };

  const isDisabled = !nominal || isNaN(Number(nominal));

  return (
    <>
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
                  required
                />
              );
            }}
          />
          <Button
            type="submit"
            disabled={isDisabled}
            variant={isDisabled ? "disabled" : "primary"}
          >
            Top Up
          </Button>
        </div>
        {errors.nominal && (
          <p className="text-red-500 text-sm mt-1">{errors.nominal.message}</p>
        )}
      </form>
    </>
  );
};

export default TopupForm;
