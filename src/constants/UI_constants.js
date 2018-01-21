const NEWS_CATEGORY = {
    BUSINESS: "business",
    ENTERTAINMENT: "entertainment",
    GENERAL: "general",
    HEALTH: "health",
    SCIENCE: "science",
    SPORTS: "sports",
    TECHNOLOGY: "technology",
};

const INDIA_NEWS_SOURCES = [
    {
        name: 'AajTak',
        url: "intoday.in",
        imgurl: "https://i.imgur.com/amRxwBU.jpg",
        category: 'general'
    },
    {
        name: "ABP News",
        url: "abplive.in",
        category: "general"
    },
    {
        name: "News18 India",
        url: "news18.com",
        category: "general"
    },

    {
        name: "India TV",
        url: "indiatvnews.com",
        imgurl: "",
    },

    {
        name: "NDTV India",
        url: "ndtv.com",
        imgurl: "",
    },

    {
        name: "News 24",
        url: "news24online.com",
        imgurl: "",
    },

    {
        name: "News Nation",
        url: "newsnation.in",
        imgurl: "",
    },

    {
        name: "Zee News",
        url: "india.com",
        imgurl: "",
    },



    {
        name: 'Bhaskar',
        url: "bhaskar.com",
        category: 'general'
    },
    {
        name: 'Money Control',
        url: "moneycontrol.com",
        category: 'business'
    },
    {
        name: 'Business Standard',
        url: "business-standard.com",
        category: 'business'
    },
    {
        name: 'Live Mint',
        url: "livemint.com",
        category: 'general'
    },
    {
        name: 'DNA India',
        url: "dnaindia.com",
        category: 'general'
    }
    // TIMESOFINDIA: "timesofindia.com",
    // THEHINDU:"thehindu.com",
    // HINDUSTANTIMES: "hindustantimes.com",
    // DNAINDIA: "dnaindia.com",
    // DAILYPIONEER: "dailypioneer.com",
    // NDTV: "ndtv.com",
    // ASIANAGE: "asianage.com",
    // TELEGRAPHINDIA: "telegraphindia.com",
    // LIVEMINT: "livemint.com",
    // NEWINDIANEXPRESS: "newindianexpress.com",
    // FINANCIALEXPRESS: "financialexpress.com",
    // BUSINESS_STANDARD: "business-standard.com",
    // ONEINDIA: "oneindia.com",
    // JAGRAN: "jagran.com",
    // MONEYCONTROL: "moneycontrol.com",
    // BHASKAR: "bhaskar.com",
];

const COUNTRIES = {
    ASIA: [
        { name: 'India', code: 'in' },
        { name: 'UAE', code: 'ae' },
        { name: 'China', code: 'cn' },
        { name: 'Indonesia', code: 'id' },
        { name: 'Israel', code: 'il' },
        { name: 'Japan', code: 'jp' },
        { name: 'South Korea', code: 'kr' },
        { name: 'Malaysia', code: 'my' },
        { name: 'Philippines', code: 'ph' },
        { name: 'Russia', code: 'ru' },
        { name: 'Saudi Arabia', code: 'sa' },
        { name: 'Singapore', code: 'sg' },
        { name: 'Thailand', code: 'th' },
        { name: 'Turkey', code: 'tr' },
        { name: 'Taiwan', code: 'tw' }
    ],
    AMERICA: [
        { name: 'USA', code: 'us' },
        { name: 'Argentina', code: 'ar' },
        { name: 'Brazil', code: 'br' },
        { name: 'Canada', code: 'ca' },
        { name: 'Colombia', code: 'co' },
        { name: 'Cuba', code: 'cu' },
        { name: 'Mexico', code: 'mx' },
        { name: 'Venezuela', code: 've' }
    ],
    AFRICA: [
        { name: 'South Africa', code: 'za' },
        { name: 'Egypt', code: 'eg' },
        { name: 'Morocco', code: 'ma' },
        { name: 'Nigeria', code: 'ng' }
    ],
    EUROPE: [
        { name: 'Austria', code: 'at' },
        { name: 'Belgium', code: 'be' },
        { name: 'Bulgaria', code: 'bg' },
        { name: 'Switzerland', code: 'ch' },
        { name: 'Czech Republic', code: 'cz' },
        { name: 'Germany', code: 'de' },
        { name: 'France', code: 'fr' },
        { name: 'United Kingdom', code: 'gb' },
        { name: 'Greece', code: 'gr' },
        { name: 'Hungary', code: 'hu' },
        { name: 'Italy', code: 'it' },
        { name: 'Lithuania', code: 'lt' },
        { name: 'Latvia', code: 'lv' },
        { name: 'Netherlands', code: 'nl' },
        { name: 'Norway', code: 'no' },
        { name: 'Poland', code: 'pl' },
        { name: 'Portugal', code: 'pt' },
        { name: 'Romania', code: 'ro' },
        { name: 'Serbia', code: 'rs' },
        { name: 'Sweden', code: 'se' },
        { name: 'Slovenia', code: 'si' },
        { name: 'Slovakia', code: 'sk' },
        { name: 'Ukraine', code: 'ua' }
    ],
    AUTONOMOUS: [
        { name: 'Australia', code: 'au' },
        { name: 'Hong Kong', code: 'hk' },
        { name: 'New Zealand', code: 'nz' }
    ]
}

export { COUNTRIES, NEWS_CATEGORY, INDIA_NEWS_SOURCES };