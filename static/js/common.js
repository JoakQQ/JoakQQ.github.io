import en from '../../locale/en.json';
import zh from '../../locale/zh.json';
const LANGS = { en, zh };

const translate = (lang, key) => LANGS[lang][key];

const updateTranslation = (lang) => {
	$("[data-translate]").each((_, element) => $(element).html(translate(lang, $(element).html())));
};

const getLanguage = () => {
	let lang = new URLSearchParams(window.location.search).get("lang");
	if (lang && !Object.keys(LANGS).includes(lang)) lang = 'en'; // default lang en
	return lang || navigator.language.split('-')[0];
};

const updateAnchorQuerys = (lang) => {
	$("a.nav-button").each((_, anchor) => $(anchor).attr("href", `${$(anchor).attr("href").split("?")[0]}?lang=${lang}`));
};

const updateSelectValue = (lang) => $("#lang-select").val(lang);

const updateQuery = (lang) => window.location.search = `?lang=${lang}`;

window.onlanguagechange = (element) => {
	const lang = $(element).val();
	updateAnchorQuerys(lang);
	updateTranslation(lang);
	updateQuery(lang);
};

// translation
updateAnchorQuerys(getLanguage());
updateTranslation(getLanguage());
updateSelectValue(getLanguage());

window.$ = $; // TODO remove later
