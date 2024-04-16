document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const form = document.querySelector('form');
    let beverageCount = 1;

    addButton.addEventListener('click', function() {
        beverageCount++;

        const newBeverageFieldset = document.createElement('fieldset');
        newBeverageFieldset.classList.add('beverage');

        const newBeverageHeader = document.createElement('h4');
        newBeverageHeader.classList.add('beverage-count');
        newBeverageHeader.textContent = `Напиток №${beverageCount}`;

        const beverageSelect = document.querySelector('.beverage').cloneNode(true);
        beverageSelect.querySelector('.beverage-count').remove();
        beverageSelect.querySelector('select').selectedIndex = 0;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖️';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            if (document.querySelectorAll('.beverage').length > 1) {
                newBeverageFieldset.remove();
            }
        });

        newBeverageFieldset.appendChild(deleteButton);
        newBeverageFieldset.appendChild(newBeverageHeader);
        newBeverageFieldset.appendChild(beverageSelect);

        form.insertBefore(newBeverageFieldset, addButton.parentNode);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-button');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none'; // Скрываем модальное окно

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
