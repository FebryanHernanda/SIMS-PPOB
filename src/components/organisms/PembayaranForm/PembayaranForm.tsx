import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import { InputField } from "../../molecules";
import type { RootState } from "../../../redux/store";
import { setNominal } from "../../../redux/slices/PembayaranSlices";
import { openModal } from "../../../redux/slices/DialogSlices";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import moneyFormat from "../../../utils/moneyFormat";

const PembayaranForm = () => {
  const dispatch = useDispatch();
  const nominalState = useSelector((state: RootState) => state.payment.nominal);
  type FormValues = {
    nominal: string;
  };

  const location = useLocation();
  const layanan = location.state?.layanan;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nominal: nominalState,
    },
  });

  useEffect(() => {
    if (layanan?.service_tariff) {
      setValue("nominal", layanan.service_tariff.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [layanan, nominalState, setValue]);

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
                readOnly
              />
            );
          }}
        />
        <Button type="submit">Bayar</Button>
      </div>
      {errors.nominal && (
        <p className="mt-1 text-sm text-red-500">{errors.nominal.message}</p>
      )}
    </form>
  );
};

export default PembayaranForm;
