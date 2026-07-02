export const formatDateDisplay = (value: string | null | undefined): string => {
  if (!value) return "";

  const datePart = value.includes("T") ? value.split("T")[0] : value;

  const date = new Date(datePart + "T00:00:00");

  if (isNaN(date.getTime())) return value;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const excelDateToISO = (serial: number | string): string => {
  const n = parseFloat(serial.toString());
  if (isNaN(n)) return serial.toString();

  const date = new Date(Math.round((n - 25569) * 864e5));
  return date.toISOString();
};
