export const HandlerDateFormat = (dataDate: string) => {
    const rawDate = dataDate;

    const formatted = new Date(rawDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // console.log(formatted); // Example: "July 6, 2025, 18:07:39"
    return formatted
}