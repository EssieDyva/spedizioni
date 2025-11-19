import './style.css';
import router from './routers/router.js'
import ArticoliView from './views/articoliView.js';
import OrdiniView from './views/ordiniView.js';
import TariffeCorrieriView from './views/tariffeCorrieriView.js';

class App {
    constructor() {
        this.articoliView = new ArticoliView()
        this.ordiniView = new OrdiniView()
        this.tariffeCorrieriView = new TariffeCorrieriView()
        this.setupRoutes();
    }

    setupRoutes() {
        router.addRoute('articoli', () => {
          console.log('Navigating to aricoli view')
          this.articoliView.render()
        })

        router.addRoute('ordini', () => {
          console.log('Navigating to ordini view')
          this.ordiniView.render()
        })

        router.addRoute('tariffeCorrieri', () => {
          console.log('Navigating to tariffe corrieri view')
          this.tariffeCorrieriView.render()
        })


        router.addRoute('', () => {
            console.log('Root path, redirecting to articoli');
            router.navigate('/articoli');
        });
    }

    init() {
        router.handlePendingInitialRoute();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;