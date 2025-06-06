import { Image, Typography } from "../../atoms";

type DialogModalProps = {
  status?: "success" | "error";
  title: string;
  message?: string;
  isOpen: boolean;
  nominal: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
};
const DialogModal: React.FC<DialogModalProps> = ({
  onClose,
  isOpen,
  children,
  nominal,
  title,
  message,
  status,
}) => {
  const circleColor = status === "success" ? "bg-green-500" : "bg-red-500";
  const defaultIcon = status === "success" ? "✔" : "!";
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
      <div className="flex flex-col items-center gap-5 p-5 bg-white rounded shadow-lg w-100">
        <div
          className={`flex items-center justify-center w-20 h-20 text-3xl font-bold text-white  rounded-full ${circleColor}`}
        >
          {status ? (
            <Typography variant="h1">{defaultIcon}</Typography>
          ) : (
            <Image src="/assets/Logo.png" alt="Icon Dompet" className="w-15" />
          )}
        </div>
        <div className="space-y-2 text-center">
          <Typography variant="body">{title}</Typography>
          <Typography variant="h2">
            Rp{(nominal || 0).toLocaleString("id-ID")}
          </Typography>
          {message && <Typography variant="h6">{message}</Typography>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default DialogModal;
