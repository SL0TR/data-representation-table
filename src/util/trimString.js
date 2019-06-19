const TrimString = (str, len = 50, sLen = 25) => {
  if(window.screen.width > 1100 && str.length > len) {
   return `${str.slice(0, len)}...`
  } else if(window.screen.width < 600 && str.length > sLen ) {
    console.log(str.len)
    return `${str.slice(0, sLen)}...`
  } else {
    return str;
  }
}
 
export default TrimString;