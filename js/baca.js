const bacaApp = Vue.createApp({
    data() {
        return {
            article: {},
            articleContent: '',
            articleLink: ''
        }
    },
    mounted() {
        this.loadArticle();
    },
    methods: {
        async loadArticle() {
            const urlParams = new URLSearchParams(window.location.search);
            const articleId = urlParams.get('article');

            if (articleId) {
                try {
                    // Fetch article metadata array
                    const response = await fetch('article.json');
                    const articles = await response.json();

                    // Find article by id
                    const articleData = articles.find(a => a.id == articleId);
                    if (!articleData) {
                        this.articleContent = '<p>Article not found.</p>';
                        return;
                    }
                    this.article = articleData;
                    this.articleLink = articleData.link || '';

                    // Fetch and parse markdown content
                    const mdResponse = await fetch(articleData.content);
                    const mdText = await mdResponse.text();
                    this.articleContent = marked.parse(mdText);
                } catch (error) {
                    console.error('Error loading article:', error);
                    this.articleContent = '<p>Error loading article.</p>';
                }
            } else {
                this.articleContent = '<p>No article specified.</p>';
            }
        },
        openLink() {
            if (this.articleLink) {
                window.open(this.articleLink, '_blank');
            }
        }
    }
});

bacaApp.mount('#baca-app');
