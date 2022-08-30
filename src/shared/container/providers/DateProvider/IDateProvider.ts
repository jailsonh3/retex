interface IDateProvider {
    compareInHours(end_date: Date, start_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(end_date: Date, start_date: Date): number;
    addDays(days: number): Date;
}

export { IDateProvider };
