/*
---

name: NakedPassword

description: Visualize password strength with a stripping man or women.

license: Dual licensed under the MIT or GPL Version 2 licenses.

authors:
  - Kovács Olivér

requires:
  - Core/Class.Extras
  - Core/Element.Event
  - Core/Element.Dimensions
  - Core/Fx.Tween
  - More/Element.Position

provides: [nakedPassword]

...
*/
(function () {
	var nakedPassword = new Class({
		Implements : [Options, Events],
		
		options : {
			path		: 'images/',			// Path to the images
			sex			: 'f',					// Change image sex. f for female, m for male.
			resize		: 'true',				// Resize the image to the height of the input field
			imgClass	: 'nakedPasswdImage'	// Class on the image
		},
		
		toElement: function() {
			return this.element;
		},
		
		initialize : function (element, options) {
			this.setOptions(options);
			
			this.o = this.options;
			
			this.element = document.id(element);
			this.bound = this.trigger.bind(this);
			this.build().attach();
			
			return this;
		},
		
		attach : function () {
			$(this).addEvents({
				'keyup' : this.bound,
				'blur'  : this.bound
			});
			
			return this;
		},
		
		trigger : function (event) {
			this.strength = this._getPasswordStrength(event.target.value);
			this.update();
			
			return this;
		},
		
		build : function () {
			// Create image
			this.img = new Element('img', {
				src: this.o.path + this.o.sex + '0.png',
				'class': this.o.imgClass,
				styles: {
					opacity: 0,
					visibility: 'hidden'
				}
			});
			
			// Get dimensions and resize
			var imgSize			= this.img.measure(function() { return this.getSize(); }),
				inputHeight		= $(this).getComputedSize().height,
				ratio			= inputHeight / imgSize.y;
			
			// Set image dimensions and inject after input field
			this.img.set({
				width:  this.o.resize ? imgSize.x * ratio : imgSize.x,
				height: this.o.resize ? inputHeight : imgSize.y
			}).inject($(this), 'after');
			
			// Position image to the right of the input field
			this.img.position({
				relativeTo: $(this),
				position: 'centerRight',
				edge: 'centerRight',
				offset: {x: -10}
			});
			
			return this;
		},
		
		update : function () {
			this.img.set('src', this.o.path + this.o.sex + this.strength + '.png');
			this.img.fade('in');
			
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