function Slider(obj) {
    this.speed = 300;
    this.sliderContainer =  obj.sliderContainer;
    this.sliderWrapper =    obj.sliderWrapper;
    this.sliderSlide =      obj.sliderSlide;
    this.sliderShowButton = obj.sliderShowButton;
    this.currentSlide =     obj.currentSlide ? obj.currentSlide : 0;
    this.infinity =         obj.infinity;

    this.sliderWidth = $(this.sliderContainer).outerWidth();

    if(this.infinity) {
        this.infinityScroll();
    }

    this.countSlides = $(this.sliderSlide).length;
}

Slider.prototype.infinityScroll = function() {
    this.currentSlide = 1;
    this.cloneElement($(this.sliderWrapper).find('.first'),'append');
    this.cloneElement($(this.sliderWrapper).find('.last'),'prepend');
    //Scroll to slide
    this.scrollSlides(this.sliderWidth * this.currentSlide, 0);
};

Slider.prototype.setWidthslider = function() {
    this.sliderWidth = $(this.sliderContainer).outerWidth();
    //Set width
    $(this.sliderWrapper).outerWidth(this.sliderWidth * this.countSlides);
    $(this.sliderSlide).outerWidth(this.sliderWidth);
};

Slider.prototype.cloneElement = function(el,to) {
    var elParent = el.parent();
    el = el.clone().addClass('clone');
    if(to == 'prepend') {
        el.prependTo(elParent);
    }
    if(to == 'append') {
        el.appendTo(elParent);
    }
};

Slider.prototype.previousSlide = function() {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
    this.scrollSlides(this.sliderWidth * this.currentSlide, this.speed);
};

Slider.prototype.nextSlide = function() {
    this.currentSlide = Math.min(this.currentSlide + 1, this.countSlides - 1);
    this.scrollSlides(this.sliderWidth * this.currentSlide, this.speed);
};

Slider.prototype.scrollSlides = function(distance, duration) {
    $(this.sliderWrapper).css('transition-duration', (duration / 1000).toFixed(1) + 's');
    //inverse the number we set in the css
    var value = (distance < 0 ? '' : '-') + Math.abs(distance).toString();
    $(this.sliderWrapper).css('transform', 'translate(' + value + 'px,0)');
};

Slider.prototype.swipeScroll = function() {
    var obj = this;
    $(obj.sliderWrapper).swipe({
        triggerOnTouchEnd: true,
        allowPageScroll: 'vertical',
        threshold: 75,
        swipeStatus:function(event, phase, direction, distance, fingerCount) {
            if (phase == 'move' && (direction == 'left' || direction == 'right')) {
                var duration = 0;

                if (direction == 'left') {
                    if(obj.infinity && obj.currentSlide == obj.countSlides - 1) {
                        obj.currentSlide = 1;
                        obj.scrollSlides(obj.sliderWidth * obj.currentSlide, 0);
                    }
                    else {
                        obj.scrollSlides(obj.sliderWidth * obj.currentSlide + distance, duration);
                    }
                } else if (direction == 'right') {
                    if(obj.infinity && obj.currentSlide == 1) {
                        obj.currentSlide = obj.countSlides - 1;
                        obj.scrollSlides(obj.sliderWidth * obj.currentSlide, 0);
                    }
                    else {
                        obj.scrollSlides(obj.sliderWidth * obj.currentSlide - distance, duration);
                    }
                }
            }
            else if (phase == 'cancel') {
                obj.scrollSlides(obj.sliderWidth * obj.currentSlide, obj.speed);
            }
            else if (phase == 'end') {
                if (direction == 'right') {
                    obj.previousSlide();
                } else if (direction == 'left') {
                    obj.nextSlide();
                }
            }
        }
    });
};

Slider.prototype.resizeWindow = function() {
    var obj = this;
    $(window).resize(function() {
        obj.setWidthslider();
        obj.scrollSlides(obj.sliderWidth * obj.currentSlide,0);
    });
};

Slider.prototype.sliderShow = function() {
    var slider = $(this.sliderContainer);
    $(this.sliderShowButton).click(function() {
        slider.addClass('show');
    });
};

Slider.prototype.sliderHide = function() {
    var obj = this,
        slider = $(this.sliderContainer);

    slider.find('.slider-hide').click(function() {
        slider.removeClass('show');
        obj.currentSlide = obj.infinity ? 1 : 0;
        obj.scrollSlides(obj.sliderWidth * obj.currentSlide, 0);
    });
};

Slider.prototype.run = function() {
    //Set width slider
    this.setWidthslider();

    //Init swipe
    this.swipeScroll();

    //Calculate the size of the slider when the screen change
    this.resizeWindow();

    //Slider show
    this.sliderShow();

    //Slider hide
    this.sliderHide();
};

var sliderSmall = new Slider({
    infinity: false,
    sliderContainer:  '#slider-small',
    sliderWrapper:    '#slider-small .slider-wrapper',
    sliderSlide:      '#slider-small .slider-slide',
    sliderShowButton: '.slider-show[data-slider="slider-small"]'
});
sliderSmall.run();

var sliderLarge = new Slider({
    infinity: true,
    sliderContainer:  '#slider-large',
    sliderWrapper:    '#slider-large .slider-wrapper',
    sliderSlide:      '#slider-large .slider-slide',
    sliderShowButton: '.slider-show[data-slider="slider-large"]'
});
sliderLarge.run();