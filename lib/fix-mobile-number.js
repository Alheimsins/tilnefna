module.exports = data => {
  data = data.replace(/ /g, '')
  data = data.replace(/\D/g, '')
  data = data.length === 8 ? `47${data}` : data
  return `+${data}`
}
