class DateTimeService {

    constructor(ms) {
        this.ms = ms;
        this.minutes = ms / (60 * 1000);
        this.hours = ms / (60 * 60 * 1000);
        this.days = ms / (24 * 60 * 60 * 1000);
        this.months = ms / (30 * 24 * 60 * 60 * 1000);
        this.years = ms / (365 * 30 * 24 * 60 * 60 * 1000);
    }

    getLocalDateTime(dateTime) {
        var date = new Date(dateTime);
        date.setHours(date.getHours() - 11);
        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        var localDateTime = new Date(date.getTime() - userTimezoneOffset);
        return localDateTime;
    }
}

export default DateTimeService;
