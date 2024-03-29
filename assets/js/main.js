(function($) {

	var	$window = $(window),
		$header = $('#header'),
		$body = $('body');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

window.onload = () => {
//hohvatanje linkova iz menu.json
var linkovi=[];
$.ajax({
	url:'assets/data/menu.json',
	method:"get",
	dataType:'json',
	success:function(result)
	{		
		linkovi=result;
		linkovi.forEach(element => {
			//console.log(element.naziv);
			if(element.naziv=='Home'||element.naziv=='Products')
			{
				$("#menu #first").append('<li><a href="'+element.href+'" >'+element.naziv+'</a></li>')
			}
			if(element.naziv=='Cart')
			{
				$("#menu #first").append('<li><a href="'+element.href+'" >'+element.naziv+'</a></li><li><a href="#" class="dropdown-toggle">About</a><ul id="second"></ul></li>')
			}
			if(element.naziv=='About Us'||element.naziv=='Blog'||element.naziv=='Testimonials'||element.naziv=='Terms')
			{
				$("#menu #second").append('<li><a href="'+element.href+'" >'+element.naziv+'</a></li>')
			}
			if(element.naziv=='Contact Us'||element.naziv=='Author'||element.naziv=='Documentation')
			{
				$("#menu #first").append('<li><a href="'+element.href+'" >'+element.naziv+'</a></li>')
			}
		});
	}
})
//ispis linkova u meniju
var ispis="";
//ispis artikla
var books=[];

$.ajax({
	url:'assets/data/books.json',
	method:"get",
	dataType:'json',
	success:function(result)
	{	setLocalStorage("books",result);	
		books=result;
		var ispis='';
		books.forEach(element => {
			//console.log(element.slika.src);
			ispis+=`
			<article class='details' data-id="${element.id}" class="style${element.id}">
			<span class="image">
				<img src="${element.slika.src}" alt="${element.slika.alt}" />
			</span>
			<a data-id="${element.id}" href="product-details.html" >
			
				
			</a>
			<br>
			<div id="opis" >
			<label><p>${obradaZvezda(element.zvezde)}</p></label>
			<label><p>Categories:&nbsp;${obradaZanra(element.idKategorije)}</p></label>
			<label><p>Language:&nbsp;${element.language}</p></label>
			<label><p>Pages:&nbsp;${element.pages}</p></label>
			<label><p>Date:&nbsp;${element.publicationDate}</p></label>
			<label><p>Status:&nbsp;${obradaStanja(element.naStanju)}</p></label>
			<label><p>Delivery:&nbsp;${obradaDostave(element.freeDelivery)}</p></label>
			<h1 style="font-size:20px;"></h1>
			<h1 style="color:#f2849e;"><mark style=" text-decoration: line-through; font-size:30px;">${element.staraCena}</mark> &nbsp;${element.novaCena}€</h1>
			</div>
		</article>
			`
		});
		$(".books").html(ispis);
		$(".details").click(detail);
	}
});


var categories=[];
function ajaxZaSve(url, method, result){
    $.ajax({
        url:url,
        method: method,
        dataType: "json",
        success: result,
        error: function(xhr){console.log(xhr);}
    });
}

ajaxZaSve("assets/data/categories.json","get",function(result)
{
	categories.push(result);
	setLocalStorage("cat",result);
});

//console.log(categories);
//console.log(zanrovi);
	var url=window.location.href;
if(url.indexOf('contact.html')!=-1)
{
	$("#name").on("focus",function()
	{
		console.log("ccc")
		$("#hidName").css("display","none");
	})
	$("#email").on("focus",function()
	{
		console.log("ccc")
		$("#hidEmail").css("display","none");
	})
	$("#subject").on("focus",function()
	{
		console.log("ccc")
		$("#hidTel").css("display","none");
	})
	$(".primary2").on("click",function()
	{
		// var namee=$("#name").val();
var email=$("#email").val();
var tel=$("#subject").val();
var name=$("#name").val();
var regName=/^([A-ZČĆŽŠĐ][a-zčćžšđ]{1,20})+$/;
var regEmail=/^[^@]+@[^@]+\.[^@\.]+$/;
var regTel=/^06[0-9]{6,8}$/;
var greske="";
		if(regName.test(name))
		{
			$("#hidName").css("display","none");	
		}
		else
		{
			$("#hidName").css("display","block");
			greske+="1";
		}
				if(regEmail.test(email))
		{
			$("#hidEmail").css("display","none");	
		}
		else
		{
			$("#hidEmail").css("display","block");
			greske+="2";
		}
				if(regTel.test(tel))
		{
			$("#hidTel").css("display","none");	
		}
		else
		{
			$("#hidTel").css("display","block");
			greske+="3";
		}
		if(greske!="")
		{
			alert("Plese fill field correct");
		}
		else
		{
			alert("Thenks for message");
			$("#name").val("");
			$("#email").val("");
			$("#subject").val("");
		}

	})
}
var url=window.location.href;
if(url.indexOf('product-details.html')!=-1)
{
	var bookDetails=getLocalStorage('bookdetails');
	//console.log(bookDetails);
	var ispis="";
	bookDetails.forEach(element => {
		ispis+=`
		<h1>${element.naslov}<span class="pull-right"><del>${element.staraCena} €</del>&nbsp;&nbsp;&nbsp;${element.novaCena} €</span></h1>
		<!-- start -->
		<div class="container-fluid" >
		<div class="row">
		<div class="col-md-5">
			<img src="${element.slika.src}" class="img-fluid" alt="${element.slika.alt}">
		</div>
		
		<div class="col-md-7">
		
			<p>Language:&nbsp;${element.language}&nbsp;&nbsp;&nbsp;&nbsp;</p>
			<p>Author:&nbsp;${obradaAutora(element.idAutor)}</p>
			<p>Genre:&nbsp;${obradaZanra(element.idKategorije)}</p>
			<p>Pages:&nbsp;${element.pages}</p>
			<p>Status:&nbsp;${obradaStanja(element.naStanju)}</p>
			<p>Delivery:&nbsp;${obradaDostave(element.freeDelivery)}</p>
			${obradaZvezda(element.zvezde)}
			<p>${element.description}</p>

			<div class="row" style="float:right;">


				<div class="col-sm-8">
					  <label class="control-label">Quantity</label>

					  <div class="row">
						<div class="col-sm-6">
							  <div class="form-group">
								<input type="text" name="name" id="quantity">
							  </div>
						</div>

						<div class="col-sm-6">
							  <input type="button" data-id="${element.id}" class="primary addtocart" value="Add to Cart">
							  
						</div>
						<div class="col-sm-6">
						<form action="products.html">
						<button class="primary">Books</button>
						</form>
						</div>
						<div class="col-sm-6">
						<form action="cart.html">
						<button class="primary">Cart</button>
						</form>
						</div>
					  </div>
				</div>
			</div>
		</div>
	</div>
	</div>
		`
		
	});
	//console.log(ispis);
	
	$("#details").html(ispis);
	$(".addtocart").click(addToCart);
}
//addtocart alert
$("#addtocart").on("click",function()
{
	alert("Books added to cart");
})
}
//featured books
function feturedBooks()
{
	ajaxZaSve("assets/data/books.json","get",function(books)
	{
		var ispis="";
		for(let i=1;i<=3;i++)
		{
			var item = books[Math.floor(Math.random() * books.length)];
			ispis+=`
			<article class="style${i}">
			<span class="image">
				<img src="${item.slika.src}" alt="${item.slika.alt}" />
			</span>
			<a onclick="prebaci(${item.id})" href="product-details.html">
	
			</a>
		</article>
			`
		}
		$("#featured").html(ispis);
	})
}
feturedBooks();
//obrada autora
function obradaAutora(id)
{
	var filtrirani;
	var books=getLocalStorage("books");
	var autor=getLocalStorage("authors");
	var ispis="";
	autor.forEach(element => {
		if(element.id==id)
		{
			ispis+= element.ime+" "+element.prezime;
		}
	});
	return ispis;
}
var url=window.location.href;
if(url.indexOf('testimonials.html')!=-1)
{


}
ajaxZaSve("assets/data/testimonials.json","get",function(result)
{ 
	setLocalStorage("testimonials",result);
	//console.log("dsdsfd");
	var ispis="";
	result.forEach(element => {
		ispis+=`
		<div class="col-sm-6 text-center">
		<p class="m-n"><em>${element.tekst}</em></p>

		<p><strong> - ${element.autor}</strong></p>
	</div>
		`
	});
	$("#pouke").append(ispis);
})
ajaxZaSve("assets/data/testimonials.json","get",function(testimonials)
{
	var ispis2="";
for(let i=1;i<=2;i++)
{
	var item = testimonials[Math.floor(Math.random() * testimonials.length)];
	ispis2+=`
	<div class="col-sm-6 text-center">
	<p class="m-n"><em>${item.tekst}</em></p>

	<p><strong> - ${item.autor}</strong></p>
	</div>
	`
}
$("#testimonials").html(ispis2);
})
var url=window.location.href;
if(url.indexOf('products.html')!=-1)
{
	function uzimanjeJezika()
{
	var niz=[];
	ajaxZaSve("assets/data/books.json","get",function(result)
	{


			result.forEach(element => {
				if(niz.includes(element.language))
				{
					
				}
				else
				{
					niz.push(element.language);
				}
	})
	//console.log(niz);
		niz.forEach(element => {
	$("#ddlLg").append(`<option value="${element}">${element}</option>`)
});
	setLocalStorage("language",niz);
})
}
uzimanjeJezika();
//console.log(languages);
var languages=getLocalStorage("language");
//console.log(languages);

	function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
	  }
	  
	  function filterFunction() {
		var naziv=$("#myInput").val();
		var ispis="";
		ajaxZaSve("assets/data/books.json","get",function(result)
		{ 
			
			  result.forEach(element => {
				  if(element.naslov.toLowerCase().includes(naziv.toLowerCase()))
				  {
					ispis+=`
					<a onclick="prebaci(${element.id})"  href="product-details.html"><img style="width:50px" src="${element.slika.src}" alt="${element.slika.alt}"/>${element.naslov}</a>
					
					`
					
				  }
				  if(naziv=='')
				  {
					  ispis='';
				  }

			  });
			  $("#list").html(ispis);
		})
		$(".listdt").click(prebaci);
	  }
	  if(getLocalStorage("cartProducts")!=null&&getLocalStorage("cartProducts").length>0)
	  {
		  var brProizvoda=getLocalStorage("cartProducts").length;
		  
		  $("#addNumberCart").html(brProizvoda);
		  //console.log("cccccccccccccccccccccc");
	  }
	  else
	  {
		  $("#addNumberCart").html(0);
		//console.log("dfdgdfgfdgfdsfsdgfdgfdgd");
	  }
	  //obrada filtera dogadjaj
	  $("#filteriBtn").on("click",function()
	  {
		  var keyword=$("#keyword").val();
		  var publisher=$("#publisher").val();
		  var title=$("#title").val();
		  var sort=$("#ddlS option:selected").val();
		  var author=parseInt($("#author option:selected").val());
		  var language=$("#ddlLg option:selected").val();
		  var books=getLocalStorage("books");
		  var filtrirani=books;
		if(keyword!="" && keyword!=null)
		{
			filtrirani=filtrirani.filter(x=>x.naslov.toLowerCase().includes(keyword.toLowerCase())||x.language.toLowerCase().includes(keyword.toLowerCase())||x.publicationDate.toLowerCase().includes(keyword.toLowerCase())||x.description.toLowerCase().includes(keyword.toLowerCase()))
		}
		//console.log(filtrirani);
		if(title!=""&&title!=null)
		{
			filtrirani=filtrirani.filter(x=>x.naslov.toLowerCase().includes(title.toLowerCase()));
		}	
		if(author!=""&&author!=null)
		{
			if(author=="0")
			{
				
			}
			if(author=="1")
			{
				filtrirani=filtrirani.filter(x=>x.idAutor==author);
				
			}
			if(author=="2")
			{
				filtrirani=filtrirani.filter(x=>x.idAutor==author);
				
			}
			if(author=="3")
			{
				filtrirani=filtrirani.filter(x=>x.idAutor==author);
				
			}
			if(author=="4")
			{
				filtrirani=filtrirani.filter(x=>x.idAutor==author);
				
			}
		}
		if(language!=""&&language!=null)
		{
			if(language=="English")
			{
				filtrirani=filtrirani.filter(x=>x.language==language);
			}
			else if(language=="Serbian")
			{
				filtrirani=filtrirani.filter(x=>x.language==language);
			}
			else if(language=="French")
			{
				filtrirani=filtrirani.filter(x=>x.language==language);
			}
			else
			{

			}

		}
		if(publisher!=""&&publisher!=null)
		{
			filtrirani=filtrirani.filter(x=>x.publicationDate.includes(publisher));
		}
		//do ove tacke radi
		if(sort!=""&&sort!=null)
		{ 
			var sort2=Number(sort);
			console.log(sort2)
			if(sort == "nazivAZ"){
				filtrirani.sort(function(a, b){
					if(a.naslov < b.naslov){
						return -1;
					}
					else if(a.naslov > b.naslov){
						return 1;
					}
					else{
						return 0;
					}
				})
			}
			if(sort == "nazivZA"){
				filtrirani.sort(function(a, b){
					if(a.naslov > b.naslov){
						return -1
					}
					else if(a.naslov < b.naslov){
						return 1;
					}
					else{
						return 0;
					}
				})
			}
			if(sort == "cenaGore"){
				filtrirani.sort(function(a, b){
					//console.log(a.parseInt(novaCena));
					return a.novaCena - b.novaCena;
				})
			}
		
			if(sort == "cenaDole"){
				filtrirani.sort(function(a, b){
					return b.novaCena - a.novaCena;
				})
			}
		}
		if(filtrirani.length==0)
		{
			$("#produc").html("<h1 style='margin :50px auto;'>Takav proizvod ne postoji</h1><button style='margin :50px auto;' onclick='vrati();' id='vrati'>Return books</button>")
		}
		else
		{
			//setLocalStorage("filtriraneKnjige",filtrirani);
			var ispis='';
			filtrirani.forEach(element => {
				//console.log(element.slika.src);
				ispis+=`
				<article class='details' data-id="${element.id}" class="style${element.id}">
				<span class="image">
					<img src="${element.slika.src}" alt="${element.slika.alt}" />
				</span>
				<a data-id="${element.id}" href="product-details.html" >
				
					
				</a>
				<br>
				<div id="opis" >
				<label><p>${obradaZvezda(element.zvezde)}</p></label>
				<label><p>Categories:&nbsp;${obradaZanra(element.idKategorije)}</p></label>
				<label><p>Language:&nbsp;${element.language}</p></label>
				<label><p>Pages:&nbsp;${element.pages}</p></label>
				<label><p>Date:&nbsp;${element.publicationDate}</p></label>
				<label><p>Status:&nbsp;${obradaStanja(element.naStanju)}</p></label>
				<label><p>Delivery:&nbsp;${obradaDostave(element.freeDelivery)}</p></label>
				<h1 style="font-size:20px;"></h1>
				<h1 style="color:#f2849e;"><mark style=" text-decoration: line-through; font-size:30px;">${element.staraCena}</mark> &nbsp;${element.novaCena}€</h1>
				</div>
			</article>
				`
			});
			$("#produc").html(ispis);
			$(".details").click(detail);
		}
		//console.log(publisher);
		//console.log(filtrirani);
		
	  })
}
//vrati id
$("#vrati").click(vrati());
function vrati()
{
		ajaxZaSve("assets/data/books.json","get",function(books)
	{
		var ispis="";
		books.forEach(element => {
			//console.log(element.slika.src);
			ispis+=`
			<article class='details' data-id="${element.id}" class="style${element.id}">
			<span class="image">
				<img src="${element.slika.src}" alt="${element.slika.alt}" />
			</span>
			<a data-id="${element.id}" href="product-details.html" >
			
				
			</a>
			<br>
			<div id="opis" >
			<label><p>${obradaZvezda(element.zvezde)}</p></label>
			<label><p>Categories:&nbsp;${obradaZanra(element.idKategorije)}</p></label>
			<label><p>Language:&nbsp;${element.language}</p></label>
			<label><p>Pages:&nbsp;${element.pages}</p></label>
			<label><p>Date:&nbsp;${element.publicationDate}</p></label>
			<label><p>Status:&nbsp;${obradaStanja(element.naStanju)}</p></label>
			<label><p>Delivery:&nbsp;${obradaDostave(element.freeDelivery)}</p></label>
			<h1 style="font-size:20px;"></h1>
			<h1 style="color:#f2849e;"><mark style=" text-decoration: line-through; font-size:30px;">${element.staraCena}</mark> &nbsp;${element.novaCena}€</h1>
			</div>
		</article>
			`
		});
		$("#produc").html(ispis);
	})
}
// dohvatanje autora
ajaxZaSve("assets/data/authors.json","get",function(result)
{ //console.log(result);
	setLocalStorage("authors",result);
});
function prebaci(id)
{ 
	//var id=$(this).data("id");
	console.log(id);
	var filtrirani;
	ajaxZaSve("assets/data/books.json","get",function(result)
	{
		filtrirani=result.filter(x=>x.id==id);
		setLocalStorage("bookdetails",filtrirani);
	})
	//setLocalStorage("details",id);
}
function ajaxZaSve(url, method, result){
    $.ajax({
        url:url,
        method: method,
        dataType: "json",
        success: result,
        error: function(xhr){console.log(xhr);}
    });
}
function setLocalStorage(name,data){
    localStorage.setItem(name, JSON.stringify(data));
  }
  function getLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
  }
  function obradaZanra(data)
{
	var kat=getLocalStorage('cat');
	//console.log(kat);
		var ispis="";

		kat.forEach(element2 => {
			data.forEach(element => {
				if(element==element2.id)
				{
					ispis+=" "+element2.naziv;
				}
			});
		});
		//vracanjeKat(ispis);
	return ispis;

}

