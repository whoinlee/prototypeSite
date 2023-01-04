const formatDate = (date) => {
    return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
}

const isSameDate = (a, b) => {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
}

const isValidDate = (date) => {
    //-- check valid format, MM/DD/YYYY
    const date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    const isValidFormat = date_regex.test(date);
    if (!isValidFormat) return false;

    //-- check valid date, step1 
    const parts = date.split("/");
    const dt = new Date(parseInt(parts[2], 10),
                        parseInt(parts[0], 10) - 1,
                        parseInt(parts[1], 10));
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) return false;

    //-- check valid date, step2: to exclude invalid dates like 06/31/2022, 02/30/2022, 05/45/2022 etc
    const isValidDate = ((dt.getFullYear() === parseInt(parts[2], 10)) && 
                         (dt.getMonth() === parseInt(parts[0], 10) - 1) &&
                         (dt.getDate() === parseInt(parts[1], 10)));
    return isValidDate;
}

export {
    formatDate,
    isSameDate,
    isValidDate
}