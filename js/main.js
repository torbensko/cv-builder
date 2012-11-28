$(function() {
	var converter = new Showdown.converter();
	var text = $("body").html();

	text = text.replace(/\[(\d{4}.*?)\]/g, "<div class=\"year\">$1</div>");
	text = converter.makeHtml(text);
	$("body").html(text);

	// move any images into a div which will be displayed on the first page
	$("img").parent().addClass("image");

	// split into pages based on horizontal rules
	$("body").prepend($("<hr>")); // will force a new page
	$("body").children().each(function() {
		var child = $(this);

		if(child.is("hr")) {
			child.remove();
			$("body").append(
				$("<div>", {class: "page"}).append(
					$("<div>", {class: "page-content"})

				)
			);

		} else {
			$(".page-content").last().append(child);
		}
	});

	$("body ul").addClass("accolade");
	var address = $("body ul").first();
	address.addClass("address").removeClass("accolade");
	$("ul", address).removeClass("accolade");
});
