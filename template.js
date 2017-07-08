
$(function() {

	var $input = $('#title');
	var err_style = 'display: none; font-size: 13px; font-weight: normal';

	var matchAnywhere = ASK_NOTICE_MATCH;
	var notices = ASK_NOTICE_DATA;

	function make_error(msg)
	{
		return $('<div id="qa-error-title" class="qa-error" style="' + err_style + '">' + msg + '</div>');
	}

	function find_triggers(keywords, input)
	{
		for (var i in keywords) {
			var regex = keywords[i];
			if (!matchAnywhere) {
				regex = '\\b'+regex+'\\b';
			}
			if (input.match(regex)) {
				return true;
			}
		}

		return false;
	}

	$input.change(function() {
		$('#qa-error-title').remove();
		var title = $(this).val().toLowerCase();
		$err = null;

		for (var n in notices) {
			var keywords = notices[n].keys.toLowerCase().split(',');
			var message = notices[n].text;
			if (find_triggers(keywords, title)) {
				$err = make_error(message);
			}
		}

		if ($err) {
			$err.insertAfter($input).fadeIn('slow');
		}
	});

});
