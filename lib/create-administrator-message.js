module.exports = data => {
  let reply = 'ønsker ikke å stå på listen'
  if (data.msgType === 'ja') {
    reply = 'vil stå på listen'
  } else if (data.msgType === 'tja') {
    reply = 'ønsker å vite mer om det å stå på listen'
  }
  const nominated = data.mobile !== data.nomineeMobile ? `Nominert av ${data.name}` : 'Har nominert seg selv'
  return `${data.nomineeName} - ${data.nomineeMobile} ${reply}. ${nominated}`
}
