'use strict'

export class Layout {
    async loadHTML(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('Failed to load: ' + filePath);
            return await response.text();
        } catch (error) {
            console.error(error);
            return `<h1>Error</h1><p>${error.message}</p>`;
        }
    }

    async loadHeader() {
        return await this.loadHTML('layout/header.html');
    }

    async loadFooter() {
        return await this.loadHTML('layout/footer.html');
    }


// Method to execute <style> tags
    static executeStyles(container) {
        // Handle <style> tags
        const styles = container.querySelectorAll('style');
        styles.forEach((style) => {
            const newStyle = document.createElement('style');
            newStyle.textContent = style.textContent; // Copy inline style content
            document.head.appendChild(newStyle);
            style.remove(); // Remove the style element from the container
        });

        // Handle <link> tags for external stylesheets
        const links = container.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = link.href; // Copy the href of the external stylesheet
            document.head.appendChild(newLink);
            link.remove(); // Remove the link element from the container
        });
    }

    static executeScripts(container) {
        const scripts = container.querySelectorAll('script');

        scripts.forEach((script) => {
            const newScript = document.createElement('script');
            newScript.type = script.type || 'text/javascript'; // Retain the original type or default to 'text/javascript'

            if (script.src) {
                // External script
                newScript.src = script.src;
                newScript.defer = script.defer || false; // Retain defer attribute if present
                newScript.async = script.async || false; // Retain async attribute if present
            } else {
                // Inline script
                newScript.textContent = script.textContent;
            }

            if (newScript.type === 'module') {
                // For module scripts, append directly to the document head
                document.head.appendChild(newScript);
            } else {
                // For non-module scripts, execute dynamically in the body
                document.body.appendChild(newScript);
                document.body.removeChild(newScript);
            }
            script.remove();
        });
    }


    // Inject header, footer, and initialize main container
    async renderLayout() {
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear previous content

        // Load and inject Header
        const headerHTML = await this.loadHeader();
        const header = document.createElement('header');
        header.innerHTML = headerHTML;
        app.appendChild(header);

        // Create and inject Main Container
        const main = document.createElement('main');
        main.id = 'main-content';

        app.appendChild(main);

        // Load and inject Footer
        const footerHTML = await this.loadFooter();
        const footer = document.createElement('footer');
        footer.innerHTML = footerHTML;
        app.appendChild(footer);
    }
}
