import { CurrencyCode } from '../types/edenrobe';
import { CURRENCIES } from '../data/edenrobeProducts';

export function formatPrice(priceInPKR: number, currency: CurrencyCode = 'PKR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.PKR;
  const converted = priceInPKR * config.rate;

  if (currency === 'PKR') {
    return `${config.symbol} ${priceInPKR.toLocaleString('en-PK')}`;
  } else if (currency === 'USD') {
    return `$${converted.toFixed(2)}`;
  } else if (currency === 'AED') {
    return `AED ${converted.toFixed(2)}`;
  } else if (currency === 'GBP') {
    return `£${converted.toFixed(2)}`;
  }

  return `${config.symbol} ${converted.toFixed(2)}`;
}

export function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `EDN-PK-${randomNum}`;
}

export function generateTrackingNumber(): string {
  const letters = 'TCSEXP';
  const randomNum = Math.floor(10000000 + Math.random() * 90000000);
  return `${letters}${randomNum}`;
}
