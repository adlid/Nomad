const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {

            item.classList.remove(activeClass);

        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();
    header.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    })


}
tabs('.top__menu-list', '.top__menu-item', '.top__wrapper', 'active');

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

const url = 'https://jsonplaceholder.typicode.com/users';


class PriceCard {
    constructor(title, downTitle, price, text, base = null, standart = null, premium = null, dropdownTitle1 = null, dropdownText1 = null, dropdownTitle2 = null, dropdownText2 = null, dropdownTitle3 = null, dropdownText3 = null, parentSelector, ...classes) {
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
        this.premium = premium;
        this.standart = standart;
        this.base = base;
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
            <button class="card__btn ${this.base} ${this.standart} ${this.premium}">Купить</button>   
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
    'base',
    '',
    '',
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
    '',
    'standart',
    '',
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
    '',
    '',
    'premium',
    'ОС ГПО ВТС',
    ' Стандартный страховой полис обязательного страхования ответственности автовладельцев.',
    'Добровольное ГПО ВТС (ДГПО) ',
    ' Дополняет лимит ответственности к вашему полису ОС ГПО ВТС на еще один миллион тенге в случае, если стандартного лимита не хватило.',
    'КАСКО ДТП',
    'Страхование вашего собственного авто в случае ДТП. Приобретая этот страховой продукт не только пострадавший в ДТП получит страховую выплату но и вы сами.',
    '.tarif-plan__cards',
    'tarif-plan__card',

).render();
let btnClose = document.querySelector('.top__btn');
let tabClose = document.querySelector('.tab__close');
let tabOpen = document.querySelector('.top__calculator');
let parentTab = document.querySelector('.top__ogpo');
let insureWrapper = document.querySelector('.insure-wrapper');
let insurInfoBlock = document.querySelector('.insure__info-block')
btnClose.addEventListener('click', (e) => {
    tabClose.style.display = 'none';
    tabOpen.style.display = 'block';
    parentTab.style.overflow = "visible";
    parentTab.style.height = 1350 + 'px';
    //insureWrapper.style.display = 'none';
    //insurInfoBlock.style.display = 'none';
})

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
                    case 'BUTTON':
                        state[prop] = item.value;
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

let graphElem = document.querySelector('.top__ogpo');
let btnPsevdo = document.querySelector('.top__btn');
btnPsevdo.addEventListener('click', function(event) {
    graphElem.setAttribute('data-before', 'none');
});

/*
var dateerrors = false;
var yearReg = '(201[4-9]|202[0-9])'; ///< Allows a number between 2014 and 2029
var monthReg = '(0[1-9]|1[0-2])'; ///< Allows a number between 00 and 12
var dayReg = '(0[1-9]|1[0-9]|2[0-9]|3[0-1])'; ///< Allows a number between 00 and 31
//var hourReg = '([0-1][0-9]|2[0-3])';            ///< Allows a number between 00 and 24
//var minReg = '([0-5][0-9])';                    ///< Allows a number between 00 and 59
let date = document.querySelectorAll('.intelligence__form__input--date');
let iddat = document.querySelector('#dat');
var reg = new RegExp('^' + yearReg + '-' + monthReg + '-' + dayReg + '$', 'g');
$('input').filter(function() { return this.id.match(/document.querySelector('#dat')\d+_datetime/); }).each(function(e) {
    if (e > 0) {
        // Don't test the first input. This will use the default
        var val = $(this).val();
        if (val && !val.trim().match(reg)) {
            dateerrors = true;
            return false;
        }
    }
});
if (dateerrors) {
    alert('You must enter a validate date in the format "yyyy-mm-dd HH:MM", e.g. 2019-12-31 19:30');

}*/