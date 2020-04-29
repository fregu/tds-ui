// @flow
import React from 'react'
import classNames from 'classnames/bind'
import ReactDayPicker from 'react-day-picker'
import ReactDayPickerInput from 'react-day-picker/DayPickerInput'
import { Input } from 'ui/components/Form'
import dateHandler from 'ui/helpers/dateHandler'
import { calendar as dateLocale } from 'ui/lang'

import './react-day-picker.css'
const cx = classNames.bind({})

type Props = {
  className?: string,
  onChange?: Function
}
export default function DayPicker({
  className,
  onChange = () => {},
  input,
  min,
  max,
  disabledDays = [],
  ...attributes
}: Props) {
  const props = {
    locale: 'sv',
    months: dateLocale.monthNamesLong,
    weekdaysShort: dateLocale.weekDaysShort,
    weekdaysLong: dateLocale.weekDaysLong,
    firstDayOfWeek: 1,
    ...attributes,
    disabledDays: [
      ...disabledDays,
      {
        ...(max ? { after: dateHandler(max).get() } : {}),
        ...(min ? { before: dateHandler(min).get() } : {})
      }
    ]
    // onDayClick: attributes.onDayClick || onChange
  }
  return input ? (
    <ReactDayPickerInput
      className={cx('DayPicker', className)}
      dayPickerProps={props}
      formatDate={date => dateHandler(date).get('date')}
      component={props => <Input placeholder="yyyy-mm-dd" {...props} />}
    />
  ) : (
    <ReactDayPicker
      className={cx('DayPicker', className)}
      {...props}
      {...attributes}
    />
  )
}
