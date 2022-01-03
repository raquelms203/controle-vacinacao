import { TrafficRounded } from "@material-ui/icons";

export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatDate(date, complete = true) {
  if (date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let hour = date.substring(11, 16);
    if (complete) return `${day}/${month}/${year} ${hour}`;
    else return `${day}/${month}/${year}`;
  }
  return "";
}
