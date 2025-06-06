const moneyFormat = (value: string) => {
  const number = value.replace(/\d=D/g, "");
  if (!number) return "";
  return "Rp " + Number(number).toLocaleString("id-ID");
};

export default moneyFormat;
