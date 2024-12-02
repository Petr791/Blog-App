const posts = [];

const TITLE_VALIDATION_LIMIT = 15;
const TEXT_VALIDATION_LIMIT = 30;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postNode = document.querySelector('.js-posts');
const validationMessage = document.querySelector('.js-validation-message');


newPostBtnNode.disabled = true;

newPostBtnNode.addEventListener('click', function () {

	if (checkInputField()) {
		return;
	} else {
		const postFromUser = getPostFromUser();
		addPost(postFromUser);
		renderPosts();

		postTitleInputNode.value = '';
		postTextInputNode.value = '';
		newPostBtnNode.disabled = true;
		return;
	}
});

postTitleInputNode.addEventListener('input', validationPostTitle);
postTextInputNode.addEventListener('input', validationPostText);

function checkInputField() {

	if (postTitleInputNode.value.trim() === '') {
		validationMessage.innerText = `Поле заголовка не должно быть пустым!`;
		validationMessage.classList.remove('validation-message--green', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--red');
		validationMessage.classList.remove('validation-message__hidden');
		return true;
	}

	if (postTextInputNode.value.trim() === '') {
		validationMessage.innerText = `Поле поста не должно быть пустым!`;
		validationMessage.classList.remove('validation-message--green', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--red');
		validationMessage.classList.remove('validation-message__hidden');
		return true;
	}

	validationMessage.classList.add('validation-message__hidden');
	return false;
}

function validationPostTitle() {

	const titleLength = postTitleInputNode.value.length;
	const textLength = postTextInputNode.value.length;
	let numberOfCharactersTitle = TITLE_VALIDATION_LIMIT - titleLength;

	if (titleLength <= TITLE_VALIDATION_LIMIT && titleLength <= (TITLE_VALIDATION_LIMIT - 4)) {

		validationMessage.innerText = `Осталось символов для ввода: ${numberOfCharactersTitle}`;
		validationMessage.classList.remove('validation-message--red', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--green');
	} else if (titleLength > (TITLE_VALIDATION_LIMIT - 4) && titleLength <= TITLE_VALIDATION_LIMIT) {

		validationMessage.innerText = `Осталось символов для ввода: ${numberOfCharactersTitle}`;
		validationMessage.classList.remove('validation-message--red', 'validation-message--green');
		validationMessage.classList.add('validation-message--yellow');
	} else if (titleLength > TITLE_VALIDATION_LIMIT) {

		validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
		validationMessage.classList.remove('validation-message--green', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--red');

		if (titleLength > TITLE_VALIDATION_LIMIT || textLength > TEXT_VALIDATION_LIMIT) {
			newPostBtnNode.disabled = true;
		}
	} else {
		//console.log(4);
	}

	if ((titleLength <= TITLE_VALIDATION_LIMIT && textLength <= TEXT_VALIDATION_LIMIT)) {
		newPostBtnNode.disabled = false;
	}

	if ((titleLength < 1 && textLength < 1)) {
		validationMessage.innerText = ``;
		newPostBtnNode.disabled = true;
	}

	// событие 'change'
	postTitleInputNode.addEventListener('change', function (event) {
		validationMessage.innerText = ``;
	});
}

function validationPostText() {

	const titleLength = postTitleInputNode.value.length;
	const textLength = postTextInputNode.value.length;
	let numberOfCharactersText = TEXT_VALIDATION_LIMIT - textLength;

	if (textLength <= TEXT_VALIDATION_LIMIT && textLength <= (TEXT_VALIDATION_LIMIT - 4)) {

		validationMessage.innerText = `Осталось символов для ввода: ${numberOfCharactersText}`;
		validationMessage.classList.remove('validation-message--red', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--green');
	} else if (textLength > (TEXT_VALIDATION_LIMIT - 4) && textLength <= TEXT_VALIDATION_LIMIT) {

		validationMessage.innerText = `Осталось символов для ввода: ${numberOfCharactersText}`;
		validationMessage.classList.remove('validation-message--red', 'validation-message--green');
		validationMessage.classList.add('validation-message--yellow');
	} else if (textLength > TEXT_VALIDATION_LIMIT) {

		validationMessage.innerText = `Длина поста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
		validationMessage.classList.remove('validation-message--green', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--red');

		if (titleLength > TITLE_VALIDATION_LIMIT || textLength > TEXT_VALIDATION_LIMIT) {
			newPostBtnNode.disabled = true;
		}
	} else {
		//console.log(4);
	}

	if ((titleLength <= TITLE_VALIDATION_LIMIT && textLength <= TEXT_VALIDATION_LIMIT)) {
		newPostBtnNode.disabled = false;
	}

	if ((titleLength < 1 && textLength < 1)) {
		validationMessage.innerText = ``;
		newPostBtnNode.disabled = true;
	}

	// событие 'change'
	postTextInputNode.addEventListener('change', function (event) {
		validationMessage.innerText = ``;
	});


}

function getPostFromUser() {
	const title = postTitleInputNode.value;
	const text = postTextInputNode.value;
	const time = getDatePost();
	return {
		time: time,
		title: title,
		text: text
	};
}

function addPost({
	time,
	title,
	text
}) {
	posts.push({
		currentDatePost: new Date(),
		datePost: time.datePost,
		title: title,
		text: text
	});
}

function formatDate(date) {

	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yyyy = date.getFullYear();

	let hh = date.getHours();
	if (hh < 10) hh = '0' + hh;

	let mt = date.getMinutes();
	if (mt < 10) mt = '0' + mt;

	return `${dd}.${mm}.${yyyy} ${hh}:${mt}`;
}

function getDatePost() {
	const currentDate = new Date();
	const datePost = formatDate(currentDate);
	return {
		datePost: datePost,
	};
}

function getTimeHasPassed(exit) {

	let passedTime = ``;

	const arrSeconds = ['секунду', 'секунды', 'секунд'];
	const arrMinutes = ['минуту', 'минуты', 'минут'];
	const arrHours = ['час', 'часа', 'часов'];
	const arrDays = ['день', 'дня', 'дней'];

	const seconds = Math.floor((exit / 1000));
	const minutes = Math.floor((exit / (1000 * 60)) % 60);
	const hours = Math.floor((exit / (1000 * 60 * 60)) % 24);
	const days = Math.floor((exit / (1000 * 60 * 60 * 24)) % 30);

	function numstr(n, text_forms) {
		var m = Math.abs(n) % 100;
		var n1 = m % 10;
		if (m > 10 && m < 20) {
			return text_forms[2];
		}
		if (n1 > 1 && n1 < 5) {
			return text_forms[1];
		}
		if (n1 == 1) {
			return text_forms[0];
		}
		return text_forms[2];
	}

	//
	if (seconds < 60) {
		passedTime = `опубликовано ${seconds} ${numstr(seconds, arrSeconds)} назад`;
	} else if (seconds >= 60 && seconds < 3600) {
		passedTime = `опубликовано ${minutes} ${numstr(minutes, arrMinutes)} назад`;
	} else if (seconds >= 3600 && seconds < 86400) {
		passedTime = `опубликовано ${hours} ${numstr(hours, arrHours)} назад`;
	} else if (seconds >= 86400 && seconds < 31104000) {
		passedTime = `опубликовано ${days} ${numstr(days, arrDays)} назад`;
	} else if (seconds < 31104000) {
		passedTime = `опубликовано давно`;
	} else {
		passedTime = ``;
	}
	return passedTime;
}


function getPosts() {
	return posts;
}

function renderPosts() {

	const currentDate = new Date();
	const posts = getPosts();
	let postsHTML = '';

	posts.forEach(post => {
		let timeDifference = currentDate - post.currentDatePost;
		let passedTime = getTimeHasPassed(timeDifference);

		postsHTML += `
		<div class='post'>
			<p class='post__date'>${post.datePost}</p>
			<p class='post__time-passed'>(${passedTime})</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.text}</p>
		</div>
	`;
	});

	postNode.innerHTML = postsHTML;
}


//////////////////////////////////////////////////////////////


/*Вариант 2.
Используется jQuery
*/

/* 
$(document).ready(function () {

	console.log('Готово!');
	var postsTwo = [];

	$('.js-new-post-btn').prop('disabled', true);

	$('.js-new-post-btn').on('click', function () {
		if (checkInputFieldTwo()) {
			return;
		} else {
			const postFromUserTwo = getPostFromUserTwo();
			addPostTwo(postFromUserTwo);
			renderPostsTwo();
			$('.js-post-title-input').val('');
			$('.js-post-text-input').val('');

			$('.js-new-post-btn').prop('disabled', true);
			return;
		}
	});

	$('.js-post-title-input').on('input', handleClickOne);
	$('.js-post-text-input').on('input', handleClickTwo);


	function handleClickOne() {

		var titleLength = $('.js-post-title-input').val().length;
		//var textLength = $('.js-post-text-input').val().length;
		var numberOfCharactersTitle = TITLE_VALIDATION_LIMIT - titleLength;

		if ($('.js-post-title-input').val().length <= TITLE_VALIDATION_LIMIT && $('.js-post-title-input').val().length <= (TITLE_VALIDATION_LIMIT - 4)) {

			$('.js-validation-message').text(`Осталось символов для ввода: ${numberOfCharactersTitle}`);
			$('.js-validation-message').removeClass('validation-message--red validation-message--yellow');
			$('.js-validation-message').addClass('validation-message--green');
		} else if ($('.js-post-title-input').val().length > (TITLE_VALIDATION_LIMIT - 4) && $('.js-post-title-input').val().length <= TITLE_VALIDATION_LIMIT) {

			$('.js-validation-message').text(`Осталось символов для ввода: ${numberOfCharactersTitle}`);
			$('.js-validation-message').removeClass('validation-message--red validation-message--green');
			$('.js-validation-message').addClass('validation-message--yellow');
		} else if ($('.js-post-title-input').val().length > TITLE_VALIDATION_LIMIT) {
			$('.js-validation-message').text(`Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`);
			$('.js-validation-message').removeClass('validation-message--yellow validation-message--green');
			$('.js-validation-message').addClass('validation-message--red');

			if ($('.js-post-title-input').val().length > TITLE_VALIDATION_LIMIT || $('.js-post-text-input').val().length > TEXT_VALIDATION_LIMIT) {
				$('.js-new-post-btn').prop('disabled', true);
			}
		} else {
			//console.log(4);
		}

		if (($('.js-post-title-input').val().length <= TITLE_VALIDATION_LIMIT && $('.js-post-text-input').val().length <= TEXT_VALIDATION_LIMIT)) {
			$('.js-new-post-btn').prop('disabled', false);
		}

		if (($('.js-post-title-input').val().length < 1 && $('.js-post-text-input').val().length < 1)) {
			$('.js-validation-message').text(``);
			$('.js-new-post-btn').prop('disabled', true);
		}

		// событие 'change'
		$('.js-post-title-input').on('change', function () {
			validationMessage.innerText = ``;
		});
	}


	function handleClickTwo() {

		//var titleLength = $('.js-post-title-input').val().length;
		var textLength = $('.js-post-text-input').val().length;
		var numberOfCharactersText = TEXT_VALIDATION_LIMIT - textLength;

		if ($('.js-post-text-input').val().length <= TEXT_VALIDATION_LIMIT && $('.js-post-text-input').val().length <= (TEXT_VALIDATION_LIMIT - 4)) {

			$('.js-validation-message').text(`Осталось символов для ввода: ${numberOfCharactersText}`);
			$('.js-validation-message').removeClass('validation-message--red validation-message--yellow');
			$('.js-validation-message').addClass('validation-message--green');
		} else if ($('.js-post-text-input').val().length > (TEXT_VALIDATION_LIMIT - 4) && $('.js-post-text-input').val().length <= TEXT_VALIDATION_LIMIT) {

			$('.js-validation-message').text(`Осталось символов для ввода: ${numberOfCharactersText}`);
			$('.js-validation-message').removeClass('validation-message--red validation-message--green');
			$('.js-validation-message').addClass('validation-message--yellow');
		} else if ($('.js-post-text-input').val().length > TEXT_VALIDATION_LIMIT) {

			$('.js-validation-message').text(`Длина поста не должна превышать ${TITLE_VALIDATION_LIMIT} символов`);
			$('.js-validation-message').removeClass('validation-message--yellow validation-message--green');
			$('.js-validation-message').addClass('validation-message--red');

			if ($('.js-post-title-input').val().length > TITLE_VALIDATION_LIMIT || $('.js-post-text-input').val().length > TEXT_VALIDATION_LIMIT) {
				$('.js-new-post-btn').prop('disabled', true);
			}
		} else {
			//console.log(4);
		}


		if (($('.js-post-title-input').val().length <= TITLE_VALIDATION_LIMIT && $('.js-post-text-input').val().length <= TEXT_VALIDATION_LIMIT)) {
			$('.js-new-post-btn').prop('disabled', false);
		}
		if (($('.js-post-title-input').val().length < 1 && $('.js-post-text-input').val().length < 1)) {
			$('.js-validation-message').text(``);
			$('.js-new-post-btn').prop('disabled', true);
		}

		// событие 'change'
		$('.js-post-text-input').on('change', function () {
			validationMessage.innerText = ``;
		});
	}


	function checkInputFieldTwo() {

		if ($('.js-post-title-input').val().trim() === '') {
			$('.js-validation-message').text(`Поле заголовка не должно быть пустым!`);
			$('.js-validation-message').removeClass('validation-message--green validation-message--yellow');
			$('.js-validation-message').addClass('validation-message--red');
			$('.js-validation-message').removeClass('validation-message__hidden');
			return true;
		}

		if ($('.js-post-text-input').val().trim() === '') {
			$('.js-validation-message').text(`Поле поста не должно быть пустым!`);
			$('.js-validation-message').removeClass('validation-message--green validation-message--yellow');
			$('.js-validation-message').addClass('validation-message--red');
			$('.js-validation-message').removeClass('validation-message__hidden');
			return true;
		}

		$('.js-validation-message').addClass('validation-message__hidden');
		return false;
	}

	function getPostFromUserTwo() {
		var title = $('.js-post-title-input').val();
		var text = $('.js-post-title-input').val();
		var time = getDatePostTwo();
		//console.log(title);
		return {
			time: time,
			title: title,
			text: text
		};
	}

	function formatDateTwo(date) {

		var ddd = date.getDate();
		if (ddd < 10) ddd = '0' + ddd;

		var mmm = date.getMonth() + 1;
		if (mmm < 10) mmm = '0' + mmm;

		var yyyyy = date.getFullYear();

		var hhh = date.getHours();
		if (hhh < 10) hhh = '0' + hhh;

		var mtt = date.getMinutes();
		if (mtt < 10) mtt = '0' + mtt;

		return `${ddd}.${mmm}.${yyyyy} ${hhh}:${mtt}`;
	}

	function getDatePostTwo() {
		var currentDateTwo = new Date();
		var datePostTwo = formatDateTwo(currentDateTwo);
		return {
			datePost: datePostTwo,
		};
	}


	function getTimeHasPassedTwo(exit) {

		var passedTimeTwo = ``;

		var arrSeconds = ['секунду', 'секунды', 'секунд'];
		var arrMinutes = ['минуту', 'минуты', 'минут'];
		var arrHours = ['час', 'часа', 'часов'];
		var arrDays = ['день', 'дня', 'дней'];

		var seconds = Math.floor((exit / 1000));
		var minutes = Math.floor((exit / (1000 * 60)) % 60);
		var hours = Math.floor((exit / (1000 * 60 * 60)) % 24);
		var days = Math.floor((exit / (1000 * 60 * 60 * 24)) % 30);

		function numstr(n, text_forms) {
			var m = Math.abs(n) % 100;
			var n1 = m % 10;
			if (m > 10 && m < 20) {
				return text_forms[2];
			}
			if (n1 > 1 && n1 < 5) {
				return text_forms[1];
			}
			if (n1 == 1) {
				return text_forms[0];
			}
			return text_forms[2];
		}

		//
		if (seconds < 60) {
			passedTimeTwo = `опубликовано ${seconds} ${numstr(seconds, arrSeconds)} назад`;
		} else if (seconds >= 60 && seconds < 3600) {
			passedTimeTwo = `опубликовано ${minutes} ${numstr(minutes, arrMinutes)} назад`;
		} else if (seconds >= 3600 && seconds < 86400) {
			passedTimeTwo = `опубликовано ${hours} ${numstr(hours, arrHours)} назад`;
		} else if (seconds >= 86400 && seconds < 31104000) {
			passedTimeTwo = `опубликовано ${days} ${numstr(days, arrDays)} назад`;
		} else if (seconds < 31104000) {
			passedTimeTwo = `опубликовано давно`;
		} else {
			passedTimeTwo = ``;
		}

		return passedTimeTwo;
	}

	function addPostTwo({
		time,
		title,
		text
	}) {
		postsTwo.push({
			currentDatePost: new Date(),
			datePost: time.datePost,
			title: title,
			text: text
		});
	}

	function getPostsTwo() {
		return postsTwo;
	}

	function renderPostsTwo() {

		var currentDateTwo = new Date();
		var postsTwo = getPostsTwo();
		var postsHTMLTwo = '';

		postsTwo.forEach(post => {
			var timeDifferenceTwo = currentDateTwo - post.currentDatePost;
			var passedTimeTwo = getTimeHasPassedTwo(timeDifferenceTwo);
			//console.log(passedTime);
			postsHTMLTwo += `
		<div class='post'>
			<p class='post__date'>${post.datePost}</p>
			<p class='post__time-passed'>(${passedTimeTwo})</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.text}</p>
		</div>
	`;

		});
		$('.js-posts').html(postsHTMLTwo);
	}

}); */