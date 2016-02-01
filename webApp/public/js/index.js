$(document).ready(function(){
	$('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('[data-schedule-cc]').click(function() {
    	var val = $(this).find('input').val();
    	if (val == 'on') {
			$(this).find('input').val('off');
			$(this).find('.card').css('border', 'none');
    	} else {
			$(this).find('input').val('on');
			$(this).find('.card').css('border', 'solid #ff7050 3px');
    	}
    });
});