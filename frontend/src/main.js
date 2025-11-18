import './style.css';
import router from './routers/router.js'
import ArticoliView from './views/articoliView.js';

// Initialize the application
class App {
    constructor() {
        this.articoliView = new ArticoliView();
        this.setupRoutes();
    }

    setupRoutes() {
        router.addRoute('articoli', () => {
          console.log('Navigating to aricoli view')
          this.articoliView.render()
        })

        // Handle root path - redirect to people list
        router.addRoute('', () => {
            console.log('Root path, redirecting to people list');
            router.navigate('/articoli');
        });
    }

    init() {
        router.handlePendingInitialRoute();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// Export for potential external use
export default App;