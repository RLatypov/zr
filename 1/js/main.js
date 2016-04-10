$(document).ready(function() {
    $('.tooltip').each(function() {
        var $this = $(this);
        $this.css('marginTop',-$this.outerHeight()/2);
    });

    $('.point .number').hover(
        function() {
            $(this).parent().addClass('hover');
        },
        function(){
            $(this).parent().removeClass('hover');
        }
    );
});