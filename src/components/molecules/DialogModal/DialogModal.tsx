import { Typography } from "../../atoms";

type DialogModalProps = {
  // onClose?: () => void;
  children: React.ReactNode;
};
const DialogModal: React.FC<DialogModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center gap-5 p-5 bg-white rounded shadow-lg w-100">
        <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white bg-red-500 rounded-full">
          !
        </div>
        <div className="space-y-2 text-center">
          <Typography variant="body">
            Apakah Anda yakin top up sebesar
          </Typography>
          <Typography variant="h2">Rp. 50.000</Typography>
          <Typography variant="body">ke Rekening 1234567890?</Typography>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DialogModal;
