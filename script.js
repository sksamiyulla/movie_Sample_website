const apiKey = "YOUR_API_KEY";
const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const imgURL = "https://image.tmdb.org/t/p/w1280";
const searchURL = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`;
const form = document.getElementById("search-form");
const query = document.getElementById("query");
const root = document.getElementById("root");
let movies = [],
    page = 1,
    inSearchPage = false;

// Fetch json data from URL
async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((res) => res.json());
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

const imagesData = [
    {
        title: "One Piece",
        release_date: "August 6, 2023 ",
        overview: "ONE PIECE is a legendary high-seas quest unlike any other. Luffy is a young adventurer who has longed for a life of freedom ever since he can remember. He sets off from his small village on a perilous journey to find the legendary fabled treasure, ONE PIECE, to become King of the Pirates!",
        imagePath: "./images/onepiece.jpg",
    },
    {
        title: "Haikyuu!",
        release_date: "january 11 2020",
        overview: "Junior high school student, Shoyo Hinata, becomes obsessed with volleyball after catching a glimpse of Karasuno High School playing in Nationals on TV. Of short stature himself, Hinata is inspired by a player the commentators nickname 'The Little Giant', Karasuno's short but talented wing spiker.",
        imagePath: "./images/Haikyu.jpg",
    },
    {
        title: "Your Name",
        release_date: "26 August 2016",
        overview: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
        imagePath: "./images/your name.jpg",
    },
    {
        title: "Suzume no tojimari",
        release_date: "11 November 2022",
        overview: "As the skies turn red and the planet trembles, Japan stands on the brink of disaster. However, a determined teenager named Suzume sets out on a mission to save her country. Able to see supernatural forces that others cannot, it's up to her to close the mysterious doors that are spreading chaos across the land.",
        imagePath: "./images/suzume.jpg",
    },
    {
        title: "Toradora",
        release_date: "2 October 2008",
        overview: "Ryuji Takasu is frustrated at trying to look his best as he enters his second year of high school. Despite his gentle personality, his eyes give him the appearance of an intimidating delinquent. He is happy to be classmates with his best friend Yusaku Kitamura, as well as the girl he has a crush on, Minori Kushieda.",
        imagePath: "./images/toradora.jpg",
    },
    {
        title: "Black Clover: Sword of the Wizard King",
        release_date: "16 June 2023",
        overview: "In a world where magic is everything, Asta, a boy who was born with no magic, aims to become the Wizard King, to overcome adversity, prove his power, and keep his oath with his friends.",
        imagePath: "./images/black clover.jpg",
    },
    {
        title: "Naruto",
        release_date: "4 August 2007",
        overview: "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
        imagePath: "./images/Naruto",
    },
    {
        title: "Bleach",
        release_date: "11 October 2022",
        overview: "Ichigo Kurosaki is a teenager from Karakura Town who can see ghosts, a talent allowing him to meet a supernatural human Rukia Kuchiki, who enters the town in search of a Hollow, a kind of monstrous lost soul who can harm both ghosts and humans.",
        imagePath: "./images/bleach.jpg",
    },
];

const fetchAndShowResults = async (URL) => {
    const data = await fetchData(URL);
    data && showResults(data.results);
};

const getSpecificPage = (page) => {
    const specificURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    fetchAndShowResults(specificURL);
};

const movieCard = (movie) => `
    <div class="col">
        <div class="card" style="background-image: url('${movie.imagePath}');">
            <a class="card-media" href="${movie.imagePath}">
                <!-- The img tag is optional if you want to include a fallback content -->
                <img src="${movie.imagePath}" alt="${movie.title}" width="100%" style="display: none;" />
            </a>
            <div class="card-content">
                <div class="card-cont-header">
                    <div class="cont-left">
                        <h3 style="font-weight: 600">${movie.title}</h3>
                        <span style="color: #12efec">${movie.release_date}</span>
                    </div>
                    <div class="cont-right">
                        <a href="${movie.imagePath}" target="_blank" class="btn">See image</a>
                    </div>
                </div>
                <div class="describe">
                    ${movie.overview}
                </div>
            </div>
        </div>
    </div>`;

const showResults = (items) => {
    let content = !inSearchPage ? "" : root.innerHTML;

    // Loop through the imagesData array
    imagesData.forEach((movieData) => {
        content += movieCard(movieData);
    });

    root.innerHTML = content; // Inject content to root
};

const handleLoadMore = () => {
    getSpecificPage(++page);
};

const detectEndAndLoadMore = () => {
    let el = document.documentElement;
    if (!inSearchPage && el.scrollTop + el.clientHeight === el.scrollHeight) {
        console.log("BINGO!");
        handleLoadMore();
    }
};

form.addEventListener("submit", async (e) => {
    inSearchPage = true;
    e.preventDefault();
    const searchTerm = query.value;
    searchTerm && fetchAndShowResults(searchURL + searchTerm);
    query.value = "";
});

window.addEventListener("scroll", detectEndAndLoadMore);

function init() {
    inSearchPage = false;
    fetchAndShowResults(URL);
}

init();
