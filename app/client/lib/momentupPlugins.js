Momentum.registerPlugin('velocity-reverse', function(options) {
	options = _.extend({
		duration: 350,
		delay: 0
	}, options);
	return {
		insertElement: function(node, next, done) {
			var $node = $(node);
			//console.log('Current height: ', $node.height());
			$node
				.hide()
				//.css('height', $node.height()) // set explicit height
				.insertBefore(next)
				.velocity("transition.slideRightIn", {
					duration: options.duration,
					delay: options.duration + 5//,
					//complete: function() {
					//	$node.css('height', ''); // remove explicit height
					//	console.log('Complete height: ', $node.height());
					//	done();
					//}
				});

		},
		moveElement: function(node, next) {
			this.removeElement(node);
			this.insertElement(node, next);
		},
		removeElement: function(node) {
			$(node)
				.velocity("transition.slideLeftOut", {
					duration: options.duration,
					complete: function() {
						$(node).remove();
					}
				});
		}
	};
});