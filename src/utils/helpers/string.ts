export function isString(text?: string | null) {
  if (!text) {
    return false;
  }

  if (text.length < 1) {
    return false;
  }
  return true;
}
export function addZeroToSingleNumber(num: number) {
  const numString = num.toString().padStart(2, "0")
  if(numString === "NaN") {
    return
  }
  return numString
 
}

export function ensureNumber(val:string|number){
  if(typeof val === "string"){
    return parseInt(val)
  }
  return val
}
