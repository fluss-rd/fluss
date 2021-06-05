export default function formatPhoneNumber(phoneNumber: string): string {
  const values = phoneNumber.match(/(\d{3})(\d{3})(\d{4})/);
  const masked = `(${values[1]}) ${values[2]}-${values[3]}`;

  return masked;
}

