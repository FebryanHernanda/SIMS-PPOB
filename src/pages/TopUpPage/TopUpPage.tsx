import { Button, Typography } from "../../components/atoms";
import { DialogModal } from "../../components/molecules";
import { TopupForm } from "../../components/organisms";

const TopUpPage = () => {
  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <div className="flex flex-col gap-2">
        <Typography variant="h4">Silahkan Masukan</Typography>
        <Typography variant="h1">Nominal TopUp</Typography>
      </div>
      <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
        <div className="w-full lg:w-2xl">
          <TopupForm />
          {/* <DialogModal>
            <div className="flex flex-col">
              <Button type="button" variant="linkPrimary">
                Ya, Lanjutkan
              </Button>
              <Button type="button" variant="linkSecondary">
                Batalkan
              </Button>
            </div>
          </DialogModal> */}
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-2 w-fit sm:w-xl">
          {[10_000, 20_000, 50_000, 100_000, 200_000, 500_000].map(
            (nominal) => (
              <Button type="button" variant="outlined" className="w-40 sm:w-40">
                {nominal.toLocaleString()}
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TopUpPage;
