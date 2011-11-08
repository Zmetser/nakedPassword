/*
---
copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};(function(){var b=function(e,d){var f=[];Object.each(d,function(g){Object.each(g,function(h){e.each(function(i){f.push(i+"-"+h+(i=="border"?"-width":""));
});});});return f;};var c=function(f,e){var d=0;Object.each(e,function(h,g){if(g.test(f)){d=d+h.toInt();}});return d;};var a=function(d){return !!(!d||d.offsetHeight||d.offsetWidth);
};Element.implement({measure:function(h){if(a(this)){return h.call(this);}var g=this.getParent(),e=[];while(!a(g)&&g!=document.body){e.push(g.expose());
g=g.getParent();}var f=this.expose(),d=h.call(this);f();e.each(function(i){i();});return d;},expose:function(){if(this.getStyle("display")!="none"){return function(){};
}var d=this.style.cssText;this.setStyles({display:"block",position:"absolute",visibility:"hidden"});return function(){this.style.cssText=d;}.bind(this);
},getDimensions:function(d){d=Object.merge({computeSize:false},d);var i={x:0,y:0};var h=function(j,e){return(e.computeSize)?j.getComputedSize(e):j.getSize();
};var f=this.getParent("body");if(f&&this.getStyle("display")=="none"){i=this.measure(function(){return h(this,d);});}else{if(f){try{i=h(this,d);}catch(g){}}}return Object.append(i,(i.x||i.x===0)?{width:i.x,height:i.y}:{x:i.width,y:i.height});
},getComputedSize:function(d){d=Object.merge({styles:["padding","border"],planes:{height:["top","bottom"],width:["left","right"]},mode:"both"},d);var g={},e={width:0,height:0},f;
if(d.mode=="vertical"){delete e.width;delete d.planes.width;}else{if(d.mode=="horizontal"){delete e.height;delete d.planes.height;}}b(d.styles,d.planes).each(function(h){g[h]=this.getStyle(h).toInt();
},this);Object.each(d.planes,function(i,h){var k=h.capitalize(),j=this.getStyle(h);if(j=="auto"&&!f){f=this.getDimensions();}j=g[h]=(j=="auto")?f[h]:j.toInt();
e["total"+k]=j;i.each(function(m){var l=c(m,g);e["computed"+m.capitalize()]=l;e["total"+k]+=l;});},this);return Object.append(e,g);}});})();(function(b){var a=Element.Position={options:{relativeTo:document.body,position:{x:"center",y:"center"},offset:{x:0,y:0}},getOptions:function(d,c){c=Object.merge({},a.options,c);
a.setPositionOption(c);a.setEdgeOption(c);a.setOffsetOption(d,c);a.setDimensionsOption(d,c);return c;},setPositionOption:function(c){c.position=a.getCoordinateFromValue(c.position);
},setEdgeOption:function(d){var c=a.getCoordinateFromValue(d.edge);d.edge=c?c:(d.position.x=="center"&&d.position.y=="center")?{x:"center",y:"center"}:{x:"left",y:"top"};
},setOffsetOption:function(f,d){var c={x:0,y:0},g=f.measure(function(){return document.id(this.getOffsetParent());}),e=g.getScroll();if(!g||g==f.getDocument().body){return;
}c=g.measure(function(){var i=this.getPosition();if(this.getStyle("position")=="fixed"){var h=window.getScroll();i.x+=h.x;i.y+=h.y;}return i;});d.offset={parentPositioned:g!=document.id(d.relativeTo),x:d.offset.x-c.x+e.x,y:d.offset.y-c.y+e.y};
},setDimensionsOption:function(d,c){c.dimensions=d.getDimensions({computeSize:true,styles:["padding","border","margin"]});},getPosition:function(e,d){var c={};
d=a.getOptions(e,d);var f=document.id(d.relativeTo)||document.body;a.setPositionCoordinates(d,c,f);if(d.edge){a.toEdge(c,d);}var g=d.offset;c.left=((c.x>=0||g.parentPositioned||d.allowNegative)?c.x:0).toInt();
c.top=((c.y>=0||g.parentPositioned||d.allowNegative)?c.y:0).toInt();a.toMinMax(c,d);if(d.relFixedPosition||f.getStyle("position")=="fixed"){a.toRelFixedPosition(f,c);
}if(d.ignoreScroll){a.toIgnoreScroll(f,c);}if(d.ignoreMargins){a.toIgnoreMargins(c,d);}c.left=Math.ceil(c.left);c.top=Math.ceil(c.top);delete c.x;delete c.y;
return c;},setPositionCoordinates:function(k,g,d){var f=k.offset.y,h=k.offset.x,e=(d==document.body)?window.getScroll():d.getPosition(),j=e.y,c=e.x,i=window.getSize();
switch(k.position.x){case"left":g.x=c+h;break;case"right":g.x=c+h+d.offsetWidth;break;default:g.x=c+((d==document.body?i.x:d.offsetWidth)/2)+h;break;}switch(k.position.y){case"top":g.y=j+f;
break;case"bottom":g.y=j+f+d.offsetHeight;break;default:g.y=j+((d==document.body?i.y:d.offsetHeight)/2)+f;break;}},toMinMax:function(c,d){var f={left:"x",top:"y"},e;
["minimum","maximum"].each(function(g){["left","top"].each(function(h){e=d[g]?d[g][f[h]]:null;if(e!=null&&((g=="minimum")?c[h]<e:c[h]>e)){c[h]=e;}});});
},toRelFixedPosition:function(e,c){var d=window.getScroll();c.top+=d.y;c.left+=d.x;},toIgnoreScroll:function(e,d){var c=e.getScroll();d.top-=c.y;d.left-=c.x;
},toIgnoreMargins:function(c,d){c.left+=d.edge.x=="right"?d.dimensions["margin-right"]:(d.edge.x!="center"?-d.dimensions["margin-left"]:-d.dimensions["margin-left"]+((d.dimensions["margin-right"]+d.dimensions["margin-left"])/2));
c.top+=d.edge.y=="bottom"?d.dimensions["margin-bottom"]:(d.edge.y!="center"?-d.dimensions["margin-top"]:-d.dimensions["margin-top"]+((d.dimensions["margin-bottom"]+d.dimensions["margin-top"])/2));
},toEdge:function(c,d){var e={},g=d.dimensions,f=d.edge;switch(f.x){case"left":e.x=0;break;case"right":e.x=-g.x-g.computedRight-g.computedLeft;break;default:e.x=-(Math.round(g.totalWidth/2));
break;}switch(f.y){case"top":e.y=0;break;case"bottom":e.y=-g.y-g.computedTop-g.computedBottom;break;default:e.y=-(Math.round(g.totalHeight/2));break;}c.x+=e.x;
c.y+=e.y;},getCoordinateFromValue:function(c){if(typeOf(c)!="string"){return c;}c=c.toLowerCase();return{x:c.test("left")?"left":(c.test("right")?"right":"center"),y:c.test(/upper|top/)?"top":(c.test("bottom")?"bottom":"center")};
}};Element.implement({position:function(d){if(d&&(d.x!=null||d.y!=null)){return(b?b.apply(this,arguments):this);}var c=this.setStyle("position","absolute").calculatePosition(d);
return(d&&d.returnPos)?c:this.setStyles(c);},calculatePosition:function(c){return a.getPosition(this,c);}});})(Element.prototype.position);