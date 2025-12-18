
// Встроенная коллекция цитат
const fallbackQuotes = [
    { text: "Будь собой; все остальные роли уже заняты.", author: "Оскар Уайльд" },
    { text: "Жизнь — это то, что происходит, пока вы строите другие планы.", author: "Джон Леннон" },
    { text: "Единственный способ делать великую работу — любить то, что вы делаете.", author: "Стив Джобс" },
    { text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.", author: "Элеонора Рузвельт" },
    { text: "Темнота не может прогнать темноту: это может сделать только свет.", author: "Мартин Лютер Кинг" },
    { text: "Образование — самое мощное оружие, с помощью которого можно изменить мир.", author: "Нельсон Мандела" },
    { text: "Не позволяйте вчерашнему дню занимать слишком много сегодняшнего.", author: "Уилл Роджерс" },
    { text: "Верь в себя. Ты храбрее, чем думаешь, талантливее, чем полагаешь, и способен на большее, чем воображаешь.", author: "Рой Т. Беннетт" },
    { text: "Я узнал, что люди забудут то, что вы сказали, забудут то, что вы сделали, но никогда не забудут, что вы заставили их чувствовать.", author: "Майя Энджелоу" },
    { text: "Успех — это не окончательный, неудача — не фатальна: важна смелость продолжать.", author: "Уинстон Черчилль" },
    { text: "Мы становимся тем, о чём думаем.", author: "Эрл Найтингейл" },
    { text: "Лучшее время посадить дерево было 20 лет назад. Второе лучшее время — сейчас.", author: "Китайская пословица" },
    { text: "Единственная невозможная вещь — это та, которую вы не попробуете сделать.", author: "Неизвестен" },
    { text: "Счастье — это не что-то готовое. Оно приходит от ваших собственных действий.", author: "Далай-лама" },
    { text: "Если вы хотите жить счастливой жизнью, привяжите её к цели, а не к людям или вещам.", author: "Альберт Эйнштейн" },
    { text: "Величайшая слава в жизни не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз, когда падаешь.", author: "Нельсон Мандела" },
    { text: "То, что мы делаем сегодня, может быть каплей в океане, но этот океан был бы меньше без этой капли.", author: "Мать Тереза" },
    { text: "Жизнь сжимается или расширяется пропорционально нашей храбрости.", author: "Анаис Нин" }
];

let currentQuote = '';
let currentAuthor = '';
let usedQuotes = [];

async function getNewQuote() {
    const quoteBox = document.getElementById('quoteBox');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    quoteBox.innerHTML = '<p class="loading"><span class="loader"></span>Загрузка...</p>';
    newQuoteBtn.disabled = true;

    try {
        const response = await fetch('https://zenquotes.io/api/random');
        
        if (!response.ok) {
            throw new Error('API недоступен');
        }

        const data = await response.json();
        currentQuote = data[0].q;
        currentAuthor = data[0].a;

    } catch (error) {
        console.log('Используем встроенные цитаты');
        
        if (usedQuotes.length === fallbackQuotes.length) {
            usedQuotes = [];
        }
        
        let availableQuotes = fallbackQuotes.filter((_, index) => !usedQuotes.includes(index));
        let randomIndex = Math.floor(Math.random() * availableQuotes.length);
        let selectedQuote = availableQuotes[randomIndex];
        
        usedQuotes.push(fallbackQuotes.indexOf(selectedQuote));
        
        currentQuote = selectedQuote.text;
        currentAuthor = selectedQuote.author;
    }

    quoteBox.innerHTML = `
        <p class="quote-text">${currentQuote}</p>
        <p class="quote-author">${currentAuthor}</p>
    `;

    newQuoteBtn.disabled = false;
}

window.addEventListener('load', getNewQuote);
