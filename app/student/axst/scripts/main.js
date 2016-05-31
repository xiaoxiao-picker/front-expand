(function($) {
	$(document).on("click", ".signup-btn", function() {
		$(this).css({
			'display': 'none'
		});
		$("#ModalContainer").addClass('show');
	});
})(jQuery);