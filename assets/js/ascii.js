// forked from demouth's "ASCII Art" https://jsdo.it/demouth/dxX2
setTimeout(function(){
  
	var img = document.createElement("img");
	
	img.onload = function(e){
		
		var aa = new AA();
		aa.init(img);
		aa.random = false;
		setInterval(function(){
			
			var master = [
				["$","M","@"],
				["M","W"],
				["%","#"],
				["8","9"],
				["D","S","Q"],
				["Z","V","E"],
				["U","O","C"],
				["b","d","k"],
				["+","t","y"],
				["(","/",")"],
				["[","]"],
				["i","l"],
				["^","~"],
				["`"],
				[" "]
			];
			var p= Math.sin(new Date().getTime()*0.0015)*0.5+0.5;
			var i = 0, l = master.length;
			var max = ~~(l * p)+1;
			var list = [];
			for(;i<max;i++){
				
				list.push( AA.prototype._pickRandom(master[i+(l-max)]) );
				
			}
			AADot.prototype.stringList = list;
			
			
			
			AALine.prototype.toString = function(){
				
				var i = 0,
					l = this.dots.length,
					str = "";
				
				for(;i<l;i++){
					if(i<p*l){
					str += this.dots[i].toString();
					}else{
					str += (p<i/l-Math.random()*0.4) ? " " : this.dots[i].toString();
					}
				}
				
				
				str += '\r\n';
				
				return str;
				
			};
			
			var str = aa.getString();
			
			document.getElementById("target").textContent  = str;
			
		},100);
	};
	
	img.src = "data:image/jpeg;base64,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";

},0);


var AA = function(){
	
	this.image;
	this.lines = [];
	this.random = true;
	
};
AA.prototype = {
	
	init : function(image){
		
		var imageData = this._convertToImageData(image);
		var data = imageData.data;
		var i = 0,
			l = h,
			w = imageData.width,
			h = imageData.height;
		var lines = [],
			line;
		
		data = this._canvasPixelArrayToArray(data);
		
		for(;i<h;i++){
			line = new AALine( data.splice(0,4*w) );
			lines.push(line);
		}
		
		this.lines = lines;
		
	},
	getString : function() {
		if(this.random) this._changeStringList();
		var i = 0,
			l = this.lines.length,
			str = "";
		for(;i<l;i++) str += this.lines[i].toString();
		return str;
	},
	getHtmlString : function() {
		if(this.random) this._changeStringList();
		var i = 0,
			l = this.lines.length,
			str = "";
		for(;i<l;i++) str += this.lines[i].toHtmlString();
		return str;
	},
	_convertToImageData : function(image){
		
		var c = document.createElement("canvas");
		c.width  = image.width;
		c.height = image.height;
		var cx = c.getContext("2d");
		var w = image.width,
			h = image.height;
		cx.drawImage(image,0,0,w,h);
		var imageData = cx.getImageData(0,0,w,h);
		
		return imageData;
		
	},
	_changeStringList : function(){
		
		var master = [
			["$","M","@"],
			["M","W"],
			["%","#"],
			["8","9"],
			["D","S","Q"],
			["Z","V","E"],
			["U","O","C"],
			["b","d","k"],
			["+","t","y"],
			["(","/",")"],
			["[","]"],
			["i","l"],
			["^","~"],
			["`"],
			[" "]
		];
		
		var i = 0, l = master.length;
		var list = [];
		for(;i<l;i++){
			
			list.push( this._pickRandom(master[i]) );
			
		}
		
		AADot.prototype.stringList = list;
		
	},
	_pickRandom : function(array){
		
		var l = array.length;
		
		return array[ ~~(Math.random() * l) ];
		
	},
	_canvasPixelArrayToArray : function(cpa) {
		
		var i = 0, l = cpa.length;
		var r = [];
		for(;i<l;i++) r.push(cpa[i]);
		return r;
		
	}
	
	
};


var AALine = function (imageData) {
	
	this.dots;
	if(imageData) this.init(imageData);
	
};

AALine.prototype = {
	
	init : function(imageData){
		
		var i = 0,
			l = imageData.length;
		
		var dots = [];
		
		for(;i<l;i+=4){
			
			var dot = new AADot(imageData[i],imageData[i+1],imageData[i+2],imageData[i+3]);
			dots.push(dot);
		}
		
		this.dots = dots;
		
	},
	toString : function(){
		
		var i = 0,
			l = this.dots.length,
			str = '';
		
		for(;i<l;i++) str += this.dots[i].toString();
		
		return str + '\r\n';
		
	},
	toHtmlString : function(){
		
		var i = 0,
			l = this.dots.length,
			str = '';
		
		for(;i<l;i++) str += this.dots[i].toHtmlString();
		
		return str + '<br>';
		
	}
	
};


var AADot = function(r,g,b,a){
	
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	
};

AADot.prototype = {
	stringList : ["$","M","%","8","D","Z","U","b","+","(","[","i","^","`"],
	toString : function(){
		
		var l = this.stringList.length;
		var b = this.getBrightness();
		var s = this.stringList[~~(b*(l-1)+0.5)];
		
		return s;
		
	},
	toHtmlString : function(){
		
		var s = '<span style="color:rgb(' + this.r + ',' + this.g +',' + this.b + ');">' + this.toString() + "</span>";
		
		return s;
		
	},
	getBrightness : function(){
		
		var t = this.r + this.g + this.b;
		
		return t / 765;
		
	}
};
