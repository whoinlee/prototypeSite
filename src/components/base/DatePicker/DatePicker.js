//-------------------------------//
//-- REF: (https://github.com/cisco-sbg-ui/atomic-react/blob/canary/framework/components/ADatePicker/ADatePicker.js)
//-------------------------------//
import PropTypes from 'prop-types';
import { 
  useMemo,
  useState 
} from "react";
import {
  formatDate,
  isSameDate,
  isValidDate
} from "./helpers";
import "./DatePicker.scss";


const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DatePicker = ( {  onChange, value = new Date(), isLightTheme,
                        label="Date",
                        isDisabled=false, 
                        isReadOnly=false,
                        errMsg="Invalid date or format (MM/DD/YYYY)",
                    } ) => {
  const [isError, setIsError] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [inputValue, setInputValue] = useState(formatDate(value));
  const [selectedDate, setSelectedDate] = useState(value);
  const [calendarDate, setCalendarDate] = useState(value);
  const firstCalendarDate = useMemo(() => {
    let currDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      calendarDate.getDate() - calendarDate.getDay()
    );
    while (
      currDate.getFullYear() >= calendarDate.getFullYear() &&
      currDate.getMonth() >= calendarDate.getMonth() &&
      currDate.getDate() > 1
    ) {
      currDate.setDate(currDate.getDate() - 7);
    }
    return currDate;
  }, [calendarDate]);

  //-- if undefined, takes global setting, data-theme
  let themeClassName = "";
  //-- if value passed, set .date-picker class with additional theme className
  if (isLightTheme !== undefined) themeClassName = isLightTheme ? " light" : " dark";

  //-- input Field handlers ----------//
  const onInputFocusIn = (e) => setIsOnFocus(true);
  const onInputFocusOut = (e) => setIsOnFocus(false);
  const onInputChangeHandler = (e) => {
    if (!isDisabled && !isReadOnly) {
      const inputValue = e.target.value;
      const isValidInput = isValidDate(inputValue);
      setInputValue(inputValue);
      setIsError(!isValidInput);
      if (isValidInput) {
        setCalendarDate(new Date(inputValue));
        setSelectedDate(new Date(inputValue));
      }
    }
  }
  //---------------------------------//

  //-- calendar handlers ------------//
  const onDayClickHandler = (currWeekDay) => {
    setIsError(false);
    const date = new Date(currWeekDay);
    const newFormattedDate = ((date.getMonth() > 8) ? 
                              (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
                            + '/' + 
                              ((date.getDate() > 9) ? 
                                date.getDate() : ('0' + date.getDate())) 
                            + '/' + 
                                date.getFullYear();
    setInputValue(newFormattedDate);
    setSelectedDate(new Date(currWeekDay));
  }

  return (
    <div 
        className={`date-picker${themeClassName}`}
    >
      { (label !== "") &&
        <div className="date-picker__label">{label}</div>
      }
      <div className="date-picker__inputSection">
        <div className={`inputField${isOnFocus ? " onFocus" : ""}${isDisabled ? " disabled" : ""}${isError ? " error" : ""}${isReadOnly ? " readOnly" : ""}`}>
          <input type="text" 
                 value={inputValue}
                 onFocus={onInputFocusIn} 
                 onBlur={onInputFocusOut}
                 onChange={onInputChangeHandler}
          />
          <span className="calendarIcon" />
        </div>
      { (isError) &&
        <div className="errorField"><span className="errorIcon"/><span className="errorMsg">{errMsg}</span></div>
      }
      </div>
      <div className="date-picker__calendarSection" >
          <div className="date-picker__header">
            <div className="date-picker__prev"
                 onClick={() => {
                  setCalendarDate(
                    new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
                  );
                }} />
            <div className="date-picker__title">
              <span className="date-picker__month">
                {fullMonthNames[calendarDate.getMonth()]}
              </span>{" "}
              <span className="date-picker__year">
                {calendarDate.getFullYear()}
              </span>
            </div>
            <div className="date-picker__next"
                 onClick={() => {
                  setCalendarDate(
                    new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1)
                  );
                }} />
          </div>
          <table className="date-picker__calendar">
            <thead>
              <tr>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Sunday">Su</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Monday">Mo</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Tuesday">Tu</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Wednesday">We</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Thursday">Th</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Friday">Fr</span>
                </th>
                <th className="date-picker__week" scope="col">
                  <span aria-label="Saturday">Sa</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* calendar rows */}
              {[0, 1, 2, 3, 4, 5].map((x, i) => {
                const sunday = new Date(+firstCalendarDate);
                sunday.setDate(sunday.getDate() + i * 7);
                let isSixRowCalendar = false;
                return (
                  <tr key={i}>
                    {/* calendar columns */}
                    {[0, 1, 2, 3, 4, 5, 6].map((y, j) => {
                      const currWeekDay = new Date(+sunday);
                      currWeekDay.setDate(currWeekDay.getDate() + j);
                      const currDate = currWeekDay.getDate();
                      const isDisabled = currWeekDay.getMonth() !== calendarDate.getMonth();
                      const isSelected = isSameDate(currWeekDay, selectedDate);
                      if ((x===5 && y===0 && !isDisabled)) isSixRowCalendar = true;
                      if (x===5 && !isSixRowCalendar) { return null; }
                      else {
                        return (
                          <td
                            key={currDate + "_" + j}
                            className={`date-picker__day${isDisabled ? " disabled" : ""}${isSelected ? " selected" : ""}`}
                            >
                            {isDisabled ? (
                              currDate
                            ) : (
                              <div
                                className="date-picker__day__label"
                                onClick={() => {
                                  onDayClickHandler(currWeekDay);
                                  onChange && onChange(currWeekDay);
                                }}>
                                {currWeekDay.getDate()}
                              </div>
                            )}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  //-- handles the 'change' event for when a date is selected
  onChange: PropTypes.func,
  //-- sets the selected date
  value: PropTypes.instanceOf(Date),
  //-- whether it's light or dark theme. if undefined, takes the global setting, data-theme
  isLightTheme: PropTypes.bool,
  //-- label shows up above the input field, when the value is not ""
  label: PropTypes.string,
  //-- component states : disabled or read-only
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  //-- the error message that appears on entering invalid date
  errMsg: PropTypes.string,
}

export default DatePicker;

