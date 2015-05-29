(function(){

//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
//5月22日 添加 点击翻页效果
	if (pageIndex == pageTotal) {
		$('#page-hd').show();
		$('#page-ft').hide();
	}else if(pageIndex == 1){
		$('#page-hd').hide();
		$('#page-ft').show();
	}else{
		$('#page-hd').show();
		$('#page-ft').show();
	};
}

//分享

$('#js-btn-share').bind('tap',function(){
	$('#js-share').show();
})
$('#js-share').bind('tap',function(){
	$(this).hide();
});


var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

	//右侧nav 点击事件 
	// $('.nav li').bind('click',function(){
	// 	pageIndex = $(this).index()+1;
	// 	//$('.page').hide();
	// 	//$('.page').eq(pageIndex-1).show();
	// 	$('.page').removeClass('page-current');
	// 	$('.page').addClass('hide');
	// 	$('.page').eq(pageIndex-1).addClass('page-current');
	// 	$('.page').eq(pageIndex-1).removeClass('hide');
	// 	$('.nav li').removeClass('selected');
	// 	$('.nav li').eq(pageIndex-1).show().addClass('selected');
	// })

$(document).swipeUp(function(){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
		$('.nav li').removeClass('selected');                 // PTT Add
		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
		//$('.page').hide();
		//$('.page').eq(pageIndex-1).show();
		pageMove(towards.up);
		pageIndex6();
	}else{
		pageIndex=pageTotal;
	};

})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1;
		$('.nav li').removeClass('selected');				  // PTT Add
		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
	//$('.page').hide();
	//$('.page').eq(pageIndex-1).show();
		pageIndex6();
		pageMove(towards.down); 
	}else{
		pageIndex=pageTotal;
	};
})



// 鼠标点击向上翻页
$('#page-hd').bind('click',function(){
	if (pageIndex > 1) { 
		pageIndex -= 1; 
		$('.nav li').removeClass('selected');                 // PTT Add
		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
		$('.page').removeClass('page-current');
		$('.page').addClass('hide');
		$('.page').eq(pageIndex-1).addClass('page-current');
		// $('.page').hide();
		// $('.page').eq(pageIndex-1).show();
		pageMove(towards.up);
		pageIndex6();

	}else{
		pageIndex=pageTotal;
	};
})


// 鼠标点击向下翻页
$('#page-ft').bind('click',function(){
	if (pageIndex < pageTotal) { 
		pageIndex += 1; 
		$('.page').removeClass('page-current');
		$('.page').addClass('hide');
		$('.page').eq(pageIndex-1).addClass('page-current');
		// $('.page').hide();
		// $('.page').eq(pageIndex-1).show();
		$('.nav li').removeClass('selected');                 // PTT Add
		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
		pageIndex6();
		pageMove(towards.down);
	}else{
		pageIndex=pageTotal;
	};
})

function pageIndex6(){
	//5月22日 添加 点击翻页效果
	if (pageIndex == 6) {
		$('#page-hd').show();
		$('#page-ft').hide();
	}else if(pageIndex == 1){
		$('#page-hd').hide();
		$('#page-ft').show();
	}else{
		$('#page-hd').show();
		$('#page-ft').show();
	};
}

function pageMove(tw){
	var lastPage;
	if(tw=='1'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
	}else if(tw=='3'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
	}
	var nowPage = ".page-"+pageIndex;
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
	
}

// //禁用手机默认的触屏滚动行为
// document.addEventListener('touchmove',function(event){
// 	event.preventDefault(); },false);
// $(document).swipeUp(function(){
// 	if (isAnimating) return;
// 	if (pageIndex < pageTotal) { 
// 		pageIndex+=1; 
// 		$('.nav li').removeClass('selected');                 // PTT Add
// 		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
// 		pageMove(towards.up);
// 		pageIndex6();
// 	}else{
// 		pageIndex=pageTotal;
// 	};

// })

// $(document).swipeDown(function(){
// 	if (isAnimating) return;
// 	if (pageIndex > 1) { 
// 		pageIndex-=1;
// 		$('.nav li').removeClass('selected');				  // PTT Add
// 		$('.nav li').eq(pageIndex-1).addClass('selected');    // PTT Add
// 		pageIndex6();
// 		pageMove(towards.down); 
// 	}else{
// 		pageIndex=1;
// 	};
		
// })
})();
