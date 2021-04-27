function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]');
    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'block';
            //document.body.style.overflow = 'hidden';
        });
    });
    close.addEventListener('click', () => {
        windows.forEach(item => {
            item.style.display = 'none';
        });
        modal.style.display = 'none';
        //document.body.style.overflow = "";
    });
    modal.addEventListener('click', (e) => {

        if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            //document.body.style.overflow = "";
        }
    });
}
bindModals('.top__iin-btn', '.popup__iin', '.popup_calc_close')
bindModals('.top__number-btn', '.popup__number', '.popup_calc_close')
bindModals('.btn--add-user--iin', '.popup__number', '.popup_calc_close--number', false)

let modalState = {};
changeModalState = (state) => {
    const iin = document.querySelectorAll('#iin'),
        numberCar = document.querySelectorAll('#number'),
        assign = document.querySelectorAll('.assign'),
        stazh = document.querySelectorAll('.stazh');

    function bindActionTwoElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            if (item.checked) {
                                state[prop] = true
                            } else {
                                state[prop] = false
                            }
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            })
        })
    }
    bindActionTwoElems('input', iin, 'iin');
    bindActionTwoElems('input', numberCar, 'number');
    bindActionTwoElems('change', assign, 'assign');
    bindActionTwoElems('change', stazh, 'stazh');

};
changeModalState(modalState);
const url = 'https://jsonplaceholder.typicode.com/users';


class PriceCard {
    constructor(title, downTitle, price, text, dropdownTitle1 = null, dropdownText1 = null, dropdownTitle2 = null, dropdownText2 = null, dropdownTitle3 = null, dropdownText3 = null, parentSelector, ...classes) {
        this.title = title;
        this.downTitle = downTitle;
        this.text = text;
        this.classes = classes;
        this.price = price;
        this.downTitle1 = dropdownTitle1;
        this.dropdownText1 = dropdownText1;
        this.downTitle2 = dropdownTitle2;
        this.dropdownText2 = dropdownText2;
        this.downTitle3 = dropdownTitle3;
        this.dropdownText3 = dropdownText3;
        this.parent = document.querySelector(parentSelector);
    }
    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'tarif-plan__card';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className =>
                element.classList.add(className));
        }
        element.innerHTML =
            `  <div class="card__title">${this.title}</div>
            <div class="card__down-title">${this.downTitle}</div>
            <div class="card__price">${this.price} </div>
            <div class="card__price-text">за год</div>
            <div class="card__text">${this.text}</div>
            <button class="card__btn">Купить</button>   
            <div class="dropdown">
                <div class="dropdown__wrapper">
                     <div class="dropdown__value">Что включает страховка?</div>
                </div>
                 <div class="dropdown__list">
                    <div class="dropdown__title">
                    <strong>${ this.downTitle1} </strong>
                    </div>
                    <div class="dropdown__text">
                        ${this.dropdownText1}
                    </div>
                    <div class="dropdown__title">
                        <strong> ${ this.downTitle2 } </strong>
                    </div>
                    <div class="dropdown__text">
                    ${this.dropdownText2}
                    </div>
                    <div class="dropdown__title">
                        <strong>${this.downTitle3} </strong>
                    </div>
                    <div class="dropdown__text">
                    ${this.dropdownText3 }
                    </div>
                 </div>
                </div>
          
          `;
        this.parent.append(element);
    }
}
new PriceCard(
    "Базовый",
    "cамый дешевый",
    "14 302 ₸",
    "Только <strong> ОС ГПО ВТС</strong> без дополнительной страховой защиты.",
    'ОС ГПО ВТС',
    ' Стандартный страховой полис обязательного страхования ответственности автовладельцев.',
    '',
    '',
    '',
    '',
    '.tarif-plan__cards',
    'tarif-plan__card',

).render();
new PriceCard(
    "Cтандарт",
    "бестселлер",
    " 9 400 ₸ ",
    " <strong> ОС ГПО ВТС</strong> с дополнительным лимитом ответственности.",
    'ОС ГПО ВТС',
    ' Стандартный страховой полис обязательного страхования ответственности автовладельцев.',
    'Добровольное ГПО ВТС (ДГПО) ',
    ' Дополняет лимит ответственности к вашему полису ОС ГПО ВТС на еще один миллион тенге в случае, если стандартного лимита не хватило.',
    '',
    '',
    '.tarif-plan__cards',
    'tarif-plan__card',

).render();
new PriceCard(
    "Премиум",
    "cамый дорогой",
    " 32 899 ₸ ",
    "Только <strong> ОС ГПО ВТС</strong> также <strong>  КАСКО </strong> на случай ДТП",
    'ОС ГПО ВТС',
    ' Стандартный страховой полис обязательного страхования ответственности автовладельцев.',
    'Добровольное ГПО ВТС (ДГПО) ',
    ' Дополняет лимит ответственности к вашему полису ОС ГПО ВТС на еще один миллион тенге в случае, если стандартного лимита не хватило.',
    'КАСКО ДТП',
    'Страхование вашего собственного авто в случае ДТП. Приобретая этот страховой продукт не только пострадавший в ДТП получит страховую выплату но и вы сами.',
    '.tarif-plan__cards',
    'tarif-plan__card',

).render();