function convert() {
	var converter = new Showdown.converter();
	
	// create an element to place our HTML into
	var target = $("<div>");
	$("body").prepend(target);

	var text = $("textarea").val();

	text = text.replace(/\[(\d{4}.*?)\]/g, "<div class=\"year\">$1</div>");
	text = converter.makeHtml(text);

	target.html(text);

	target.append($("<div>", {class: "instructions", text: "Click anywhere to return to the editor. Click print to create a copy of this CV."}))

	// move any images into a div which will be displayed on the first page
	$("img").parent().addClass("image");

	// split into pages based on horizontal rules
	target.prepend($("<hr>")); // will force a new page
	target.children().each(function() {
		var child = $(this);

		if(child.is("hr")) {
			child.remove();
			target.append(
				$("<div>", {class: "page"}).append(
					$("<div>", {class: "page-content"})

				)
			);

		} else {
			$(".page-content").last().append(child);
		}
	});

	$("ul", target).addClass("accolade");

	var address = $("ul", target).first();
	address.addClass("address").removeClass("accolade");
	$("ul", address).removeClass("accolade");


	target.click(function() {
		target.remove();
		$("textarea, input").show();
	});
}

$(function() {

	var editor = $("<textarea>").val($("body").html());
	$("body").html("");
	$("body").append(
		editor, 
		$("<input>", {type: "button", value: "Click to preview"}).click(function() {
			$("textarea, input").hide();
			convert();
		})
	);
	$("input").click();

});