function obradaZvezda(br)
{
	var ispis="";
	for(let i=1;i<br;i++)
	{
		ispis+=`<span class="material-icons">
		star_rate
		</span>`;
	}
	for(let i=br;i<=5;i++)
	{
		ispis+=`
		<span style="color:#f2849e;" class="material-icons">
		star_border
		</span>
		`;
	}
	return ispis;
}
function obradaDostave(dostava)
{
	if(dostava)
	{
		return 'Free delivery';
	}
	else
	{
		return 'Paid delivery'
	}
}
function obradaStanja(stanje)
{
	if(stanje)
	{
		return "In stock";
	}
	else
	{
		return "Out of stock"
	}
}
//dodavanje dogadjaja za detalje knjige
function detail() {
	//console.log("sdsdsd");
	var id=$(this).data('id');
	//console.log(id);
	localStorage.setItem("details", id);
	if (localStorage.getItem('details') !== null) 
{ 
	var idKnjige=localStorage.getItem('details');
	$.ajax({
		url:'assets/data/books.json',
		method:"get",
		dataType:'json',
		success:function(result)
		{	
	
			var knjigaDetalji=result.filter(x=>x.id==idKnjige);
			console.log(knjigaDetalji);
			setLocalStorage("bookdetails",knjigaDetalji);
		}
	});

}

}

