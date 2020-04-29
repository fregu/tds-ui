/**
 * Datehandler to parse, modify and output date in different formats. If no date or dateString is passed in, it will use current dateTime
 * const tomorrow = dateHander().modify(1, 'day').get('date') -> 2018-11-24
 * const pubDate = dateHander(dateString).get('relative') -> 2 days ago
 * const lastYear = dateHandler(dateString).modify(-1, 'years').get('mediumDate') -> 23 nov, 2017
 **/
import dateFormat from 'dateformat'
const dateStrings = {
  weekDaysShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
  weekDaysLong: [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag'
  ],
  monthNamesShort: [
    'jan',
    'feb',
    'mar',
    'apr',
    'maj',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'dec'
  ],
  monthNamesLong: [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december'
  ]
}

dateFormat.i18n = {
  dayNames: [...dateStrings.weekDaysShort, ...dateStrings.weekDaysLong],
  monthNames: [...dateStrings.monthNamesShort, ...dateStrings.monthNamesLong],
  timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM']
}

export default function dateHandler(startDate) {
  const date = !isNaN(startDate) || startDate ? new Date(startDate) : new Date()

  return (
    !isNaN(date.getDate()) && {
      modify(value, unit) {
        switch (unit) {
          case 'second':
          case 'seconds':
            date.setSeconds(date.getSeconds() + value)
            break
          case 'minute':
          case 'minutes':
            date.setMinutes(date.getMinutes() + value)
            break
          case 'hour':
          case 'hours':
            date.setHours(date.getHours() + value)
            break
          case 'day':
          case 'days':
          case 'date':
            date.setDate(date.getDate() + value)
            break
          case 'week':
          case 'weeks':
            date.setDate(date.getDate() + value * 7)
            break
          case 'month':
          case 'months':
            date.setMonth(date.getMonth() + value)
            break
          case 'year':
          case 'years':
            date.setFullYear(date.getFullYear() + value)
            break
          default:
        }
        return this
      },
      set(value, unit) {
        switch (unit) {
          case 'second':
          case 'seconds':
            date.setSeconds(value)
            break
          case 'minute':
          case 'minutes':
            date.setMinutes(value)
            break
          case 'hour':
          case 'hours':
            date.setHours(value)
            break
          case 'day':
          case 'days':
          case 'week':
          case 'weeks':
            date.setDate(value)
            break
          case 'month':
          case 'months':
            date.setMonth(value)
            break
          case 'year':
          case 'years':
            date.setFullYear(value)
            break
          case 'time':
            const timeSplit = value.split(':')
            date.setHours(timeSplit[0])
            date.setMinutes(timeSplit[1])
            if (timeSplit[2]) {
              date.setSeconds(timeSplit[2])
            }
            break
          case 'date':
            const dateSplit = value.split('-')
            date.setFullYear(dateSplit[0])
            date.setMonth(dateSplit[1])
            date.setDate(dateSplit[2])
            break
          default:
        }
        return this
      },
      get(format) {
        switch (format) {
          case 'relative':
            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            if (
              dateFormat(date, 'yyyy-mm-dd') === dateFormat(today, 'yyyy-mm-dd')
            ) {
              return 'Idag, ' + dateFormat(date, 'HH:MM')
            } else if (
              dateFormat(date, 'yyyy-mm-dd') ===
              dateFormat(yesterday, 'yyyy-mm-dd')
            ) {
              return 'Igår, ' + dateFormat(date, 'HH:MM')
            }
            format = 'yyyy-mm-dd'
            break
          case 'shortDate':
            format = 'd mmm'
            break
          case 'date':
            format = 'yyyy-mm-dd'
            break
          case 'eu':
            format = 'dd/mm/yyyy'
            break
          case 'mediumDate':
            format = 'd mmm, yyyy'
            break
          case 'longDate': {
            format = 'd mmmm, yyyy'
            break
          }
          case 'dateTime':
            format = 'yyyy-mm-dd HH:MM'
            break
          case 'time':
            format = 'HH:MM'
            break
          case 'longTime':
          case 'fullTime':
            format = 'HH:MM:ss'
            break
          case 'fullDate':
            format = 'dddd, d mmmm, yyyy'
            break
          case 'fullDateTime':
            format = 'dddd, d mmmm HH:MM, yyyy'
            break
          case 'iso':
            format = 'isoDateTime'
            break
          case 'weekday':
            format = 'dddd'
            break
          case 'default':
            format = 'ddd d mmm yyyy HH:MM:ss'
            break
        }

        return format ? dateFormat(date, format) : date
      }
    }
  )
}

/**
Uses the syntax format from https://www.npmjs.com/package/dateformat

mask  description
d     Day of the month as digits; no leading zero for single-digit days.
dd    Day of the month as digits; leading zero for single-digit days.
ddd   Day of the week as a three-letter abbreviation.
dddd  Day of the week as its full name.
m     Month as digits; no leading zero for single-digit months.
mm    Month as digits; leading zero for single-digit months.
mmm   Month as a three-letter abbreviation.
mmmm  Month as its full name.
yy    Year as last two digits; leading zero for years less than 10.
yyyy  Year represented by four digits.
h     Hours; no leading zero for single-digit hours (12-hour clock).
hh    Hours; leading zero for single-digit hours (12-hour clock).
H     Hours; no leading zero for single-digit hours (24-hour clock).
HH    Hours; leading zero for single-digit hours (24-hour clock).
M     Minutes; no leading zero for single-digit minutes.
MM    Minutes; leading zero for single-digit minutes.
N     ISO 8601 numeric representation of the day of the week.
o     GMT/UTC timezone offset, e.g. -0500 or +0230.
s     Seconds; no leading zero for single-digit seconds.
ss    Seconds; leading zero for single-digit seconds.
S     The date's ordinal suffix (st, nd, rd, or th). Works well with d.
l     Milliseconds; gives 3 digits.
L     Milliseconds; gives 2 digits.
t     Lowercase, single-character time marker string: a or p.
tt    Lowercase, two-character time marker string: am or pm.
T     Uppercase, single-character time marker string: A or P.
TT    Uppercase, two-character time marker string: AM or PM.
W     ISO 8601 week number of the year, e.g. 42
Z     US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the
'...', "..."  Literal character sequence. Surrounding quotes are removed.
UTC:  Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.

Named Formats
name            mask                          example
default         ddd d mmm yyyy HH:MM:ss       Lör 9 Jun 2007 17:46:21
shortDate       d mmm                         9 Jun
mediumDate      d mmm, yyyy                   9 Jun, 2007
longDate        d mmmm, yyyy                  9 Juni, 2007
fullDate        dddd, d mmmm, yyyy            Lördag, 9 Juni, 2007
shortTime       HH:MM                         17:46
longTime        HH:MM:ss                      17:46:21
isoTime         HH:MM:ss                      17:46:21
date/isoDate    yyyy-mm-dd                    2007-06-09
isoDateTime     yyyy-mm-dd'T'HH:MM:ss         2007-06-09T17:46:21
isoUtcDateTime  UTC:yyyy-mm-dd'T'HH:MM:ss'Z'  2007-06-09T22:46:21Z
**/
