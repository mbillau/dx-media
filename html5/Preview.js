define([
	"dojo/_base/declare",
	"./Image",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/on",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, Img, dom, lang, on, logger, timer){

	var log = logger('PRE', 1);

	return declare('dx-media.html5.Preview', [Img], {

		className:'dxPlayerPreview',

		constructor: function(){
			this.inherited(arguments);
			on(this, 'onImageLoaded', this, 'onReady');
		},

		postCreate: function(){
			this.inherited(arguments);
			log('postCreate');
		},

		onReady: function(){
			log('ready', this.src, this.width, this.height, this.nativeWidth, this.nativeHeight);
			this.imageAspect = this.nativeWidth / this.nativeHeight;
			//console.log('parent:', this.domNode.parentNode);
			if(this.domNode.parentNode){
				this.resize(dom.box(this.domNode.parentNode));
			}
		},

		resize: function(size){
			if(!size) return; // rogue dojo functionality telling us what to do
			//console.trace();
			if(!this.imageAspect){
				timer(this, function(){
					this.onSize(size);
				}, 100);
				return;
			}

			log('size', size.w, size.h);
			this.boxAspect = size.w / size.h;

			if(this.boxAspect == this.imageAspect){
				log('boxAspect equal');
				dom.style(this.domNode, {
					height:size.h+'px',
					width:size.w+'px',
					top:'0px',
					left:'0px'
				});
			}else if(this.boxAspect > this.imageAspect){
				log('boxAspect height');
				dom.style(this.domNode, {
					height:size.h+'px',
					width:'auto',
					top:'0px',
					left:.5*(size.w - ((size.h/this.nativeHeight)*this.nativeWidth))+'px'
				});
			}else{
				log('boxAspect width');
				dom.style(this.domNode, {
					width:size.w+'px',
					height:'auto',
					top:.5*(size.h - ((size.w/this.nativeWidth)*this.nativeHeight))+'px',
					left:'0px'
				});
			}

		}
	});

});
