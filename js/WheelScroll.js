var WheelScroll = (function(){
	function WheelScroll(_opt) {
		var obj = this;
		if(_opt) {
			if(_opt.page) this.page = $(_opt.page);
			else this.page = $(".page");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".page");
			this.speed = 200;
		}
		this.scTop = $(window).scrollTop();
		this.gap = [];
		this.now = 0;
		this.dir = 0;
		$(window).resize(function(){
			$(obj.page).each(function (i) {
				obj.gap[i] = $(this).offset().top;
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
	WheelScroll.prototype.init = function(obj){
		$(window).on("mousewheel DOMMouseScroll", wheelFn);
		function wheelFn(e) {
			e.preventDefault();
			e.stopPropagation();
			obj.dir = e.originalEvent.wheelDelta;
			obj.scTop = $(window).scrollTop();
			$(window).off("mousewheel DOMMouseScroll");
			for (var i=0; i<obj.gap.length; i++) {
				if (obj.scTop <= obj.gap[i]) {
					obj.now = i;
					break;
				}
			}
			if (obj.dir > 0) { if (obj.now > 0) obj.now--; } 
			else { if (obj.now < obj.gap.length - 1) obj.now++; }
			obj.animation(obj, function(){
				$(window).on("mousewheel DOMMouseScroll", wheelFn);
			});
		}
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function(){
			var oldNow = now;
			now = $(this).data("now");
			var speedGap = Math.abs(now - oldNow);
			$("html, body").stop().animate({"scrollTop": gap[now] + "px"}, 100*speedGap);
		});
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		$("html, body").stop().animate({"scrollTop": obj.gap[obj.now] + "px"}, obj.speed, fn);
	}
	return WheelScroll;
}());