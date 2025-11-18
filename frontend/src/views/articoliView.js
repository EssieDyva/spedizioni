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
                            <a href="/" data-nav="">
                                Home
                            </a>
                            <a href="/articoli" data-nav="articoli">
                                Articoli
                            </a>
                            <a href="/ordini" data-nav="ordini">
                                Ordini
                            </a>
                            <a href="/voci" data-nav="voci">
                                Voci
                            </a>
                            <a href="/tariffe" data-nav="tariffe">
                                Tariffe Corrieri
                            </a>
                        </nav>
                    </header>

                    <main>
                        <div>
                            <h2>Articoli</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Codice</th>
                                        <th>Descrizione</th>
                                        <th>Peso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.articoli.map(articolo => `
                                        <tr>
                                            <td>${articolo.idArticolo}</td>
                                            <td>${articolo.codice}</td>
                                            <td>${articolo.descrizione}</td>
                                            <td>${articolo.peso}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            `;
    }

    bindEvents() {
        document.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = e.target.getAttribute('data-nav');
                router.navigate(`/${path}`);
            });
        });
    }

    async loadArticoli() {
        this.loading = true;
        this.render(false);

        try {
            this.articoli = await api.getArticoli();
        } catch (error) {
            console.error('Error loading articoli:', error);
        } finally {
            this.loading = false;
            this.render(false);
        }
    }
}

export default ArticoliView