import moment from "moment"


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

export const getIsoDate = (date: Date) => {
  return moment(date).toISOString()
}

export const getDateFromIso = (iso: string) => {
  const dataMoment = moment(iso);
  const dataJS = dataMoment.toDate();
  return dataJS.getTime();
}
