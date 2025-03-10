/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const newDate = new Date(date);
  return newDate.getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const newDate = new Date(date);
  const hr = newDate.getHours();
  const hours = hr < 10 ? `0${hr}` : `${hr}`;
  const mn = newDate.getMinutes();
  const minutes = mn < 10 ? `0${mn}` : `${mn}`;
  const sc = newDate.getSeconds();
  const seconds = sc < 10 ? `0${sc}` : `${sc}`;
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const newDate = new Date(date);
  const day = newDate.getDay();
  let dayName = '';
  switch (day) {
    case 0:
      dayName = 'Sunday';
      break;
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    default:
      break;
  }
  return dayName;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const multiplier = day < 5 ? 5 - day : 12 - day;
  const timeStamp = dateToTimestamp(date) + multiplier * 24 * 3600 * 1000;
  return new Date(timeStamp);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  function isYearLeap(y) {
    if (y % 4 !== 0) {
      return false;
    }
    if (y % 100 !== 0) {
      return true;
    }
    if (y % 400 === 0) {
      return true;
    }
    return false;
  }
  let daysNumber = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      daysNumber = 31;
      break;
    case 2:
      daysNumber = isYearLeap(year) ? 29 : 28;
      break;
    default:
      daysNumber = 30;
  }
  return daysNumber;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const timeStampStart = new Date(dateStart).getTime();
  const timeStampEnd = new Date(dateEnd).getTime();
  const diff = timeStampEnd - timeStampStart;
  return Math.floor(diff / 1000 / 3600 / 24) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  if (
    Date.parse(date) >= Date.parse(period.start) &&
    Date.parse(period.end) >= Date.parse(date)
  )
    return true;
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = newDate.getUTCMonth() + 1;
  const day = newDate.getUTCDate();
  const hr = newDate.getUTCHours();
  const hours = hr > 12 ? hr - 12 : hr;
  const m = hr < 12 ? 'AM' : 'PM';
  const mn = newDate.getUTCMinutes();
  const minutes = mn < 10 ? `0${mn}` : `${mn}`;
  const sc = newDate.getUTCSeconds();
  const seconds = sc < 10 ? `0${sc}` : `${sc}`;
  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${m}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  function isYearLeap(y) {
    if (y % 4 !== 0) {
      return false;
    }
    if (y % 100 !== 0) {
      return true;
    }
    if (y % 400 === 0) {
      return true;
    }
    return false;
  }
  let daysNumber = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      daysNumber = 31;
      break;
    case 2:
      daysNumber = isYearLeap(year) ? 29 : 28;
      break;
    default:
      daysNumber = 30;
  }
  let count = 0;
  for (let i = 1; i <= daysNumber; i += 1) {
    const day = new Date(year, month - 1, i).getDay();
    if (day === 0 || day === 6) count += 1;
  }
  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  let count = 0;
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const januaryOneWeekDay = new Date(year, 0, 1).getDay();
  if (januaryOneWeekDay <= 4 && januaryOneWeekDay !== 0) count = 1;
  let currentDate = 1;
  let current;
  for (;;) {
    currentDate += 7;
    current = new Date(year, 0, currentDate);
    count += 1;
    if (current - newDate >= 0) break;
  }
  const newDateWeekDay = newDate.getDay();
  if (
    januaryOneWeekDay !== 0 &&
    (newDateWeekDay === 0 || newDateWeekDay > januaryOneWeekDay)
  )
    count -= 1;
  return count;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const startDate = new Date(date);
  let currentDate = startDate.getDate();
  let month = startDate.getMonth();
  if (currentDate > 13) month += 1;
  const year = startDate.getFullYear();
  for (;;) {
    currentDate = new Date(year, month, 13);
    const weekDay = currentDate.getDay();
    if (weekDay === 5) break;
    month += 1;
  }
  return currentDate;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const newDate = new Date(date);
  let quarter = 0;
  const month = newDate.getMonth();
  switch (month) {
    case 0:
    case 1:
    case 2:
      quarter = 1;
      break;
    case 3:
    case 4:
    case 5:
      quarter = 2;
      break;
    case 6:
    case 7:
    case 8:
      quarter = 3;
      break;
    case 9:
    case 10:
    case 11:
      quarter = 4;
      break;
    default:
      break;
  }
  return quarter;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  function getFormattedDate(date) {
    const d = date.getDate(date);
    const day = d < 10 ? `0${d}` : `${d}`;
    const m = date.getMonth(date) + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    const year = date.getFullYear(date).toString();
    const arr = [];
    arr.push(day);
    arr.push(month);
    arr.push(year);
    return arr.join('-');
  }
  const start = period.start.split('-').reverse();
  const end = period.end.split('-').reverse();
  const endDate = new Date(+end[0], +end[1] - 1, +end[2]);
  let currentDay = +start[2];
  const res = [];
  let date;
  for (;;) {
    for (let i = 1; i <= countWorkDays; i += 1) {
      date = new Date(+start[0], +start[1] - 1, currentDay);
      if (date - endDate > 0) {
        break;
      }
      res.push(getFormattedDate(date));
      currentDay += 1;
    }
    if (date - endDate > 0) {
      break;
    }
    currentDay += countOffDays;
  }
  return res;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 4 !== 0) {
    return false;
  }
  if (year % 100 !== 0) {
    return true;
  }
  if (year % 400 === 0) {
    return true;
  }
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
