import { useLocation } from "react-router-dom";
import { Button, Image, Typography } from "../../components/atoms";
import { PembayaranForm } from "../../components/organisms";
import { DialogModal } from "../../components/molecules";
import {
  closeModal,
  openErrorModal,
  openSuccessModal,
  setLoading,
} from "../../redux/slices/DialogSlices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  postPayment,
  type TransactionData,
} from "../../redux/slices/PembayaranSlices";
import { updateBalance } from "../../redux/slices/BalanceSlice";

const PembayaranPage = () => {
  const location = useLocation();
  const layanan = location.state?.layanan;

  const dispatch = useAppDispatch();
  const { nominal } = useAppSelector((state) => state.payment);
  const { isLoading, isModalOpen, isSuccessModal, isErrorModal } =
    useAppSelector((state) => state.dialog);
  const error = useAppSelector((state) => state.payment.error);
  const balance = useAppSelector((state) => state.balance.balance);

  const onConfirmPayment = async () => {
    dispatch(setLoading(true));

    if (Number(nominal) > balance) {
      dispatch(setLoading(false));
      dispatch(closeModal());
      dispatch(openErrorModal());
      return;
    }

    const transactionData = {
      invoice_number: "",
      service_code: layanan.service_code,
      service_name: layanan.service_name,
      description: layanan.service_name,
      transaction_type: "PAYMENT",
      total_amount: Number(nominal),
      created_on: new Date().toISOString(),
    } as TransactionData;

    const resultAction = await dispatch(postPayment(transactionData));

    dispatch(setLoading(false));
    dispatch(closeModal());

    if (postPayment.fulfilled.match(resultAction)) {
      dispatch(openSuccessModal());
      dispatch(updateBalance(-Number(nominal)));
    } else {
      dispatch(openErrorModal());
    }
  };

  return (
    <section className="flex flex-col gap-5 py-5">
      <Typography variant="h3">Pembayaran</Typography>
      <div className="flex items-center gap-5">
        <Image
          src={layanan?.service_icon}
          alt="logo layanan"
          className="w-10"
        />
        <Typography variant="h4">{layanan.service_name}</Typography>
      </div>
      <PembayaranForm />

      {/* Top up Modal */}
      <DialogModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        nominal={Number(nominal)}
        title={`Beli ${layanan.service_name} Prabayar sebesar`}
      >
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant="linkPrimary"
            onClick={onConfirmPayment}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-gray-700 rounded-full animate-spin border-t-transparent" />
                Loading...
              </div>
            ) : (
              "Ya, Lanjutkan"
            )}
          </Button>
          <Button
            type="button"
            variant="linkSecondary"
            onClick={() => dispatch(closeModal())}
          >
            Batalkan
          </Button>
        </div>
      </DialogModal>

      {/* Success Dialog */}
      <DialogModal
        isOpen={isSuccessModal}
        onClose={() => dispatch(closeModal())}
        nominal={Number(nominal)}
        title="Pembayaran Sebesar"
        message="Berhasil!"
        status="success"
      >
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant="linkSecondary"
            onClick={() => dispatch(closeModal())}
            className="w-30"
          >
            Keluar
          </Button>
        </div>
      </DialogModal>

      {/* Error Dialog */}
      <DialogModal
        isOpen={isErrorModal}
        onClose={() => dispatch(closeModal())}
        nominal={Number(nominal)}
        title="Pembayaran Sebesar"
        message={error || "Gagal! Pastikan Saldo Anda Cukup"}
        status="error"
      >
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant="linkSecondary"
            onClick={() => dispatch(closeModal())}
            className="w-30"
          >
            Keluar
          </Button>
        </div>
      </DialogModal>
    </section>
  );
};

export default PembayaranPage;
