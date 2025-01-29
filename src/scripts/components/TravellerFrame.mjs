class TravellerFrame extends HTMLElement {
    FieldsContainer;
    constructor() {
        super();
        const Shadow = this.attachShadow({ mode: 'open' });
        // Create elements
        const Container = document.createElement('div');
        const Title = document.createElement('div');
        const FieldsContainer = document.createElement('div');
        const Style = document.createElement('style');
        // Set classes and attributes
        Container.className = 'FrameContainer';
        Title.className = 'FrameTitle';
        FieldsContainer.className = 'FieldsContainer';
        // Populate title from attribute
        Title.textContent = this.getAttribute('title') || 'Frame Title';
        // Load styles
        Style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            .FrameContainer {
                width: auto;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                display: inline-flex;
                padding-bottom: 40px;
            }
            .FrameTitle {
                width: 100%;
                text-align: justify;
                color: #EDE781;
                font-size: 16px;
                font-family: Orbitron;
                font-weight: 700;
                word-wrap: break-word;
                padding-bottom: 0.3rem;
                padding-left: 0rem;
            }
            .FieldsContainer {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1px;
            }
        `;
        // Append elements to shadow DOM
        Shadow.appendChild(Style);
        Shadow.appendChild(Container);
        Container.appendChild(Title);
        Container.appendChild(FieldsContainer);
        // Store a reference for dynamic updates
        this.FieldsContainer = FieldsContainer;
    }
    // Populate fields dynamically
    set Fields(Definitions) {
        this.FieldsContainer.innerHTML = ''; // Clear existing fields
        Definitions.forEach((Field) => {
            const TextField = document.createElement('traveller-text-field');
            TextField.setAttribute('selector', Field.selector);
            TextField.setAttribute('label', Field.label);
            TextField.setAttribute('value', Field.value);
            this.FieldsContainer.appendChild(TextField);
        });
    }
}
window.customElements.define('traveller-frame', TravellerFrame);
export {};
/*
class TravellerFrame extends HTMLElement {
    constructor() {
        super();
        const Shadow = this.attachShadow({ mode: 'open' });

        // Create elements
        const Container = document.createElement('div');
        const Title = document.createElement('div');
        const FieldsContainer = document.createElement('div');
        const Style = document.createElement('style');

        // Set classes and attributes
        Container.className = 'FrameContainer';
        Title.className = 'FrameTitle';
        FieldsContainer.className = 'FieldsContainer';

        // Populate title from attribute
        Title.textContent = this.getAttribute('title') || 'Frame Title';

        // Load styles
        Style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            .FrameContainer {
                width: auto;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                display: inline-flex;
                padding-bottom: 40px;
            }
            .FrameTitle {
                width: 100%;
                text-align: justify ;
                color: #EDE781;
                font-size: 16px;
                font-family: Orbitron;
                font-weight: 700;
                word-wrap: break-word;
                padding-bottom: 0.3rem;
                padding-left: 0rem;
            }
            .FieldsContainer {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1px;
            }
        `;

        // Append elements to shadow DOM
        Shadow.appendChild(Style);
        Shadow.appendChild(Container);
        Container.appendChild(Title);
        Container.appendChild(FieldsContainer);

        // Store a reference for dynamic updates
        this.FieldsContainer = FieldsContainer;
    }

    // Populate fields dynamically
    set Fields(Definitions) {
        this.FieldsContainer.innerHTML = ''; // Clear existing fields
        Definitions.forEach((Field) => {
            const TextField = document.createElement('traveller-text-field');
            TextField.setAttribute('selector', Field.selector);
            TextField.setAttribute('label', Field.label);
            TextField.setAttribute('value', Field.value);
            this.FieldsContainer.appendChild(TextField);
        });
    }
}

window.customElements.define('traveller-frame', TravellerFrame);
*/ 
