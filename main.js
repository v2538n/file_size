(function($){
	$(document).ready(function(){

		let file_error = $('<span class="file-error"></span>');
		$('.form-managed-file').append(file_error);

		let extensions = [
			'gif','jpg','png','bmp','tif','txt','rtf','pdf','doc','docx','ppt','pptx','bz2','gz','jar','rar','tar'
		];

		let form_error = [];

		$('#test_form #upload_file').on('change', function(event){

			let cur_form = $(this).closest('form');
			let extension = this.files[0].name.split(".").splice(-1,1)[0];
			let find_ext  = false;


		// Проверка расширения файла

			for(let i = 0; i < extensions.length; i++) {
				if(extensions[i] == extension){
					find_ext = true;
				}
			} 

			if(find_ext === false) {

				form_error[0] = true;

				cur_form.find('.submit-form').on('click', function(e){
					e.preventDefault();
				});
			} else {

				form_error[0] = false;
			}
		
		// Проверка размера файла
			
			if(this.files[0].size > 2097152){

				form_error[1] = true;
				
				cur_form.find('.file-error').html('Максимальный размер файла: 2 Мб. <br/> Допустимы файлы следующих форматов: gif, jpg, png, bmp, tif, txt, rtf, pdf, doc, docx, ppt, pptx, bz2, gz, jar, rar, tar');
				cur_form.find('.file-error').addClass('show-error');
				cur_form.find('.submit-form').on('click', function(e){
					e.preventDefault();
				});	

			} else {

				form_error[1] = false;
				let file_size = this.files[0].size / 1024;
			}



			if(form_error[0] === false && form_error[1] === false){
				console.log('Форму можно отправлять');
				cur_form.find('.file-error').removeClass('show-error');
				cur_form.find('.submit-form').unbind('click')
			} else {
				cur_form.find('.file-error').addClass('show-error');
			}

		});
	});
})(jQuery);