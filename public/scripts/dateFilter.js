export function addDateEventListeners(workLogs, renderCallback) {
    const dateInputs = document.querySelectorAll('.date-input');
    const timeButtons = document.querySelectorAll('.time-button');

    if (dateInputs.length === 0 || timeButtons.length === 0) {
        console.warn("Не найдены элементы для фильтрации по дате.");
        return;
    }

    dateInputs.forEach(input => {
        input.addEventListener('change', () => {
            handleDateFilter(workLogs, renderCallback);
        });
    });

    timeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            setDateRange(event.target.textContent);
            handleDateFilter(workLogs, renderCallback);
        });
    });
}

function handleDateFilter(workLogs, renderCallback) {
    const startDateInput = document.querySelector('.date-range input:first-of-type');
    const endDateInput = document.querySelector('.date-range input:last-of-type');

    if (!startDateInput || !endDateInput) {
        return;
    }

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (isNaN(startDate) || isNaN(endDate)) {
        return;
    }


    const filteredLogs = workLogs.filter(log => {
        const logDate = new Date(log.startTime.split(',')[0].trim());
        return logDate >= startDate && logDate <= endDate;
    });

    renderCallback(filteredLogs);
}

function setDateRange(range) {
    const currentDate = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (range) {
        case 'День':
            startDate.setDate(currentDate.getDate() - 1);
            break;
        case 'Неделя':
            startDate.setDate(currentDate.getDate() - 7);
            break;
        case '2 недели':
            startDate.setDate(currentDate.getDate() - 14);
            break;
        case 'Месяц':
            startDate.setMonth(currentDate.getMonth() - 1);
            break;
        case '3 месяца':
            startDate.setMonth(currentDate.getMonth() - 3);
            break;
        case 'Полгода':
            startDate.setMonth(currentDate.getMonth() - 6);
            break;
        default:
            console.warn("Неизвестный диапазон: ", range);
            break;
    }

    document.querySelector('.date-range input:first-of-type').value = formatDate(startDate);
    document.querySelector('.date-range input:last-of-type').value = formatDate(endDate);
}

function formatDate(date) {
    return date.toISOString().slice(0, 16);
}
