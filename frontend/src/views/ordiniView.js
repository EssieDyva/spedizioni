import api from "../api/api";
import router from "../routers/router";

class OrdiniView {
    constructor() {
        this.container = document.getElementById('app');
        this.ordini = [];
        this.loading = false;
    }

    async render(loadOrdini = true) {
        this.container.innerHTML = this.getTemplate();
        this.bindEvents();
        if (loadOrdini) {
            await this.loadOrdini();
        }
    }

    getTemplate() {
        return `
                <div id="pagina" class="ordini">
                    <header>
                        <h1>Esame Spedizioni</h1>
                        <nav>
                            <a href="/ordini" data-nav="articoli">
                                Articoli
                            </a>
                            <a href="/ordini" data-nav="ordini">
                                Ordini
                            </a>
                            <a href="/tariffe" data-nav="tariffeCorrieri">
                                Tariffe Corrieri
                            </a>
                        </nav>
                    </header>

                    <main>
                        <div class="tabella">
                            <h2>Ordini</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Ordine</th>
                                        <th>Numero</th>
                                        <th>Data</th>
                                        <th>Tariffa migliore</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.ordini.map(ordine => `
                                        <tr>
                                            <td>${ordine.idOrdine}</td>
                                            <td>${ordine.numero}</td>
                                            <td>${ordine.data}</td>
                                            <td>${ordine.costo + ' (' + ordine.nomeCorriere + ' ' + ordine.nomeTariffa + ')'}</td>
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

    async loadOrdini() {
        this.loading = true;
        this.render(false);

        try {
            this.ordini = await api.getOrdini();
        } catch (error) {
            console.error('Error loading ordini:', error);
        } finally {
            this.loading = false;
            this.render(false);
        }
    }
}

export default OrdiniView