//keep element in view
(function($)
{
    $(document).ready( function()
    {
        var elementPosTop = $('#stars').position().top;
        $(window).scroll(function()
        {
            var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
            //if top of element is in view
            if (wintop > elementPosTop)
            {
                //always in view
                $('#stars').css({ "position":"fixed", "top":"0px" });
            }
            else
            {
                //reset back to normal viewing
                $('#stars').css({ "position":"inherit" });
            }
        });
    });
})(jQuery);