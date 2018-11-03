module.exports = data => {
  const reply = data.msgType === 'ja' ? 'vil stå på listen' : 'ønsker å vite mer om det å stå på listen'
  const nominated = data.mobile !== data.nomineeMobile ? `Nominert av ${data.name}` : 'Har nominert seg selv'
  return `${data.nomineeName} - ${data.nomineeMobile} ${reply}. ${nominated}`
}
