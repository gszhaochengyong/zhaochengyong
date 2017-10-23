	function exchange(wheelDelta,item){
		console.log(item.index());
		if(wheelDelta){
			item.removeClass('active').addClass('next');
			item.prev(".page").addClass('active');
			$("#nav ul li").eq(item.index()).removeClass('active');
			$("#nav ul li").eq(item.index()-1).addClass('active');
		}else{
			item.removeClass('active').addClass('pre');
			item.next(".page").addClass('active');
			$("#nav ul li").eq(item.index()).removeClass('active');
			$("#nav ul li").eq(item.index()+1).addClass('active');
		}
	}

	
			if(wheelDelta<0&&$(this).index()<pages-1){
				exchange(wheelDelta,$(this));

			}else if(wheelDelta>0&&$(this).index()>0){
				exchange(wheelDelta,$(this));
			}
