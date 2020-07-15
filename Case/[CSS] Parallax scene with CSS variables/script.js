/*
basicScroll делает следующее …
1. начинает изменять пользовательское свойство CSS для каждого слоя, как только пользователь начинает прокрутку.
2. перестает изменять пользовательское свойство CSS для каждого слоя, как только нижняя часть слоев достигает верхней части видового экрана.
*/
document.querySelectorAll('.scene').forEach((elem) => {

	const modifier = elem.getAttribute('data-modifier')

	basicScroll.create({
		elem: elem,
		from: 0,
		to: 519,
		direct: true,
		props: {
			'--translateY': {
				from: '0',
				to: `${ 10 * modifier }px`
			}
		}
	}).start()
})