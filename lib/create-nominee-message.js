module.exports = data => {
  if (data.mobile !== data.nomineeMobile) {
    return `${data.name} ønsker at du skal stå på listen for Rødt Notodden ved kommunevalget 2019.
    Kunne du tenke deg dette svarer du "ja" på denne meldingen.
    Har du ikke lyst svarer du "nei"
    Er du ikke helt sikker? Svar "tja" :-)
    Vil du vite mer om hva Rødt står for kan du se på nettsiden vår https://xn--rdt-0na.no/politikken`
  } else {
    return `Takk for at du har lyst til å stå på listen for Rødt Notodden ved kommunevalget 2019.
    For å bekrefte at du fortsatt er interessert svarer du "ja" på denne meldingen.
    Har du ikke lyst svarer du "nei"
    Vil du vite mer? Svar "tja" :-)
    Vil du vite mer om hva Rødt står for kan du se på nettsiden vår https://xn--rdt-0na.no/politikken`
  }
}
