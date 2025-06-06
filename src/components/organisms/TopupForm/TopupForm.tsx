import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import type { RootState } from "../../../redux/store";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import { setNominal } from "../../../redux/slices/TopUpSlices";
import { openModal } from "../../../redux/slices/DialogSlices";
import moneyFormat from "../../../utils/moneyFormat";
type FormValues = {
  nominal: string;
};
const TopupForm = () => {
  const dispatch = useDispatch();
  const nominalState = useSelector((state: RootState) => state.topup.nominal);
  const previousNominalState = useRef<string | undefined>(undefined);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      nominal: "",
    },
  });

  // Pantau perubahan nominal di form
  const nominal = watch("nominal");

  useEffect(() => {
    if (
      nominalState !== undefined &&
      nominalState !== previousNominalState.current
    ) {
      setValue("nominal", nominalState);
      previousNominalState.current = nominalState;
    }
  }, [nominalState, setValue]);

  const onSubmit = (data: FormValues) => {
    const numValue = Number(data.nominal);

    if (numValue >= 10000 && numValue <= 1000000) {
      dispatch(setNominal(data.nominal));
      dispatch(openModal());
    }
  };

  const isDisabled = !nominal || isNaN(Number(nominal));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="nominal"
            control={control}
            rules={{
              required: "Nominal top up wajib diisi",
              validate: (value) => {
                const numValue = Number(value);

                if (isNaN(numValue) || numValue <= 0) {
                  return "Nominal harus berupa angka yang valid";
                }

                if (numValue < 10000) {
                  return "Minimum nominal top up adalah Rp 10.000";
                }

                if (numValue > 1000000) {
                  return "Maksimum nominal top up adalah Rp 1.000.000";
                }

                return true;
              },
            }}
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
        <div>
          {errors.nominal && (
            <p className="mt-1 text-sm text-red-500">
              {errors.nominal.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default TopupForm;
