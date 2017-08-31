/*
 * Created by moksh on 18/4/16.
 */

//Following is not working

 $(window).resize(function() 
            {

            var viewportWidth = $(window).width();

            var viewportHeight = $(window).height();

            //do your layout change here.

            });

$(document).ready(function() {


        //for green background taking whole screen
        var bg = jQuery("#bg1");
        var bg2 = jQuery("#bg2")
        jQuery(window).resize("resizeBackground");
        function resizeBackground() {
            if(jQuery(window).height() < 614|| jQuery(window).height()> 700)
            {
                bg.height(680);
                bg2.height(580-60);
            }
            else
            {
                bg.height(jQuery(window).height());
                bg2.height(jQuery(window).height()-60);

            }
        }

        // resizeBackground();



        //for feedback and contact us form right-padding scrollbar error

        $('#mymodal5').on('show.bs.modal', function (e) {

            $('body').addClass('test');

        })

    }
)


       
1
2



$(document).on('hide.bs.modal','#resultSuccessModal', function () {
  //alert('hey this is invite tenant modal opening up man');
  //$("#myModal4").empty();
  //$(this).$setUntouched();
  //document.location.reload();

})

$(function() {  
  
  
});




