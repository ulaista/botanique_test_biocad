function initializeModal() {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const unavailableFeatures = document.querySelectorAll('.unavailable-feature');

    if (!modal || !closeButton) {
        console.error("Элементы модального окна не найдены.");
        return;
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    unavailableFeatures.forEach(button => {
        button.addEventListener('click', () => {
            showModal();
        });
    });

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

}

export { initializeModal };
