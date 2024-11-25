export const getQs = (qs: string) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  return params.get(qs)
}

export const capitalizeAllFirstLetter = (str: string) => {
  return str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  })
}

export const toFixedNoRounding = (num: number, length: number) => {
  return Number(num.toString().slice(0, (num.toString().indexOf(".")) + length))
}

export const getCurrentYear = () => {
  return new Date().getFullYear()
}

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const secondsToDate = (seconds: any) => {
  return new Date(seconds*1000)
}

export const parseMonthYearToDate = (monthYearString: string) => {
  const [month, year] = monthYearString.split("/").map(Number)
  const fullYear = year < 100 ? year + 2000 : year
  return new Date(fullYear, month - 1, 1)
}

export const getMonthYearFromFirebaseDatestamp = (datestamp: any) => {
  const date = new Date(datestamp.seconds * 1000);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
}
