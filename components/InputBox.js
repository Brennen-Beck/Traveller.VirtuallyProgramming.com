class TravellerTextField extends HTMLElement
{
    constructor()
    {
        super();
        const ShadowRoot = this.attachShadow({mode: 'open'});
        const Container = document.createElement('div');
        const LabelDiv = document.createElement('div');
        const LabelText = document.createElement('div');
        const TextBoxDiv =document.createElement('div');
        const TextBoxField =document.createElement('div');
        const TextBoxText =document.createElement('div');
        const Style = document.createElement('style');


        this.InternalLabelDiv =LabelDiv;
        this.InternalTextContent =TextBoxDiv;

        // Load external CSS as a string
        Style.textContent = `
            :host {
                display: block;
                width: 100%;
                height: auto;
            }
            .InputBox {
                width: auto; 
                height: 100%; 
                align-items: center; 
                display: flex;
            }
            .InputBoxLabel {
                height: 40px;
                width: 100%; 
                padding-top: 0px;
                padding-left: 10px; 
                padding-right: 10px; 
                justify-content: flex-end; 
                align-items: center; 
                vertical-align: middle;
                gap: 10px; 
                display: flex
            }
            .InputBoxLabelText {
                text-align: right;
                color: #EDE781;
                font-size: 16px;
                font-family: Roboto;
                font-weight: 500;
                word-wrap: break-word;
            }
            .InputBoxTextBox {
                width: 100%;
                height: 36px;
                padding: 4px;
                background: #FFFEEB;
                border-radius: 5px;
                border: 1px #EDE781 solid;
                justify-content: flex-start;
                align-items: center;
                gap: 4px;
                display: flex;
            }
            .InputBoxTextBoxField {
                width: 300px;    
                height: 19px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                display: flex;
            }
            .InputBoxTextBoxText {
                flex: 1 1 0;
                height: 19px;
                color: #7C4C00;
                font-size: 16px;
                font-family: Roboto;
                font-weight: 500;
                word-wrap: break-word;
            }
        `;


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

        ShadowRoot.appendChild(Style);
        ShadowRoot.appendChild(Container);
    }


    static get observedAttributes() 
    {
        return ['selector', 'label', 'value'];
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