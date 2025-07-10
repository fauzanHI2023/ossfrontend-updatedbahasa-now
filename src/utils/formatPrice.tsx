const formatPrice = (amount: number) => {
  return `Rp ${Number(amount)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
