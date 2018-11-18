document.addEventListener("DOMContentLoaded", function (event) {



    var initialScroll = window.scrollY;
    var actualScroll;
    var sections = $('section');
    var activeSection;
    var timer;

    function sectionInViewport() {

        var viewportTop = $(window).scrollTop();
        var viewportBottom = $(window).height() + viewportTop;

        var i;

        //pętla przez sekcje strony
        for (i = 0; i < sections.length; i++) {
            var forSection = sections[i];
            var forSectionHeight = $(forSection).height();
            var sectionTop = $(forSection).position().top;
            var sectionBottom = sectionTop + forSectionHeight;
            var scrollUpDown = scrollDirection();




            if (scrollUpDown == 'down') {
                if (viewportBottom > sectionTop) {
                    activeSection = i;

                }
            } else if (scrollUpDown == 'up') {
                if (viewportTop < sectionBottom) {
                    activeSection = i;

                    break;
                }
            }
        }
        initialScroll = actualScroll;

    }

    function scrollDirection() {

        actualScroll = window.scrollY;
        if (actualScroll > initialScroll) {

            return 'down';

        } else if (actualScroll < initialScroll) {

            return 'up';
        };
    }

    function scrollTimeout(event) {

        event.preventDefault();
        document.onmousewheel = stopScroll;
        var scrolledSection = activeSection;
        scrollListener;
        if (timer) {
            window.clearTimeout(timer);

        }
        timer = window.setTimeout(function () {
            // actual callback
            
            for(i = 0; i< sections.length; i++) {
                if(i == activeSection){
                    $(sections[activeSection]).removeClass('section--hide');
                    $(sections[activeSection]).addClass('section--show');
                }else{
                    $(sections[i]).removeClass('section--show');
                    $(sections[i]).addClass('section--hide');

                }
            }


            $('html').animate({
                scrollTop: sections[activeSection].offsetTop
            }, 200, function () {
               document.onmousewheel = startScroll;
                activeSection = scrolledSection;
            });

        }, 150);

    };

    function stopScroll() {

        return false;
    }

    function startScroll() {

        return true;
    }

    function scrollListener() {
        if (window.addEventListener('scroll', sectionInViewport)) {
            window.removeEventListener('scroll', sectionInViewport);
        } else {
            window.addEventListener('scroll', sectionInViewport);
        }
    }


    window.addEventListener('scroll', sectionInViewport);
    window.addEventListener('scroll', scrollTimeout);

});