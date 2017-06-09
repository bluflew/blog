function Post() {
	function bindEvent() {
		$(".post_edit").click(function(e) {
			var params = {
				id: $(".id").val().trim(),
				title: $(".title").val().trim(),
				content: tinymce.get("content").getContent().trim(),
				author: $(".author").val().trim()
			}

			var base_url = location.protocol + "//" + document.domain + ":" + location.port;

			$.ajax({
				url: base_url + '/admin/post/edit',
				type: 'PUT',
				dataType: 'json',
				data: {params: params},
				success: function(res) {
					if (res && res.status_code == 200) {
						location.reload();
					}
				}
			})
			.done(function(res) {
				if (res && res.status_code == 200) {
					location.reload();
				}
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		});

		$(".post_delete").click(function() {
			var post_id = $(this).attr("post_id");

			var base_url = location.protocol + "//" + document.domain + ":" + location.port;

			$.ajax({
				url: base_url + '/admin/post/delete',
				type: 'DELETE',
				dataType: 'json',
				data: {id: post_id},
				success: function(res) {
					if (res && res.status_code == 200) {
						location.reload();
					}
				}
			});
		});
	}

	bindEvent();
}

jQuery(document).ready(function($) {
	new Post();
});