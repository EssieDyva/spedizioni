import api from "../api/api";
import router from "../routers/router";

class ArticoliView {
    constructor() {
        this.container = document.getElementById('app');
        this.articoli = [];
        this.loading = false;
    }

    async render(loadArticoli = true) {
        this.container.innerHTML = this.getTemplate();
        this.bindEvents();
        if (loadArticoli) {
            await this.loadArticoli();
        }
    }

    getTemplate() {
        return `
                <div>
                    <header>
                        <h1>Esame Spedizioni</h1>
                        <nav>
                            <a href="/articoli" data-nav="articoli">
                                Articoli
                            </a>
                        </nav>
                    </header>
    
                    <main>
                        <div>
                            <h2>Articoli</h2>
                        </div>
                    </main>
                </div>
            `;
    }

    bindEvents() {
        // Navigation events
        document.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = e.target.getAttribute('data-nav');
                router.navigate(`/${path}`);
            });
        });

        // Refresh button
        document.querySelector('[data-action="refresh"]').addEventListener('click', () => {
            this.loadPeople();
        });
    }

    async loadArticoli() {
        this.loading = true;
        this.render(false);

        try {
            this.articoli = await api.getPeople();
        } catch (error) {
            console.error('Error loading:', error);
        } finally {
            this.loading = false;
            this.render(false);
        }
    }


}
export default ArticoliView