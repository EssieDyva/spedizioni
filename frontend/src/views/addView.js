import dataService from '../core/dataService.js';
import router from '../core/router.js';

class AddPersonView {
    constructor() {
        this.container = document.getElementById('app');
        this.formData = {
            name: '',
            surname: '',
            age: ''
        };
        this.errors = {};
        this.isSubmitting = false;
    }

    render() {
        this.container.innerHTML = this.getTemplate();
        this.bindEvents();
    }

    getTemplate() {
        return `
            <div class="view add-person-view">
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
                        <h2>Add New Person</h2>
                        <p class="section-description">Fill out the form below to add a new person to the database</p>
                    </div>

                    <div class="form-container">
                        <form id="add-person-form" class="person-form">
                            <div class="form-group">
                                <label for="name" class="form-label">First Name *</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    class="form-input ${this.errors.name ? 'error' : ''}"
                                    value="${this.formData.name}"
                                    placeholder="Enter first name"
                                    required
                                >
                                ${this.errors.name ? `<span class="error-message">${this.errors.name}</span>` : ''}
                            </div>

                            <div class="form-group">
                                <label for="surname" class="form-label">Last Name *</label>
                                <input 
                                    type="text" 
                                    id="surname" 
                                    name="surname" 
                                    class="form-input ${this.errors.surname ? 'error' : ''}"
                                    value="${this.formData.surname}"
                                    placeholder="Enter last name"
                                    required
                                >
                                ${this.errors.surname ? `<span class="error-message">${this.errors.surname}</span>` : ''}
                            </div>

                            <div class="form-group">
                                <label for="age" class="form-label">Age *</label>
                                <input 
                                    type="number" 
                                    id="age" 
                                    name="age" 
                                    class="form-input ${this.errors.age ? 'error' : ''}"
                                    value="${this.formData.age}"
                                    placeholder="Enter age (1-150)"
                                    min="1" 
                                    max="150"
                                    required
                                >
                                ${this.errors.age ? `<span class="error-message">${this.errors.age}</span>` : ''}
                            </div>

                            <div class="form-actions">
                                <button 
                                    type="button" 
                                    class="btn btn-secondary" 
                                    data-action="cancel"
                                    ${this.isSubmitting ? 'disabled' : ''}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary"
                                    ${this.isSubmitting ? 'disabled' : ''}
                                >
                                    ${this.isSubmitting ? 'Adding Person...' : 'Add Person'}
                                </button>
                            </div>

                            <div class="loading-overlay" style="display: ${this.isSubmitting ? 'flex' : 'none'}">
                                <div class="spinner"></div>
                                <p>Adding person to database...</p>
                            </div>
                        </form>
                    </div>

                    <div class="success-message" style="display: none;" id="success-message">
                        <div class="success-icon">✅</div>
                        <h3>Person Added Successfully!</h3>
                        <p>The person has been added to the database and can now be viewed in the people list.</p>
                        <div class="success-actions">
                            <button class="btn btn-secondary" data-action="add-another">Add Another Person</button>
                            <button class="btn btn-primary" data-action="view-people">View All People</button>
                        </div>
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

        // Form submission
        const form = document.getElementById('add-person-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Form input validation
        ['name', 'surname', 'age'].forEach(field => {
            const input = document.getElementById(field);
            input.addEventListener('input', (e) => {
                this.formData[field] = e.target.value;
                this.clearFieldError(field);
                this.validateField(field, e.target.value);
            });
        });

        // Cancel button
        document.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            router.navigate('/people');
        });

        // Success message actions
        document.querySelector('[data-action="add-another"]')?.addEventListener('click', () => {
            this.resetForm();
            this.hideSuccessMessage();
        });

        document.querySelector('[data-action="view-people"]')?.addEventListener('click', () => {
            router.navigate('/people');
        });
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) return;

        this.isSubmitting = true;
        this.render(); // Re-render to show loading state

        try {
            const newPerson = await dataService.addPerson(this.formData);
            this.showSuccessMessage(newPerson);
        } catch (error) {
            console.error('Error adding person:', error);
            this.showFormError(error.message);
        } finally {
            this.isSubmitting = false;
        }
    }

    validateForm() {
        this.errors = {};
        let isValid = true;

        // Validate name
        if (!this.formData.name.trim()) {
            this.errors.name = 'First name is required';
            isValid = false;
        } else if (this.formData.name.trim().length < 2) {
            this.errors.name = 'First name must be at least 2 characters';
            isValid = false;
        }

        // Validate surname
        if (!this.formData.surname.trim()) {
            this.errors.surname = 'Last name is required';
            isValid = false;
        } else if (this.formData.surname.trim().length < 2) {
            this.errors.surname = 'Last name must be at least 2 characters';
            isValid = false;
        }

        // Validate age
        const age = parseInt(this.formData.age);
        if (!this.formData.age) {
            this.errors.age = 'Age is required';
            isValid = false;
        } else if (isNaN(age) || age < 1 || age > 150) {
            this.errors.age = 'Age must be between 1 and 150';
            isValid = false;
        }

        this.render(); // Re-render to show validation errors
        return isValid;
    }

    validateField(field, value) {
        switch (field) {
            case 'name':
                if (value.trim() && value.trim().length < 2) {
                    this.errors.name = 'First name must be at least 2 characters';
                } else {
                    delete this.errors.name;
                }
                break;
            case 'surname':
                if (value.trim() && value.trim().length < 2) {
                    this.errors.surname = 'Last name must be at least 2 characters';
                } else {
                    delete this.errors.surname;
                }
                break;
            case 'age':
                const age = parseInt(value);
                if (value && (isNaN(age) || age < 1 || age > 150)) {
                    this.errors.age = 'Age must be between 1 and 150';
                } else {
                    delete this.errors.age;
                }
                break;
        }
    }

    clearFieldError(field) {
        delete this.errors[field];
    }

    showFormError(message) {
        // Create or update a general error message
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            document.querySelector('.form-container').appendChild(errorDiv);
        }
        errorDiv.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p>${message}</p>
        `;
        errorDiv.style.display = 'flex';
    }

    showSuccessMessage(person) {
        document.getElementById('add-person-form').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        
        // Update success message with person details
        const successMsg = document.querySelector('#success-message p');
        successMsg.textContent = `${person.name} ${person.surname} (Age: ${person.age}) has been added to the database.`;
    }

    hideSuccessMessage() {
        document.getElementById('add-person-form').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }

    resetForm() {
        this.formData = { name: '', surname: '', age: '' };
        this.errors = {};
        this.isSubmitting = false;
        this.render();
    }
}

export default AddPersonView;