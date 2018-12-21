'use strict';

//import {CTX, MATRIX} from './const.js';

export default function Popup() {
    const link = document.getElementById('link_popup');
    const containerForm = document.getElementById('js_container_form');
    const body = document.getElementsByTagName('body')[0];
    const closeButton = document.getElementById('form_close_button');

    link.addEventListener('click', function(event) {
        event.preventDefault();

        const widthWithoutScroll = document.documentElement.clientWidth;
        const widthWithScroll = window.innerWidth;

        containerForm.classList.add('visible');
        if (widthWithoutScroll < widthWithScroll) {
            body.classList.add('body_padding_right');
        }
        body.classList.add('body_overflow_hidden');
    });

    checkFormFields();

    window.addEventListener('click', function(event) {
        if (event.target === containerForm) {
            containerForm.classList.remove('visible');
            body.classList.remove('body_padding_right');
            body.classList.remove('body_overflow_hidden');
        }
    });

    closeButton.addEventListener('click', function(event) {
        containerForm.classList.remove('visible');
        body.classList.remove('body_padding_right');
        body.classList.remove('body_overflow_hidden');
    });
}
