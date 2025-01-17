let scriptValidator = {

    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = document.querySelectorAll('input');

        scriptValidator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = scriptValidator.checkInput(input);
            if (check !== true) {
                send = false;
                //exibir erro
                scriptValidator.showError(input, check);
            }
        };



        if (send) {
            form.submit();

        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {

                    case 'required':
                        if (input.value == '') {
                            return ('Este campo é obrigatorio.')
                        }
                        break;

                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return ('Campo precisa ter pelo menos ' + rDetails[1] + ' caracteres');
                        }

                        break;

                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Este e-mail não é valido.';
                            }
                        }

                        break;

                    case 'min':

                        if (input.value.length < rDetails[5]) {
                            return ('Este campo precisa ter pelo menos ' + rDetails[5] + ' digitos');
                        }
                        break;

                };
            };
        };

        return true;
    },
    showError: (input, error) => {

        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.elementSibling);

    },
    clearErrors: () => {

        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove('error');
        }

    }

};


let form = document.querySelector('.form-validator');
form.addEventListener('submit', scriptValidator.handleSubmit);