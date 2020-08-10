export default function convertHourToMinutes (time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (60 * hour) + minutes;
    return timeInMinutes;
}