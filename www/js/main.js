(function () {
    
    var $submit = $('#feedbackForm button[type="submit"]'),
        submitText;
    var $form = $('#feedbackForm');

    $form.validate({
        highlight: function(input) {
            $(input).addClass('error');
        },
        errorPlacement: function(error, element){},
        submitHandler: function(form) {
            submitText = $submit.html();
            $submit.html('Отправка сообщения...');
            //return;
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) {
                    $submit.html('Сообщение отправлено!');
                    setTimeout(function () {
                        $submit.html(submitText);  
                        $form[0].reset();
                    }, 500);
                    if (response.success) alert('Спасибо за интерес к нашему продукту! Мы с вами свяжемся в ближайшее время.');
                    else alert('Что-то пошло не так. Попробуйте еще раз.','Ошибка');
                }
            });
        }
    });

    (function () {

        var $form = $('#installForm'),
            $form_submit = $('#installApp_submit');
        $form_submit.click(function (e) {
            $form.submit();
            e.preventDefault();
        });
        $form.validate({
            highlight: function(input) {
                $(input).addClass('error');
            },
            errorPlacement: function(error, element){},
            submitHandler: function(form) {
                $.ajax({
                    url: form.action,
                    type: form.method,
                    data: $(form).serialize(),
                    success: function(response) {
                        alert('Ссылка отправлена на вашу почту');
                    }
                });
            }
        });
    })();

})();