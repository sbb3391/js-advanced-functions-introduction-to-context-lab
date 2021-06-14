
// createEmployeeRecord
// Argument(s)
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// Returns
// JavaScript Object with keys:
// firstName
// familyName
// title
// payPerHour
// timeInEvents
// timeOutEvents
// Behavior
// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.

function createEmployeeRecord(employee) {
  const employeeRecord = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employeeRecord
}

// createEmployeeRecords
// Argument(s)
// Array of Arrays
// Returns
// Array of Objects
// Behavior
// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map( employee => {
    return createEmployeeRecord(employee)
  })
}


// createTimeInEvent
// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
// Returns
// The employee record
// Behavior
// Add an Object with keys to the timeInEvents Array on the record Object:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument

function createTimeInEvent(employee, dateStamp) {
  const timeInObject = {
    type: "TimeIn",
    hour: parseInt(String(dateStamp.split(" ")[1].slice(0,2)) + "00"),
    date: dateStamp.split(" ")[0]
  }

  employee.timeInEvents.push(timeInObject)
  return employee

}
// createTimeOutEvent
// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
// Returns
// The employee record
// Behavior
// Add an Object with keys to the timeOutEvents Array on the record Object:
// type: Set to "TimeOut"
// hour: Derived from the argument
// date: Derived from the argument

function createTimeOutEvent(employee, dateStamp) {
  const timeOutObject = {
    type: "TimeOut",
    hour: parseInt(String(dateStamp.split(" ")[1].slice(0,2)) + "00"),
    date: dateStamp.split(" ")[0]
  }
  employee.timeOutEvents.push(timeOutObject)
  return employee
}

// hoursWorkedOnDate
// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
// Returns
// Hours worked, an Integer
// Behavior
// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent

function hoursWorkedOnDate(employee, dateStamp) {
  const reviewDate = dateStamp.split(" ")[0]

  const timeInOnDate = employee.timeInEvents.find(dateReviewed)["hour"]
  const timeOutOnDate = employee.timeOutEvents.find(dateReviewed)["hour"]

  function dateReviewed(element, index, array) {
    return element.date === reviewDate
  }
  return parseInt(String(timeOutOnDate - timeInOnDate)) / 100 

}

// wagesEarnedOnDate
// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
// Returns
// Pay owed
// Behavior
// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(employee, dateString) {

  const amountOwed = hoursWorkedOnDate(employee, dateString) * employee.payPerHour

  return amountOwed
}
// allWagesFor
// Argument(s)
// An employee record Object
// Returns
// Pay owed for all dates
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. 
// HINT: You will need to find the available dates somehow...

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map( (obj) => { return obj.date })

  function reducer(accumulator, currentValue) {
    return accumulator + wagesEarnedOnDate(employee, currentValue)
  }

  return datesWorked.reduce(reducer, 0)
  // return datesWorked.reduce(function callbackFn(accumulator, currentValue) { accumulator}, 0 )

}
// findEmployeeByFirstName
// Argument(s)
// srcArray: Array of employee records
// firstName: String representing a first name held in an employee record
// Returns
// Matching record or undefined
// Behavior
// Test the firstName field for a match with the firstName argument

function findEmployeeByFirstName(employeeRecordsArray, firstName) {
  const findEmployee = employeeRecordsArray.find( (element) => { return element.firstName === firstName } )

  return findEmployee
} 


// calculatePayroll
// Argument(s)
// Array of employee records
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.

function calculatePayroll(employeeRecords) {
  const allWagesDue = employeeRecords.map( (employee) => {return allWagesFor(employee)} ) 

  let totalWages = allWagesDue.reduce( (memo, wages) => { return memo + wages}, 0)

  return totalWages
}