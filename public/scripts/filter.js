export function filterDevices(devices, query) {
    const lowerCaseQuery = query.toLowerCase();
    return devices.filter(device => device.name.toLowerCase().includes(lowerCaseQuery));
}

export function addSearchEventListener(devices, renderCallback) {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const filteredDevices = filterDevices(devices, event.target.value);
            renderCallback(filteredDevices);
        });
    }
}
