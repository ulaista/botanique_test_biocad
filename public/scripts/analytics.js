loadComponent('#header', '/components/header.html').then(() => {
    setActiveNavItem();
});

loadComponent('#container', '/components/analytics-container.html').then(() => {
    renderWorkLogs();
});

function setActiveNavItem() {
    document.querySelectorAll('.nav-item').forEach(item => {
        const page = item.getAttribute('data-page');
        if (window.location.pathname.includes(page)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

const workLogs = [
    {
        id: 1,
        startTime: "09.10.2021, 15:46",
        workType: "Измерение",
        status: "В работе",
        sampleInfo: "Образец/серия: 000100057935_170000010325_0000251849",
        result: {
            comment: "Промывка с указанием вещества: Вещество\nКомментарий: тест успешности",
            status: "completed"
        },
        user: "morozovava"
    },
    {
        id: 2,
        startTime: "12.10.2021, 12:17",
        workType: "Калибровка",
        status: "В работе",
        sampleInfo: "Номер колонки: Колонка 2<br>Образец: Образец 2<br>Образец: образец 1<br>Метод: метов тестовый<br>Номер колонки: Колонка 1",
        result: {
            comment: "",
            status: "completed"
        },
        user: "morozovava"
    }
];

function renderWorkLogs() {
    const tbody = document.querySelector('.work-log-table tbody');
    tbody.innerHTML = '';

    workLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.startTime}</td>
            <td>
                <span class="status in-progress">${log.status}</span><br />
                ${log.workType}
            </td>
            <td>${log.sampleInfo}</td>
            <td class="result-check">
                ${log.result.comment ? `<p>${log.result.comment}</p>` : ''}
                <img src="/static/check-icon.svg" alt="Completed" class="check-icon" />
            </td>
            <td>
                <a href="#" class="user-link">${log.user}</a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}