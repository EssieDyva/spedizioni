import dataService from '../core/dataService.js';
import router from '../core/router.js';

// People List View - displays all people (GET functionality)
class PeopleListView {
    constructor() {
        this.container = document.getElementById('app');
        this.people = [];
        this.loading = false;
    }

    async render(loadPeople = true) {
        this.container.innerHTML = this.getTemplate();
        this.bindEvents();
        if (loadPeople) {
            await this.loadPeople();
        }
    }

    getTemplate() {
        return `
            <div class="view people-list-view">
                <header class="app-header">
                    <h1>People Management System</h1>
                    <nav class="main-nav">
                        <a href="/people" class="nav-link ${router.getCurrentRoute()?.includes('people') ? 'active' : ''}" data-nav="people">
                            👥 View People (GET)
                        </a>
                        <a href="/add-person" class="nav-link ${router.getCurrentRoute()?.includes('add-person') ? 'active' : ''}" data-nav="add-person">
                            ➕ Add Person (POST)
                        </a>
                    </nav>
                </header>

                <main class="view-content">
                    <div class="section-header">
                        <h2>People List</h2>
                        <p class="section-description">Displaying all people records from the database</p>
                    </div>

                    <div class="action-bar">
                        <button class="btn btn-primary" data-action="refresh">
                            🔄 Refresh Data
                        </button>
                        <span class="record-count">Total: ${this.people.length} people</span>
                    </div>

                    <div class="loading-indicator" style="display: ${this.loading ? 'block' : 'none'}">
                        <div class="spinner"></div>
                        <p>Loading people data...</p>
                    </div>

                    <div class="people-grid" id="people-grid" style="display: ${this.loading ? 'none' : 'grid'}">
                        ${this.people.length === 0 ? this.getEmptyState() : this.getPeopleCards()}
                    </div>
                </main>
            </div>
        `;
    }

    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">👥</div>
                <h3>No People Found</h3>
                <p>No people records have been added yet.</p>
                <a href="/add-person" class="btn btn-secondary" data-nav="add-person">
                    Add First Person
                </a>
            </div>
        `;
    }

    getPeopleCards() {
        return this.people.map(person => `
            <div class="person-card">
                <div class="person-avatar">
                    ${person.name.charAt(0).toUpperCase()}${person.surname.charAt(0).toUpperCase()}
                </div>
                <div class="person-info">
                    <h3 class="person-name">${person.name} ${person.surname}</h3>
                    <div class="person-details">
                        <span class="person-age">Age: ${person.age}</span>
                        <span class="person-id">ID: ${person.id}</span>
                    </div>
                </div>
            </div>
        `).join('');
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

    async loadPeople() {
        this.loading = true;
        this.render(false); // Re-render to show loading state

        try {
            this.people = await dataService.getPeople();
        } catch (error) {
            console.error('Error loading people:', error);
            this.showError('Failed to load people data');
        } finally {
            this.loading = false;
            this.render(false); // Re-render with actual data
        }
    }

    showError(message) {
        const grid = document.getElementById('people-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h3>Error</h3>
                    <p>${message}</p>
                    <button class="btn btn-primary" data-action="retry">Try Again</button>
                </div>
            `;
            
            document.querySelector('[data-action="retry"]').addEventListener('click', () => {
                this.loadPeople();
            });
        }
    }
}

export default PeopleListView;