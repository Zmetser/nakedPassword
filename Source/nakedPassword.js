/*
---

name: NakedPassword

description: Visualize password strength with a stripping man or women.

license: Dual licensed under the MIT or GPL Version 2 licenses.

authors:
  - Kovács Olivér

version: 0.3.0

requires:
  - Core/Class.Extras
  - Core/Element.Event
  - Core/Element.Style
  - Core/Element.Dimensions
  - Core/Fx.Tween
  - More/Element.Position
  - More/Element.Measure
  - More/Assets

provides: [nakedPassword]

...
*/
(function () {
	var nakedPassword = new Class({
		Implements : [Options, Events],

		options : {
			path     : 'images/',         // Path to the images
			sex      : 'female',          // female | male
			resize   : true,              // Resize the image to the height of the input field
			imgClass : 'nakedPasswdImage',// Class on the image
			imgSize  : {                  // Image dimensions
				width: 30,
				height: 28
			}
		},

		toElement: function() {
			return this.element;
		},

		initialize : function (element, options) {
			this.setOptions(options);

			this.o = this.options;

			this.element = document.id(element);
			this.bound = this.trigger.bind(this);
			this.imageSrc = this.o.path + this.o.sex + '.png';

			this.build().attach();

			this.$el = $(document.createElement('span'));
			this.$el.setStyle('display', 'block');

			return this;
		},

		attach : function () {
			$(this).addEvents({
				'keyup': this.bound,
				'blur': this.bound
			});

			return this;
		},

		trigger : function (event) {
			this.strength = this._getPasswordStrength(event.target.value);
			this.update();

			return this;
		},

		build : function () {
			console.log(this.imageSrc);
			var loader = new Asset.image(this.imageSrc, {
				'class': this.o.imgClass,
				styles: {
					opacity: 0,
					visibility: 'hidden'
				},
				onLoad: function(image) {
					this.imageWidth = this.o.imgSize.width;
					this.imageHeight = this.o.imgSize.height;

					if (this.o.resize) {
						// Get dimensions and resize
						this.imageHeight = $(this).getComputedSize().height;
						ratio = this.imageHeight / this.o.imgSize.height;
						this.imageWidth = parseInt(this.o.imgSize.width * ratio, 10);

						this.$el.setStyle('backgroundSize', this.imageWidth + 'px ' + this.imageHeight * 5 + 'px');
					}

					// Set dimensions
					this.$el.setStyles({
						width: this.imageWidth,
						height: this.imageHeight,
						backgroundImage: 'url(' + this.imageSrc + ')',
						backgroundRepeat: 'no-repeat'
					});

					// Inject image
					this.$el.inject($(this), 'after');

					// Position image to the right of the input field
					this.$el.position({
						relativeTo: $(this),
						position: 'centerRight',
						edge: 'centerRight',
						offset: {x: -10}
					});
				}.bind(this)
			});

			return this;
		},

		update : function () {
			this.$el.setStyle('backgroundPosition', '0 ' + -(this.strength * this.imageHeight) + 'px');
			this.$el.fade('in');

			return this;
		},

		/**
		 * Naked Password Version 0.2.4
		 * http://www.nakedpassword.com/
		 *
		 * Copyright 2010, Platform45
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 */
		_getPasswordStrength : function (password) {
			return 0
				// if password bigger than 5 give 1 point
				+ +( password.length > 5 )
				// if password has both lower and uppercase characters give 1 point
				+ +( /[a-z]/.test(password) && /[A-Z]/.test(password) )
				// if password has at least one number and at least 1 other character give 1 point
				+ +( /\d/.test(password) && /\D/.test(password) )
				// if password has a combination of other characters and special characters give 1 point
				+ +( /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password) && /\w/.test(password) )
				// if password bigger than 12 give another 1 point (thanks reddit)
				+ +( password.length > 12 );
		}
	});

	Element.implement({

		nakedPassword : function (options) {
			return this.store('nakedpass', new nakedPassword(this, options));
		}

	});
}());