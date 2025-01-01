class TravellerTextField extends HTMLElement
{
    constructor()
    {
        super();
        const ShadowRoot = this.attachShadow({mode: 'closed'});
        const Container = document.createElement('div');
        const LabelDiv = document.createElement('div');
        const LabelText = document.createElement('div');
        const TextBoxDiv =document.createElement('div');
        const TextBoxField =document.createElement('div');
        const TextBoxText =document.createElement('div');
        const Style = document.createElement('link');


        this.InternalLabelDiv =LabelDiv;
        this.InternalTextContent =TextBoxDiv;

        // Add external CSS
        Style.rel = 'stylesheet';
        Style.href = './css/components/InputBox.css'; // Adjust path if necessary
        ShadowRoot.appendChild(Style);

        Container.className ='InputBox';
        LabelDiv.className ='InputBoxLabel';
        LabelText.className ='InputBoxLabelText';
        TextBoxDiv.className ='InputBoxTextBox';
        TextBoxField.className ='InputBoxTextBoxField';
        TextBoxText.className ='InputBoxTextBoxText';

        LabelText.textContent =this.getAttribute('label') || 'Label Text';
        TextBoxText.textContent =this.getAttribute('value') || 'Text Entered';

        TextBoxDiv.style ='width: 100%; height: 26px; padding: 4px; background: #FFFEEB; border-radius: 5px; border: 1px #EDE781 solid; justify-content: flex-start; align-items: center; gap: 4px; display: flex;';
        TextBoxField.style ='height: 19px; justify-content: center; align-items: center; gap: 10px; display: flex;';
        TextBoxText.style ='flex: 1 1 0; height: 19px; color: #7C4C00; font-size: 16px; font-family: Roboto; font-weight: 500; word-wrap: break-word;';

        LabelDiv.appendChild(LabelText);
        TextBoxField.appendChild(TextBoxText);
        TextBoxDiv.appendChild(TextBoxField);
        Container.appendChild(LabelDiv);
        Container.appendChild(TextBoxDiv);

        ShadowRoot.appendChild(Container);

        /*
        Style.onload = () => {
            const computedStyle = window.getComputedStyle(Container);
        
            // Syncing padding, margin, and font properties
            Container.style.padding = computedStyle.padding;
            Container.style.margin = computedStyle.margin;
            Container.style.fontSize = computedStyle.fontSize;
            Container.style.boxSizing = computedStyle.boxSizing;
        
            // Explicitly set dimensions
            Container.style.width = computedStyle.width;
            Container.style.height = computedStyle.height;
        };
        */
    }


    static get observedAttributes() 
    {
        return ['label', 'value'];
    }


    attributeChangedCallback(Name, OldValue, NewValue) 
    {
        if (Name === 'label') 
        {
            this.InternalLabelDiv.querySelector('.InputBoxLabelText').textContent = NewValue;
        } else if (Name === 'value') 
        {
            this.InternalTextContent.querySelector('.InputBoxTextBoxText').textContent = NewValue;
        }
    }

    set Value(NewValue)
    {
        this.valueDiv.querySelector(".InputBoxTextBoxText").textContent = NewValue;
    }

    set Label(NewLabel) 
    {
        this.labelDiv.querySelector(".InputBoxLabelText").textContent = NewLabel;
    }

}


window.customElements.define('traveller-text-field', TravellerTextField);