/////////////////////////////////////////////////
var url=window.location.href;
if(url.indexOf('index.html')!=-1)
{
	//regularni izrazi

	$("#name").on("focus",function()
	{
		console.log("ccc")
		$("#hidName").css("display","none");
	})
	$("#email").on("focus",function()
	{
		console.log("ccc")
		$("#hidEmail").css("display","none");
	})
	$("#subject").on("focus",function()
	{
		console.log("ccc")
		$("#hidTel").css("display","none");
	})
	$(".primary1").on("click",function()
	{
		// var namee=$("#name").val();
var email=$("#email").val();
var tel=$("#subject").val();
var name=$("#name").val();
var regName=/^([A-ZČĆŽŠĐ][a-zčćžšđ]{1,20})+$/;
var regEmail=/^[^@]+@[^@]+\.[^@\.]+$/;
var regTel=/^06[0-9]{6,8}$/;
var greske="";
		if(regName.test(name))
		{
			$("#hidName").css("display","none");	
		}
		else
		{
			$("#hidName").css("display","block");
			greske+="1";
		}
				if(regEmail.test(email))
		{
			$("#hidEmail").css("display","none");	
		}
		else
		{
			$("#hidEmail").css("display","block");
			greske+="2";
		}
				if(regTel.test(tel))
		{
			$("#hidTel").css("display","none");	
		}
		else
		{
			$("#hidTel").css("display","block");
			greske+="3";
		}
		if(greske!="")
		{
			alert("Plese fill field correct");
		}
		else
		{
			alert("Thenks for message");
			$("#name").val("");
			$("#email").val("");
			$("#subject").val("");
			$("#message").val("");
		}

	})
}

