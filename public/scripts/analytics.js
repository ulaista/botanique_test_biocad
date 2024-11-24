import { addDateEventListeners } from './dateFilter.js';
import { initializeModal } from './modal.js';

loadComponent('#header', '/components/header.html').then(() => {
    setActiveNavItem();
    initializeModal();
});

let workLogs = [];

loadComponent('#container', '/components/analytics-container.html').then(() => {
    fetch('/api/worklogs')
        .then(response => response.json())
        .then(data => {
            workLogs = data;
            renderWorkLogs(workLogs);
            addDateEventListeners(workLogs, renderWorkLogs);
            initializeModal();
        })
        .catch(error => console.error('Ошибка загрузки данных о работах:', error));
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

function renderWorkLogs(workLogs) {
    const tbody = document.querySelector('.work-log-table tbody');
    if (!tbody) {
        return;
    }

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