(function () {
    $(function() {
        FastClick.attach(document.body);
        var scrollCfg = {
            scrollX: true,
            scrollY: false,
            tap:true 
        };
        // var projectsHeader = new IScroll('#projects-header', scrollCfg),
        //     projectsPortfolio = new IScroll('#projects-portfolio', scrollCfg);
    });
    $('.nav__toggle').click(function() {
        $('.nav__menu').toggleClass('is-active');
    });
    
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
                    }, 10000);
                    if (response.success) alert('Спасибо за интерес к нашему продукту! Мы с вами свяжемся в ближайшее время.');
                    else alert('Что-то пошло не так. Попробуйте еще раз.','Ошибка');
                }
            });
        }
    });
    var $scrollEl = $('html, body'),
        SCROLL_TIME = 600;
    function scrollToEl (el, offset) {
        if (offset == undefined) offset = 0;
        if (el) scrollTo (el.offset().top + offset);
    }
    function scrollTo (pos) {
        $scrollEl.animate({
            scrollTop: pos
        }, SCROLL_TIME);
    }
    // projects
    (function () {
        var ACTIVE_CLASS = 'is-active';

        var $projects = $('.projects__item'),
            $portfolios = $('.portfolio__item'),
            $cur_project = $portfolios.filter('.'+ACTIVE_CLASS);
        
        $projects.on('click', function (e, idx) {
            $projects.removeClass(ACTIVE_CLASS);
            $(this).addClass(ACTIVE_CLASS);

            $portfolios.removeClass(ACTIVE_CLASS);
            $cur_project = $portfolios.eq($(this).index());

            $cur_project.addClass(ACTIVE_CLASS);
            scrollToEl($cur_project);
            // scrollTo
            // console.log($(this).index());
        })
    })();

    
    function getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ))
        return 'ios';
      else if( userAgent.match( /Android/i ))
        return 'android';
      else
        return null;
    }

    // scroll to
    (function () {
        var $scrollToEls = $('[scroll-to]');
        $('[scroll-to]').bind('click', function () {
            var scrollToSel = $(this).attr('scroll-to');
            if (scrollToSel) 
                scrollToEl($(scrollToSel), -30);
        })
    })();
    // adding platform description for install links
    (function () {
        var $hrefs = $('[href-android],[href-ios]');
        $hrefs.each(function (item) {
            var platform = [];
            item = $(this);
            if (item.attr('href-ios')) platform.push('iOS');
            if (item.attr('href-android')) platform.push('Android');

            $(this).html($(this).html() + ' ('+platform.join(', ')+')')
        })
    })();
    // platform hrefs
    (function () {
        var platform = getMobileOperatingSystem();
        if (!platform) {
            $('[href-android],[href-ios]').click(function () {
                alert('Для установки приложения, перейдите на сайт с мобильного устройства');
            });
            return;
        }
        var hrefAttr = 'href-'+platform;
        var $hrefs = $('['+hrefAttr+']');
        $hrefs.each(function () {
            var href = $(this).attr(hrefAttr);;
            if (href) $(this).attr('href', href);
        })
        

    }) ();
})();