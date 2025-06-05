import { useLocation } from "react-router-dom";
import { Button, Image, Typography } from "../../components/atoms";
import { PembayaranForm } from "../../components/organisms";
import { DialogModal } from "../../components/molecules";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  closeModal,
  openErrorModal,
  openSuccessModal,
  setLoading,
} from "../../redux/slices/DialogSlices";
import { moneyFormat } from "../../utils/moneyFormat";

const PembayaranPage = () => {
  const location = useLocation();
  const layanan = location.state?.layanan;

  const dispatch = useDispatch();
  const { nominal } = useSelector((state: RootState) => state.payment);
  const { isLoading, isModalOpen, isSuccessModal, isErrorModal } = useSelector(
    (state: RootState) => state.dialog
  );

  // simulate payment

  const simulatePayment = async () => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.25;
        resolve(success);
      }, 2000);
    });
  };

  //confirm payment function

  const onConfirmPayment = async () => {
    dispatch(setLoading(true));
    const success = await simulatePayment();
    dispatch(setLoading(false));
    dispatch(closeModal());
    if (success) {
      dispatch(openSuccessModal());
      console.log("Pembayaran Sukses: ", moneyFormat(nominal));
    } else {
      dispatch(openErrorModal());
      console.log("Pembayaran Gagal : ", moneyFormat(nominal));
    }
  };

  return (
    <section className="flex flex-col gap-5 py-5">
      <Typography variant="h3">Pembayaran</Typography>
      <div className="flex items-center gap-5">
        <Image src={layanan.image} alt="logo layanan" className="w-10" />
        <Typography variant="h4">{layanan.name} Prabayar</Typography>
      </div>
      <PembayaranForm />

      {/* Top up Modal */}
      <DialogModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        nominal={Number(nominal)}
        title={`Beli ${layanan.name} Prabayar sebesar`}
      >
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant="linkPrimary"
            onClick={onConfirmPayment}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-gray-700 border-t-transparent rounded-full" />
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
        message="Gagal!"
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
