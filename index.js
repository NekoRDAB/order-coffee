document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const forms = document.querySelectorAll(".beverage");
    const form = document.querySelector('form');
    let beverageCount = 1;

    addButton.addEventListener('click', function() {
        beverageCount++;
        let newForm = forms[forms.length - 1].cloneNode(true);
        newForm.querySelector("h4").innerHTML = `Напиток №${beverageCount}`;
        for (let radio of newForm.querySelectorAll("input[type=radio]")) {
            radio.name = "milk" + beverageCount;
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖️';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            if (document.querySelectorAll('.beverage').length > 1) {
                newForm.remove();
            }
        });
        newForm.appendChild(deleteButton);
        form.insertBefore(newForm, addButton.parentNode);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-button');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
        createTable();
    });

    function openModal(){
        modal.style.display = 'block';
        let num = document.querySelectorAll('fieldset').length;
        document.querySelector('.status-order').textContent = countBeverages();
    }

    function countBeverages(){
        let num = document.querySelectorAll('fieldset').length;
        if (num != 1){
            num = (num - 1) / 2 + 1;
        }
        const mod = num % 10;
        return `Заказ принят! Вы заказали ${num} ${num !== 11 && mod === 1 ?
            'напиток'
            : (num > 20 && (mod === 2 || mod === 3 || mod === 4)) || (num >= 2 && num <= 4) ?
                'напитка'
                : 'напитков'}`;
    }

    function createTable(){
        let dict = {
            'espresso': 'Эспрессо',
            'capuccino': 'Капучино',
            'cacao': 'Какао',
            'usual' : 'Обычное',
            'no-fat' : 'Обезжиренное',
            'soy' : 'Соевое',
            'coconut' : 'Кокосовое',
        }
        const beverages = [];
        const fields = document.querySelectorAll('.beverage');
    
        fields.forEach((field, index) => {
            const extras = [];
            field.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                extras.push(checkbox.nextElementSibling.textContent);
            });
            beverages.push({
                beverage: dict[field.querySelector('select').value],
                milk: dict[field.querySelector('input[type="radio"]:checked').value],
                extras: extras.join(', ')
            });
        });
    
        const modalTableBody = document.querySelector('.modal-table tbody');
        modalTableBody.innerHTML = '';
    
        beverages.forEach(beverage => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${beverage.beverage}</td>
                <td>${beverage.milk}</td>
                <td>${beverage.extras}</td>
            `;
            console.log(row.innerHTML);
            modalTableBody.appendChild(row);
        });
    }

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
