ct.markdown = (function(md, $) {
			init = function() {
				var $comment = $('#comment'),
						$preview = $('#commentPreview'),
						$previewTxt = $preview.find('.commentTxt');
				
				$comment.focus(function() {
					$preview.slideDown();
				});
				
				
				$comment.keyup(function() {
					$.post('/markdownify', $comment.serialize(), function(markup) {
						$previewTxt.html(markup);
					});
				});
			};
	
	$(document).ready(init);
	
	return md;
	
}(ct.markdown || {}, jQuery));