export const calculatePrice = (price: string | number, isAnnual: boolean): [string, string] => {
  if (typeof price === 'string' && price.toLowerCase() === 'request') {
    return ['Request', ''];
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  const formattedPrice = (isAnnual ? numPrice : numPrice / 0.8).toFixed(2);
  const [euros, cents] = formattedPrice.split('.');
  return [euros, cents];
}; 