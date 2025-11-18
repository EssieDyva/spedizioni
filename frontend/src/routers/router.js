class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });

        this.pendingInitialRoute = window.location.pathname === '/' || window.location.pathname === ''
            ? '/articoli'
            : window.location.pathname;
    }

    handlePendingInitialRoute() {
        if (this.pendingInitialRoute) {
            const route = this.pendingInitialRoute;
            this.pendingInitialRoute = null;
            if (route === '/articoli') {
                this.navigate('/articoli');
            } else {
                this.handleRoute(route);
            }
        }
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        if (path !== window.location.pathname) {
            window.history.pushState({}, '', path);
        }
        this.handleRoute(path);
    }

    handleRoute(path) {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        
        const route = this.routes[cleanPath] || this.routes[cleanPath.split('/')[0]] || this.routes['articoli'];
        
        if (route) {
            this.currentRoute = path;
            route();
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

const router = new Router();
export default router;