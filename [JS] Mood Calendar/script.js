const currentYear = 2021;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'Octomber',
	'November',
	'December'
];
const colors = ['green', 'yellowGreen', 'gold', 'orange', 'red',];
const defaultColor = '#888';
let activeColor = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const randomize = document.querySelector('#randomize');
const clear = document.querySelector('#clear');

// Получение цвета при нажатии на смайлик
moods.forEach(mood => {
	mood.addEventListener('click', () => {
		if (mood.classList.contains('selected')) {
			mood.classList.remove('selected');
			activeColor = defaultColor;
		} else {
			moods.forEach(mood => {
				mood.classList.remove('selected');
			});
			mood.classList.add('selected');
			activeColor = getComputedStyle(mood).getPropertyValue('color');
		}
	});
});

const getAllDays = year => {
	// Первый день года - 1st January
	const firstDay = new Date(`January 1 ${year}`);
	// Последний день года - 31th December - используется для остановки добавления дней в массив
	const lastDay = new Date(`December 31 ${year}`);

	// Добавляется первый день
	const days = [firstDay];

	// Используется для отслеживания дня
	let lastDayInArray = firstDay;

	// Loop while есть новые дни, которые будут добавлены в текущем году
	while (lastDayInArray.getTime() !== lastDay.getTime()) {
		days.push(addDays(lastDayInArray, 1));
		lastDayInArray = days[days.length - 1];
	}
	return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

// Loop по месяцам и создание div для каждого месяца
months.forEach((month, idx) => {
	monthsHTML += `
  <div class="months month_${idx}">
      <h3>${month}</h3>
      <div class="week_days_container">
        ${weekDays
          .map(day => `<div class="week_days">${day}</div>`)
				  .join('')
         }
      </div>
    <div class="days_container"></div>
  </div>`;
});

calendar.innerHTML = monthsHTML;

// Loop по каждому дню и
dates.forEach(date => {
	const month = date.getMonth();
	const monthEl = document.querySelector(`.month_${month} .days_container`);

	// создание дополнительных дневных слотов, если это необходимо, (до 1-го дня)
	if (date.getDate() === 1 && date.getDay() !== 0) {
		for (let i = 0; i < date.getDay(); i++) {
			const emptySpot = createEmptySpot();
			monthEl.appendChild(emptySpot);
		}
	}

	const dateEl = createDateEl(date);
	monthEl.appendChild(dateEl);
});

// Событие клика ко всем кругам
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColor;
	});
});

// Randomize func
randomize.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = getRandomColor();
	});
});

// Clear func
clear.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = defaultColor;
	});
});

function getRandomColor() {
	return colors[Math.floor(Math.random() * 5)];
}

function createDateEl(date) {
	const day = date.getDate();
	const dateEl = document.createElement('div');
	dateEl.classList.add('days');
	dateEl.innerHTML = `<span class="circle">${day}</span>`;
	return dateEl;
}

function createEmptySpot() {
	const emptyEl = document.createElement('div');
	emptyEl.classList.add('days');
	return emptyEl;
}

// func from StackOverflow: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}