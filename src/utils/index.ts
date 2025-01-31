export const formatPrice = (amount: number | undefined) => {
  if (!amount) return;
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(amount);
};
