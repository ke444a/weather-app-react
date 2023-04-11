const getFormattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
    const month = date.toLocaleString("default", { month: "short" });
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}, ${month} ${dayOfMonth}`;
};

export default getFormattedDate;
