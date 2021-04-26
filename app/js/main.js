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
    constructor(title, downTitle, price, text, parentSelector, ...classes) {
        this.title = title;
        this.downTitle = downTitle;
        this.text = text;
        this.classes = classes;
        this.price = price;
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
            <div class="card__dropdown">
                <div class="card__dropdown-text">
                    Что включает страховка?
                </div>
                <img src="images/dropdown.svg" alt="">
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
    '.tarif-plan__cards',
    'tarif-plan__card'
).render();
new PriceCard(
    "Cтандарт",
    "бестселлер",
    " 9 400 ₸ ",
    " <strong> ОС ГПО ВТС</strong> с дополнительным лимитом ответственности.",
    '.tarif-plan__cards',
    'tarif-plan__card'
).render();
new PriceCard(
    "Премиум",
    "cамый дорогой",
    " 32 899 ₸ ",
    "Только <strong> ОС ГПО ВТС</strong> также <strong>  КАСКО </strong> на случай ДТП",
    '.tarif-plan__cards',
    'tarif-plan__card'
).render();