import { addSearchEventListener } from './filter.js';
import { initializeModal } from './modal.js';

loadComponent('#header', '/components/header.html').then(() => {
    setActiveNavItem();
    initializeModal();
});

let devices = [];

loadComponent('#container', '/components/main-container.html').then(() => {
    fetch('/api/devices')
        .then(response => response.json())
        .then(data => {
            devices = data;
            renderDevices(devices);
            attachDeviceEventListeners();
            addSearchEventListener(devices, renderDevices);
            initializeModal();
        })
        .catch(error => console.error('Ошибка загрузки данных о приборах:', error));
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

function renderDevices(devices) {
    const tbody = document.querySelector('.favorite-devices tbody');
    tbody.innerHTML = '';

    devices.forEach(device => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="device-info-img">
                    <img src="${device.image}" alt="Device Image" />
                </div>
            </td>
            <td>
                <div class="device-info">
                    <span>${device.name}</span>
                </div>
            </td>
            <td>
                <select data-id="${device.id}">
                    <option value="Свободен" ${device.status === 'Свободен' ? 'selected' : ''}>Свободен</option>
                    <option value="Занят" ${device.status === 'Занят' ? 'selected' : ''}>Занят</option>
                </select>
                <button class="notification-button" data-id="${device.id}">
                    <img src="${getBellIcon(device.bellStatus)}" alt="Notification" />
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function getBellIcon(status) {
    switch (status) {
        case 'enabled':
            return '/static/bell-icon.svg';
        case 'dontdisturb':
            return '/static/bell-dontdist-icon.svg';
        case 'disabled':
            return '/static/bell-not-notifc-icon.svg';
        default:
            return '/static/bell-icon.svg';
    }
}

function attachDeviceEventListeners() {
    const tbody = document.querySelector('.favorite-devices tbody');
    tbody.addEventListener('change', handleStatusChange);
    tbody.addEventListener('click', handleBellClick);
}

function handleStatusChange(event) {
    if (event.target.tagName.toLowerCase() === 'select') {
        const deviceId = event.target.getAttribute('data-id');
        const newStatus = event.target.value;

        const device = devices.find(d => d.id == deviceId);
        if (device) {
            device.status = newStatus;
        }
    }
}

function handleBellClick(event) {
    if (event.target.closest('.notification-button')) {
        const button = event.target.closest('.notification-button');
        const deviceId = button.getAttribute('data-id');

        const device = devices.find(d => d.id == deviceId);
        if (device) {
            device.bellStatus = device.bellStatus === 'enabled' ? 'dontdisturb' : 'enabled';
            renderDevices(devices);
        }
    }
}
