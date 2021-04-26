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


class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.classes = classes;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className =>
                element.classList.add(className));
        }


        element.innerHTML =

            ` <img src= ${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider">   </div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          `;
        this.parent.append(element);
    }
}
new MenuCard(

    "img/tabs/vegy.jpg",
    "vegy",
    "MEnu Fitnes",
    'Menu fites - ryo bla bla bla',
    9,
    '.menu .container',
    'menu__item',
    'big'

).render();