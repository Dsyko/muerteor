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

Momentum.registerPlugin('slide-height-fade', function(options) {
	options = _.extend({
		duration: 250,
		delay: 0,
		easing: 'ease-in-out'
	}, options);

	return {
		insertElement: function(node, next, done) {
			var $node = $(node);

			$node
				.insertBefore(next)
				.css('height', $node.height()) // set explicit height
				.velocity("fadeOut", {
					duration: 0,
					queue: false
				})
				.velocity('slideDown', {
					easing: options.easing,
					duration: options.duration
				})
				.velocity("fadeIn", {
					duration: options.duration,
					complete: function() {
						$node.css('height', ''); // remove explicit height
						done();
					}
				});
		},
		removeElement: function(node, done) {
			var $node = $(node);
			$node
				.css('height', $node.height()) // set explicit height
				.velocity("fadeOut", {
					duration: options.duration
				})
				.velocity('slideUp', {
					easing: options.easing,
					duration: options.duration,
					queue: false,
					complete: function() {
						$node.remove();
						done();
					}
				});
		}
	};
});