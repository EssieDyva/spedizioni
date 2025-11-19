import api from "../api/api";
import router from "../routers/router";

class TariffeCorrieriView {
    constructor() {
        this.container = document.getElementById('app');
        this.tariffeCorrieri = [];
        this.formData = {
            nomeCorriere: '',
            nomeTariffa: '',
            pesoMassimo: '',
            costo: ''
        };
        this.loading = false;
    }

    async render(loadTariffeCorrieri = true) {
        this.container.innerHTML = this.getTemplate();
        this.bindEvents();
        if (loadTariffeCorrieri) {
            await this.loadTariffeCorrieri();
        }
    }

    getTemplate() {
        return `
                <div id="pagina" class="tariffe">
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
                            <h2>Tariffe Corrieri</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Tariffa Corriere</th>
                                        <th>Nome Corriere</th>
                                        <th>Nome Tariffa</th>
                                        <th>Peso Massimo</th>
                                        <th>Costo</th>
                                        <th>Operazioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.tariffeCorrieri.map(tariffaCorriere => `
                                        <tr>
                                            <td id="id">${tariffaCorriere.idTariffaCorriere}</td>
                                            <td>${tariffaCorriere.nomeCorriere}</td>
                                            <td>${tariffaCorriere.nomeTariffa}</td>
                                            <td>${tariffaCorriere.pesoMassimo}</td>
                                            <td>${tariffaCorriere.costo}</td>
                                            <td>
                                                <button type="submit" id="deleteButton" value="${tariffaCorriere.idTariffaCorriere}">Elimina</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </main>

                    <div class="form">
                    <h2>Aggiungi nuova tariffa</h2>
                        <form id="addForm">
                            <label for="nomeCorriere">Nome Corriere</label><br>
                            <input type="text" id="nomeCorriere" name="nomeCorriere" value="${this.formData.nomeCorriere}" required><br>

                            <label for="nomeTariffa">Nome Tariffa</label><br>
                            <input type="text" id="nomeTariffa" name="nomeTariffa" value="${this.formData.nomeTariffa}" required><br>

                            <label for="pesoMassimo">Peso Massimo</label><br>
                            <input type="number" id="pesoMassimo" name="pesoMassimo" value="${this.formData.pesoMassimo}" required><br>

                            <label for="costo">Costo</label><br>
                            <input type="number" id="costo" name="costo" value="${this.formData.costo}" required><br>

                            <button type="submit" value="Submit">
                                Crea Tariffa
                            </button>
                        </form>
                    </div>
                </div>
            `;
    }

    bindEvents() {
        document.querySelectorAll('[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const path = e.target.getAttribute('data-nav')
                router.navigate(`/${path}`)
            })
        })

        // stavo provando a settare la delete lato frontend, non riuscendoci
        document.querySelectorAll('tr').forEach(riga => {
            riga.addEventListener('submit', (e) => {
                e.preventDefault
                this.deleteRow(riga)
            })
        })

        const form = document.getElementById('addForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.handleSubmit()
        })
    }

    async loadTariffeCorrieri() {
        this.loading = true;
        this.render(false);

        try {
            this.tariffeCorrieri = await api.getTariffeCorrieri();
        } catch (error) {
            console.error('Error loading ordini:', error);
        } finally {
            this.loading = false;
            this.render(false);
        }
    }

    async handleSubmit() {
        try {
            console.log(this.formData)
            const nuovaTariffa = await api.addTariffaCorriere(this.formData);
            console.log(nuovaTariffa)
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteRow() {
        try {
            const response = await api.deleteTariffaCorriere(tariffaCorriere.idTariffaCorriere)
        } catch (error) {
            throw new Error(error)
        }
    }

    resetForm() {
        this.formData = { 
            nomeCorriere: '',
            nomeTariffa: '',
            pesoMassimo: '',
            costo: ''};
        this.render();
    }
}

export default TariffeCorrieriView