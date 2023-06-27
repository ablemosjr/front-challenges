
const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const calculateBtn = document.getElementById('calculate-btn');

const validate = {}

validate.day = (day) => {
  if (isNaN(day) || day.trim() === '') {
    warning.err(dayInput, 'day', 'required');
    return null;
  } else if (day < 1 || day > 31) {
    warning.err(dayInput, 'day', 'invalid');
    return null;
  }

  warning.clean(dayInput);
  return parseInt(day);
}

validate.month = (day, month, year) => {

  const monthRegex30 = /^(4|6|9|11)$/;
  const monthRegex31 = /^(1|3|5|7|8|10|12)$/;
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (isNaN(month)) {
    warning.err(monthInput, 'month', 'required');
    return null;
  }

  if (month < 1 || month > 12) {
    warning.err(monthInput, 'month', 'invalid');
    return null;
  } else if (month === 2) {
    if (!isLeapYear && day > 28) {
      warning.err(dayInput, 'month', 'date');
      warning.errField(monthInput);
      warning.errField(yearInput);
      return null;
    } else if (isLeapYear && day > 29) {
      warning.err(dayInput, 'month', 'date');
      warning.errField(monthInput);
      warning.errField(yearInput);
      return null;
    }
  } else if (monthRegex31.test(month) && day > 31) {
    warning.clean(monthInput);
    return null;
  } else if (monthRegex30.test(month) && day > 30) {
    warning.clean(monthInput);
    warning.err(dayInput, 'month', 'date');
    warning.errField(monthInput);
    warning.errField(yearInput);
    return null;
  }

  warning.clean(monthInput);
  return parseInt(month);
}

validate.year = (year, currentYear) => {
  if (isNaN(year) || year.trim() === '') {
    warning.err(yearInput, 'year', 'required');
    return null;
  } else if (year.length < 1) {
    warning.err(yearInput, 'year', 'invalid');
    return null;
  } else if (year > currentYear) {
    warning.err(yearInput, 'year', 'past');
    return null;
  }

  warning.clean(yearInput);
  return parseInt(year);
}

const warning = {}

warning.err = (field, date, errorType) => {
  let message;

  if (errorType === 'required') {
    message = `The field is required`;
  } else if (errorType === 'invalid') {
    message = `Must be a valid ${date}`;
  } else if (errorType === 'past') {
    message = `Must be in the past`;
  } else if (errorType === 'date') {
    message = `Must be a valid date`;
  }

  field.parentElement.classList.add('invalid');
  field.parentElement.setAttribute('message', message);
}

warning.clean = (field) => {
  field.parentElement.classList.remove('invalid');
  field.parentElement.removeAttribute('message');
}

warning.errField = (field) => {
  field.parentElement.classList.add('invalid');
}

warning.cleanField = (field) => {
  field.parentElement.classList.remove('invalid');
}

calculateBtn.addEventListener('click', () => {
  let dayPrinter = document.getElementById('days-printer');
  let monthPrinter = document.getElementById('months-printer');
  let yearPrinter = document.getElementById('years-printer');

  let currentDate = new Date();

  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  
  let day = validate.day(dayInput.value);
  let year = validate.year(yearInput.value, currentYear);
  let month = validate.month(dayInput.value, parseInt(monthInput.value), year);

  if (day !== null && month !== null && year !== null) {
    let yearsDifference, monthsDifference, daysDifference;
    const difference = currentYear > year || (currentYear === year && currentMonth > month) || (currentYear === year && currentMonth === month && currentDay > day);
  
    if (difference) {
      yearsDifference = currentYear - year;
      monthsDifference = currentMonth - month;
      daysDifference = currentDay - day;
  
      if (daysDifference < 0) {
        monthsDifference--;
        let daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        daysDifference += daysInPreviousMonth;
      }
  
      if (monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
      }
    } else {
      yearsDifference = year - currentYear;
      monthsDifference = month - currentMonth;
      daysDifference = day - currentDay;
  
      if (daysDifference > 0) {
        monthsDifference--;
        let daysInPreviousMonth = new Date(year, month - 1, 0).getDate();
        daysDifference -= daysInPreviousMonth;
      }
  
      if (monthsDifference > 0) {
        yearsDifference--;
        monthsDifference += 12;
      }
    }
  
    dayPrinter.innerHTML = Math.abs(daysDifference);
    monthPrinter.innerHTML = Math.abs(monthsDifference);
    yearPrinter.innerHTML = Math.abs(yearsDifference);
  }
});
