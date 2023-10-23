
const loadLanguage = async (languageCode) => {
    const response = await fetch(`https://afialova.github.io/piskvorky/${languageCode}.json`)
    const translations = await response.json()
    updateContent(translations)
}

function updateContent(translations) {
    const contentElements = document.querySelectorAll('[data-translate]');

    contentElements.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        if (translations[translationKey]) {
            element.textContent = translations[translationKey];
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en'); // Load English translations on page load
});
const languageButtons = document.querySelectorAll('.language-selection img[data-lang]');

languageButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedLanguage = event.target.getAttribute('data-lang');
        loadLanguage(selectedLanguage);
    });
});