//dodavanje u korpu
//$(".addtocart").click(addToCart);
function addToCart()
{
	var quantity=parseInt($("#quantity").val());
	//console.log(typeof quantity);
	var id=$(this).data("id");
	// console.log(quantity);
	//console.log(id);
	var cartProducts=getLocalStorage("cartProducts");
	var niz=[];
	if(cartProducts)
	{
		niz=cartProducts;
	}
	var data;
	var exist;
	// niz.push(data);
	//console.log(niz);
	
	if(quantity>0&&quantity<999)
	{
		if(cartProducts)
		{ 
			for(let i=0;i<cartProducts.length;i++)
			{
				
				if(cartProducts[i].id==id)
				{
					exist=true;
					var quantity1=cartProducts[i].quantity;
					
					cartProducts[i].quantity=quantity1+quantity;
					
					//console.log(quantity);
					//console.log("uso u isti")
					setLocalStorage("cartProducts",cartProducts);
					break;
				}
			}
			if(exist)
			{
	
			}
			else
			{
				//console.log("uso u drugi")
				data=
				{
					id:id,
					quantity:quantity
				}
				niz.push(data);
				setLocalStorage("cartProducts",niz);
			}	
		}
		else
		{ console.log("samo jednom uso")
			data=
			{
				id:id,
				quantity:quantity
			}
			niz.push(data);
			setLocalStorage("cartProducts",niz);
		}
		alert("Books added to cart");
	}
	else
	{
		alert("You must enter a number for the quantity value!")
	}

}
//tabela u korpi
var url=window.location.href;
if(url.indexOf('cart.html')!=-1)
{
	//console.log(getLocalStorage("cartProducts"));
	var productsCart=getLocalStorage("cartProducts");
	var books=getLocalStorage("books")
	var filtrirani=[];
	if(getLocalStorage("cartProducts")!=null)
	{
	if(getLocalStorage("cartProducts").length)
	{
			var ispis=`
	<tr>
	<th>Images</th>
	<th>Title</th>
	<th>Quantity</th>
	<th>Price</th>
	<th>Sum price</th>
	</tr>
	`;
	var ukupnaCena=0;
	books.forEach(element => {
		productsCart.forEach(element2 => {
			if(element.id==element2.id)
			{
				ukupnaCena+=element2.quantity*element.novaCena;
				filtrirani.push(element);
				ispis+=
				`
				<tr>
				<td><img class="imgSize" style="width:60%" src="${element.slika.src}" alt="${element.slika.alt}"/></td>
				<td>${element.naslov}</td>
				<td>${element2.quantity}</td>
				<td>${element.novaCena} € </td>
				<td>${element2.quantity*element.novaCena} € </td>
				<td><input type="button" class="removeFromCart"  data-id="${element2.id}" value="Remove"></td>
				</tr>
				`
			}
		});
		
	});
	ispis+=`
	<tr>
	<td style="text-align:right;" colspan="5">
	<h1 style="font-size:30px;">Total price-&nbsp;${ukupnaCena} € </h1>

	<td>
	<tr>
	`
	$("#cartPrint").html(ispis);
	$(".removeFromCart").click(removeFromCart);
	}
	else
	{
		$("#korpa").html("<h1>Cart is empty</h1><br><form action='products.html'><button style='margin:0px auto;'>Books</button></form>");
	}
	}
	else
	{
		$("#korpa").html("<h1>Cart is empty</h1><br><form action='products.html'><button style='margin:0px auto;'>Books</button></form>");
	}

	function removeFromCart()
	{
		var productsCart1;
		var id=$(this).data('id');
		//console.log(id);
		var cart=getLocalStorage("cartProducts");
		//console.log(cart);
		var filtrirani;
		productsCart1=cart.filter(x=>x.id!=id);
		//console.log(productsCart1);
		setLocalStorage("cartProducts",productsCart1);
		var productsCart=getLocalStorage("cartProducts");
		//console.log(productsCart);
		var books=getLocalStorage("books")
		var filtrirani=[];
		var ispis=`
		<tr>
		<th>Images</th>
		<th>Title</th>
		<th>Quantity</th>
		<th>Price</th>
		<th>Sum price</th>
		</tr>
		`;
		var ukupnaCena=0;
		books.forEach(element => {
			productsCart.forEach(element2 => {
				if(element.id==element2.id)
				{
					//console.log("Uso");
					ukupnaCena+=element2.quantity*element.novaCena;
					filtrirani.push(element);
					ispis+=
					`
					<tr>
					<td><img style="width:15%" src="${element.slika.src}" alt="${element.slika.alt}"/></td>
					<td>${element.naslov}</td>
					<td>${element2.quantity}</td>
					<td>${element.novaCena} € </td>
					<td>${element2.quantity*element.novaCena} € </td>
					<td><button class="removeFromCart" data-id="${element2.id}">Remove</button>
					</tr>
					`
				}
			});
			
		});
		ispis+=`
		<tr>
		<td style="text-align:right;" colspan="5">
		<h1 style="font-size:30px;">Total price-&nbsp;${ukupnaCena} € </h1>
	
		<td>
		<tr>
		`
		$("#cartPrint").html(ispis);
		$(".removeFromCart").click(removeFromCart);
		if(getLocalStorage("cartProducts").length)
		{
			
		}
		else
		{
			$("#korpa").html("<h1>Cart is empty</h1><br><form action='products.html'><button style='margin:0px auto;float:right'>Books</button></form>");
		}
	}

	ajaxZaSve("assets/data/country.json","get",function(result)
	{
		var ispis="";
		result.forEach(element => {
			ispis+=
			`
			<option value="${element.id}">${element.name}</option>
			`
		});
		$("#country").html(ispis);
	})
	ajaxZaSve("assets/data/title.json","get",function(result)
	{
		var ispis="";
		result.forEach(element => {
			ispis+=
			`
			<option value="${element.id}">${element.name}</option>
			`
		});
		$("#selTitle").html(ispis);
	})
	ajaxZaSve("assets/data/paymentMetod.json","get",function(result)
	{
		var ispis="";
		result.forEach(element => {
			ispis+=
			`
			<option value="${element.id}">${element.name}</option>
			`
		});
		$("#Payment").html(ispis);
	})
	//obrada forme
	$("#finish").on("click",function()
	{
		var title=$("#selTitle option:selected").val();
		var name=$("#field-2").val();
		var email=$("#field-3").val();
		var phone=$("#field-4").val();
		var address1=$("#field-5").val();
		var address2=$("#field-6").val();
		var city=$("#field-7").val();
		var state=$("#field-8").val();
		var zip=$("#field-9").val();
		var country=$("#country option:selected").val();
		var payment=$("#Payment option:selected").val();
		var notes=$("#field-10").val();
		var check=$("#checkbox-4:checked").val();
		var greske=[];
		var regName=/^([A-ZČĆŽŠĐ][a-zčćžšđ]{1,20})+$/;
		var regEmail=/^[^@]+@[^@]+\.[^@\.]+$/;
		var regTel=/^06[0-9]{6,8}$/;
		var regAddress=/^([A-ZŠĐŽĆČ0-9][a-zšđžćč0-9\s]{2,30})+$/;
		var regCity=/^([A-ZŠĐŽĆČ][a-zšđžćč]{2,30})+$/;
		var regCountry=/^([A-ZŠĐŽĆČ][a-zšđžćč]{3,30})+$/
		console.log(zip);
		if(getLocalStorage("cartProducts")==null)
		{
			alert("Your cart is empty");
		}
		else
		{
			if(getLocalStorage("cartProducts").length==0)
		{
			alert("Your cart is empty");
		}
		else
		{
		if(title=="1")
		{
			greske.push("You must select a title");
			$("#hide1").css("display","block");
		}
		if(!regName.test(name))
		{
			greske.push("Error writing name (Example:Stefan)");
			$("#hide2").css("display","block");
		}
		if(!regEmail.test(email))
		{
			greske.push("Error writing email (Example:stefan@gmail.com)");
			$("#hide3").css("display","block");
		}
		// if(!regEmail.test(email))
		// {
		// 	greske.push("Error writing email (Example:stefan@gmail.com)");
		// 	$("#hide4").css("display","block");
		// }

		if(!regTel.test(phone))
		{
			greske.push("Error writing phone (Example:0695151972)");
			$("#hide4").css("display","block");
		}
		if(!regAddress.test(address1))
		{
			greske.push("Error writing address first (Example:Podgorska 26)");
			$("#hide5").css("display","block");
		}
		if(!regAddress.test(address2))
		{
			greske.push("Error writing address second (Example:Podgorska 26)");
			$("#hide6").css("display","block");
		}
		if(!regCity.test(city))
		{
			greske.push("Error writing city (Example:Valjevo)");
			$("#hide7").css("display","block");
		}
		if(!regCountry.test(state))
		{
			greske.push("Error writing state (Example:Minesota)");
			$("#hide8").css("display","block");
		}
		if(country=="0")
		{
			greske.push("Error writing country (Example:Serbia)");
			$("#hide10").css("display","block");
		}
		if(!zip)
		{
			$("#hide9").css("display","block");
		}
		if(zip<10000&&zip>99999&&zip==0&&zip=="")
		{
			greske.push("Error writing zip code (Example:14253)");
			$("#hide9").css("display","block");
		}
		if(payment=="0")
		{
			greske.push("You must select a payment");
			$("#hide11").css("display","block");
		}
		if(check=="on")
		{
			
		}
		else
		{
			greske.push("You must check the consent");
			$("#hide12").css("display","block");
		}
		if(greske.length>0)
		{
			// var ispis="";
			// greske.forEach(element => {
			// 	ispis+=`
			// 	<p>${element}</p>
			// 	`
			// });
			// $("#wrongs").html(ispis);
		}
		else
		{
			alert("Thank you for shopping");
			$("#selTitle").val("0");
			$("#field-2").val("");
			$("#field-3").val("");
			$("#field-4").val("");
			$("#field-5").val("");
			$("#field-6").val("");
			$("#field-7").val("");
			$("#field-8").val("");
			$("#field-9").val("");
			$("#country").val("0");
			$("#Payment").val("0");
			$("#field-10").val("");
			$("#checkbox-4").prop("checked", false);
			$("#korpa").html("<h1>Cart is empty</h1><br><form action='products.html'><button style='margin:0px auto;'>Books</button></form>");
			var niz=[];
			setLocalStorage('cartProducts',niz);
		}
		}
		}
		
	})

	$("#selTitle").on("change",function()
	{
		console.log("ccc")
		$("#hide1").css("display","none");
	})
	$("#field-2").on("focus",function()
	{
		console.log("ccc")
		$("#hide2").css("display","none");
	})
	$("#field-3").on("focus",function()
	{
		$("#hide3").css("display","none");
	})
	$("#field-4").on("focus",function()
	{
		$("#hide4").css("display","none");
	})
	$("#field-5").on("focus",function()
	{
		$("#hide5").css("display","none");
	})
	$("#field-6").on("focus",function()
	{
		$("#hide6").css("display","none");
	})
	$("#field-7").on("focus",function()
	{
		$("#hide7").css("display","none");
	})		
	$("#field-8").on("focus",function()
	{
		$("#hide8").css("display","none");
	})
	$("#field-9").on("focus",function()
	{
		$("#hide9").css("display","none");
	})
	$("#country").on("change",function()
	{
		$("#hide10").css("display","none");
	})
	$("#Payment").on("change",function()
	{
		$("#hide11").css("display","none");
	})
	$("#checkbox-4").on("click",function()
	{
		$("#hide12").css("display","none");
	})
}
