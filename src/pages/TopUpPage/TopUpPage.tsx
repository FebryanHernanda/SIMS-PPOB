import { postTopup, setNominal } from "../../redux/slices/TopUpSlices";
import { Button, Typography } from "../../components/atoms";
import { DialogModal } from "../../components/molecules";
import { TopupForm } from "../../components/organisms";
import {
  closeModal,
  openErrorModal,
  openSuccessModal,
  setLoading,
} from "../../redux/slices/DialogSlices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const TopUpPage = () => {
  const dispatch = useAppDispatch();
  const nominal = useAppSelector((state) => state.topup.nominal);
  const { isLoading, isModalOpen, isSuccessModal, isErrorModal } =
    useAppSelector((state) => state.dialog);

  const handleNominalClick = (value: number) => {
    dispatch(setNominal(value.toString()));
  };

  const onConfirmTopUp = async () => {
    dispatch(setLoading(true));
    const resultAction = await dispatch(
      postTopup({ top_up_amount: Number(nominal) })
    );
    dispatch(setLoading(false));
    dispatch(closeModal());

    if (postTopup.fulfilled.match(resultAction)) {
      dispatch(openSuccessModal());
    } else {
      dispatch(openErrorModal());
    }
  };
  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <div className="flex flex-col gap-2">
        <Typography variant="h4">Silahkan Masukan</Typography>
        <Typography variant="h1">Nominal TopUp</Typography>
      </div>
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="w-full lg:w-2xl">
          <TopupForm />
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-2 w-fit sm:w-xl">
          {[10_000, 20_000, 50_000, 100_000, 200_000, 500_000].map(
            (nominal, id) => (
              <Button
                key={id}
                type="button"
                variant="outlined"
                className="w-40 sm:w-40"
                onClick={() => handleNominalClick(nominal)}
              >
                {`Rp${nominal.toLocaleString("id-ID")}`}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Top up Modal */}
      <DialogModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        nominal={Number(nominal)}
        title="Apakah anda yakin akan melakukan Top Up sebesar"
      >
        <div className="flex flex-row gap-3">
          <Button type="button" variant="linkPrimary" onClick={onConfirmTopUp}>
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
            onClick={() => {
              dispatch(closeModal());
              dispatch(setNominal(""));
            }}
          >
            Batalkan
          </Button>
        </div>
      </DialogModal>

      {/* Success Dialog */}
      <DialogModal
        isOpen={isSuccessModal}
        onClose={() => {
          dispatch(closeModal());
          dispatch(setNominal(""));
        }}
        nominal={Number(nominal)}
        title="Top Up Sebesar"
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
        title="Top Up Sebesar"
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

export default TopUpPage;
