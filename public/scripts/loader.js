/* eslint-disable no-unused-vars */
function loadComponent(selector, componentPath) {
    return fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки ${componentPath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(error => {
            console.error(error);
        });
}
