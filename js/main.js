(function () {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const services = ['Direito Civil', 'Direito Trabalhista', 'Direito de Família', 'Direito Empresarial', 'Direito Imobiliário'];
    const error_msgs = [...$$(".error")];
    const constraints = {
        email: {
            presence: {
                allowEmpty: false,
                message: "Campo obrigatório!"
            },
            email: {
                message: "Por favor, use um email válido!"
            }
        },
        message: {
            presence: {
                allowEmpty: false,
                message: "Campo obrigatório!"
            }
        },
        name: {
            presence: {
                allowEmpty: false,
                message: "Campo obrigatório!"
            }
        },
        phone: {
            presence: {
                allowEmpty: false,
                message: "Campo obrigatório!"
            },
            format: {
                pattern: "\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}", // Brazilian phone
                message: "Por favor, use um telefone válido!"
            }

        },
    }

    const contactForm = $("#contact-form");
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }

    function sendEmail(e) {
        e.preventDefault();
        clearErrors();
        const data = {}

        for ([key, value] of new FormData(this))
            data[key] = value;

        const errors = validate(data, constraints);

        if (errors) {
            error_msgs.forEach((err, index) => {
                const field = err.dataset.field;

                if (errors[field]) {
                    const errMessage = errors[field][0].slice(field.length + 1)

                    err.classList.remove("hidden");
                    err.textContent = errMessage;
                }
            })

            return;
        }

        clearErrors();

        // Show success message
        $("#form-fields").classList.add('hidden');
        $("#success-message").classList.remove('hidden');

        setTimeout(() => {
            $("input[name='email']").value = '';
            $("input[name='name']").value = '';
            $("input[name='phone']").value = '';
            $("select[name='service']").value = 0;
            $("textarea[name='message']").value = '';
        }, 500)

        data.service = services[data.service];

        /* 
        Here you could send the email.
        fetch(...)
            .then(res => res.json())
            .then(res => { ... })
        */
    }

    function clearErrors () {
        error_msgs.forEach(err => err.classList.add("hidden"));
    }

})();