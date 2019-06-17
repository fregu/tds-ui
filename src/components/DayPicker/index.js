// @flow
import React from 'react'
import classNames from 'classnames/bind'
import DayPicker from 'react-day-picker'
import dateHandler from 'ui/helpers/dateHandler'
import { calendar as dateLocale } from 'ui/lang'

import './react-day-picker.css'
const cx = classNames.bind({})

type Props = {
  className?: string,
  onChange?: Function
}
export default ({
  className,
  onChange = () => {},
  min,
  max,
  disabledDays = [],
  ...attributes
}) => (
  <DayPicker
    {...{
      locale: 'sv',
      months: dateLocale.monthNamesLong,
      weekdaysShort: dateLocale.weekDaysShort,
      weekdaysLong: dateLocale.weekDaysLong,
      firstDayOfWeek: 1
    }}
    {...attributes}
    disabledDays={[...disabledDays, {
      ...(max ? { after: dateHandler(max).get() } : {}),
      ...(min ? { before: dateHandler(min).get() } : {})
    }]}
    onDayClick={attributes.onDayClick || onChange}
    className={cx('DayPicker', className)}
  />
)
