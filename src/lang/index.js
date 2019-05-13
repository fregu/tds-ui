import calendar from './calendar.json'
export { default as calendar } from './calendar.json'

export const strings = {
  general: {
    name: 'Namn',
    type: 'Typ',
    nationalIdNumber: 'Personnummer',
    address: 'Adress',
    phoneNumber: 'Telefonnummer',
    email: 'E-post',
    years: 'år',
    approve: 'Godkänn',
    reject: 'Avslå',
    cancel: 'Avbryt',
    close: 'Stäng',
    continue: 'Fortsätt',
    back: 'Tillbaka',
    of: 'av',
    waiting: 'väntar',
    download: 'Ladda ner'
  }
}

export const system = {
  form: {
    errorMessages: {
      badInput: 'Felaktigt format',
      patternMismatch: 'Felaktigt format',
      rangeOverflow: 'Värde för högt',
      rangeUnderflow: 'Värde för lågt',
      stepMismatch: 'Mellan steg',
      tooLong: 'För långt värde',
      tooShort: 'För kort värde',
      typeMismatch: 'Felaktig typ på värde',
      valueMissing: 'Obligatoriskt fält'
    },
    required: 'Obligatorisk',
    optional: 'valfritt',
    requiredField: 'Fältet är obligatoriskt',
    search: 'Sök'
  }
}

export default { strings, system, calendar }
