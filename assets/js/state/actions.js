import Store from '../state/store.js';

export async function loadHero() {
    try {
        Store.setState({ heroLoading: true });
        const response = await fetch('assets/json/hero.json');
        if (!response.ok) throw new Error('Failed to load hero data');
        const data = await response.json();
        Store.setState({ heroData: data, heroLoading: false });
        return data;
    } catch (error) {
        console.error('loadHero error:', error);
        Store.setState({ heroLoading: false, heroError: error.message });
        return null;
    }
}

export async function loadArticles() {
    try {
        Store.setState({ articlesLoading: true });
        const response = await fetch('assets/json/articles.json');
        if (!response.ok) throw new Error('Failed to load articles data');
        const data = await response.json();
        Store.setState({ articlesData: data, articlesLoading: false });
        return data;
    } catch (error) {
        console.error('loadArticles error:', error);
        Store.setState({ articlesLoading: false, articlesError: error.message });
        return null;
    }
}

export async function loadFAQ() {
    try {
        Store.setState({ faqLoading: true });
        const response = await fetch('assets/json/faq.json');
        if (!response.ok) throw new Error('Failed to load FAQ data');
        const data = await response.json();
        Store.setState({ faqData: data, faqLoading: false });
        return data;
    } catch (error) {
        console.error('loadFAQ error:', error);
        Store.setState({ faqLoading: false, faqError: error.message });
        return null;
    }
}