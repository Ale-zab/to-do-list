$(function() {
	var valueNameToDo = $(".task-name"),
		valueDescriptionToDo = $(".task-description"),
		containerLeft = $(".container-left"),
		toDoListBlockContent = $(".toDoList-block-content"),
		emptyToDoListBlock = $(".empty-toDoList-block");

	// функция добавления нового task.
	$('.task-button').on("click" , function() {

		if(!valueNameToDo.val() || !valueDescriptionToDo.val()) { //проверка заполнения полей
			return false;
		} else {
			containerLeft.append("<div class='toDoList-block'>" +
									"<div class='toDoList-block-top'>" +
										"<h3 class='toDoList-block-name'>" + valueNameToDo.val() + "</h3>" +
										"<div class='toDoList-block-right'>" +
											"<input type='submit' class='hide' value=''>" +
											"<input type='submit' class='clear' value=''>" +							
										"</div>" +
									"</div>" +
									"<div class='toDoList-block-content'>" +
										"<p class='toDoList-block-required'>" + valueDescriptionToDo.val() + "</p>" +
									"</div>" +
								"</div>");
			// e.preventDefault();
			valueNameToDo.val(""); // обнуление поля "название" при добавлении нового таска.
			valueDescriptionToDo.val(""); // обнуление поля "описание" при добавлении нового таска.
			countArrayTask(); //вызов функции подчсета количества task, и выведении соббщения "список пуст"

		}
	});

	// при нажатии на крестик, функция удалит task.
	$('html').on("click" , ".clear" , function() {
		$(this).parents(".toDoList-block").remove();
		countArrayTask(); //вызов функции подчсета количества task, и выведении соббщения "список пуст"	
	});

	// при нажатии на стрелку, функция скроет описание к task, оставив только название.
	$('html').on("click" , ".hide" , function() {
		$(this).parents(".toDoList-block").find(".toDoList-block-content").slideToggle(500);
		$(this).toggleClass('rotateHide');
	});

	// данная функция подсчитывает количество task, при количестве равное нулю, выводит сообщение "Список пуст", 
	//при большем значении убирает его. 
	var countArrayTask = function() {
		(!containerLeft.children().length) ? emptyToDoListBlock.fadeIn("fast") : emptyToDoListBlock.css("display", "none"); 
	};
});

