(function(context) {
	var init = function() {
		var $comment = $('#comment'),
				$preview = $('#commentPreview'),
				$previewTxt = $preview.find('.commentTxt');
		
		$comment.bind('focus', function() {
			$preview[0].style.display = 'block';
		});
		
		$comment.bind('keyup', function() {
			$.ajax({
				url: '/markdownify',
				type: 'html',
				data: 'comment=' + $comment[0].value,
				method: 'post',
				success: function(markup) {
					$previewTxt.html(markup);
				}
			});
		});
	};
	
	$.domReady(init);
}(this));