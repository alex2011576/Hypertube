export interface AutocompleteOption {
	key: string;
	value: string;
}

export const sortCriteriaEn: AutocompleteOption[] = [
	{ key: 'Title', value: 'title' },
	{ key: 'Rating', value: 'rating' },
	{ key: 'Year', value: 'year' },
	{ key: 'Downloads', value: 'download_count' }
];

export const sortCriteriaRu: AutocompleteOption[] = [
	{ key: 'Название', value: 'title' },
	{ key: 'Рейтинг', value: 'rating' },
	{ key: 'Год', value: 'year' },
	{ key: 'Количество скачиваний', value: 'download_count' }
];

export const sortCriteriaSv: AutocompleteOption[] = [
	{ key: 'Titel', value: 'title' },
	{ key: 'Betyg', value: 'rating' },
	{ key: 'År', value: 'year' },
	{ key: 'Nedladdningar', value: 'download_count' }
];

export const genresEn: AutocompleteOption[] = [
	{ key: 'Action', value: 'action' },
	{ key: 'Adventure', value: 'adventure' },
	{ key: 'Animation', value: 'animation' },
	{ key: 'Biography', value: 'biography' },
	{ key: 'Comedy', value: 'comedy' },
	{ key: 'Crime', value: 'crime' },
	{ key: 'Documentary', value: 'documentary' },
	{ key: 'Drama', value: 'drama' },
	{ key: 'Family', value: 'family' },
	{ key: 'Fantasy', value: 'fantasy' },
	{ key: 'Film-Noir', value: 'film-noir' },
	{ key: 'Game-Show', value: 'game-show' },
	{ key: 'History', value: 'history' },
	{ key: 'Horror', value: 'horror' },
	{ key: 'Music', value: 'music' },
	{ key: 'Musical', value: 'musical' },
	{ key: 'Mystery', value: 'mystery' },
	{ key: 'News', value: 'news' },
	{ key: 'Reality-TV', value: 'reality-tv' },
	{ key: 'Romance', value: 'romance' },
	{ key: 'Sci-Fi', value: 'sci-fi' },
	{ key: 'Sport', value: 'sport' },
	{ key: 'Talk-Show', value: 'talk-show' },
	{ key: 'Thriller', value: 'thriller' },
	{ key: 'War', value: 'war' },
	{ key: 'Western', value: 'western' }
];

export const genresRu: AutocompleteOption[] = [
	{ key: 'Боевик', value: 'action' },
	{ key: 'Приключение', value: 'adventure' },
	{ key: 'Анимация', value: 'animation' },
	{ key: 'Биография', value: 'biography' },
	{ key: 'Комедия', value: 'comedy' },
	{ key: 'Криминал', value: 'crime' },
	{ key: 'Документальный', value: 'documentary' },
	{ key: 'Драма', value: 'drama' },
	{ key: 'Семейный', value: 'family' },
	{ key: 'Фантастика', value: 'fantasy' },
	{ key: 'Фильм-нуар', value: 'film-noir' },
	{ key: 'Игровое шоу', value: 'game-show' },
	{ key: 'Исторический', value: 'history' },
	{ key: 'Ужасы', value: 'horror' },
	{ key: 'Музыка', value: 'music' },
	{ key: 'Мюзикл', value: 'musical' },
	{ key: 'Мистика', value: 'mystery' },
	{ key: 'Новости', value: 'news' },
	{ key: 'Реалити-шоу', value: 'reality-tv' },
	{ key: 'Романтика', value: 'romance' },
	{ key: 'Научная фантастика', value: 'sci-fi' },
	{ key: 'Спорт', value: 'sport' },
	{ key: 'Ток-шоу', value: 'talk-show' },
	{ key: 'Триллер', value: 'thriller' },
	{ key: 'Военный', value: 'war' },
	{ key: 'Вестерн', value: 'western' }
];

export const genresSv: AutocompleteOption[] = [
	{ key: 'Action', value: 'action' },
	{ key: 'Äventyr', value: 'adventure' },
	{ key: 'Animerat', value: 'animation' },
	{ key: 'Biografi', value: 'biography' },
	{ key: 'Komedi', value: 'comedy' },
	{ key: 'Kriminal', value: 'crime' },
	{ key: 'Dokumentär', value: 'documentary' },
	{ key: 'Drama', value: 'drama' },
	{ key: 'Familj', value: 'family' },
	{ key: 'Fantasy', value: 'fantasy' },
	{ key: 'Film Noir', value: 'film-noir' },
	{ key: 'Game-Show', value: 'game-show' },
	{ key: 'Historia', value: 'history' },
	{ key: 'Skräck', value: 'horror' },
	{ key: 'Musik', value: 'music' },
	{ key: 'Musikal', value: 'musical' },
	{ key: 'Mysterium', value: 'mystery' },
	{ key: 'Nyheter', value: 'news' },
	{ key: 'Reality-TV', value: 'reality-tv' },
	{ key: 'Romantik', value: 'romance' },
	{ key: 'Sci-Fi', value: 'sci-fi' },
	{ key: 'Sport', value: 'sport' },
	{ key: 'Talk-Show', value: 'talk-show' },
	{ key: 'Thriller', value: 'thriller' },
	{ key: 'Krig', value: 'war' },
	{ key: 'Västern', value: 'western' }
];

//.map(({ key, value }) => ({ key, value }));
