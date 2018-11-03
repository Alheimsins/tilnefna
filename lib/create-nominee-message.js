module.exports = data => {
  if (data.mobile !== data.nomineeMobile) {
    return `${data.name} har nominert deg til å stå på valglisten til Rødt Notodden.
    Kunne du tenke deg dette svarer du "ja" på denne meldingen.
    Har du ikke lyst svarer du "nei"
    Vil du vite mer? Svar "tja" :-)`
  } else {
    return `Takk for at du har lyst til å stå på valglisten til Rødt Notodden.
    For å bekrefte at du fortsatt er interessert svarer du "ja" på denne meldingen.
    Har du ikke lyst svarer du "nei"
    Vil du vite mer? Svar "tja" :-)`
  }
}
