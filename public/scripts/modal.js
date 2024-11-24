function initializeModal() {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const qrCodeButton = document.querySelector('.qr-code-button');

    if (!modal || !closeButton || !qrCodeButton) {
        console.error("Один или несколько элементов для модального окна не найдены.");
        return;
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    qrCodeButton.addEventListener('click', () => {
        showModal();
    });

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    console.log("Модальное окно инициализировано.");
}

export { initializeModal };
