/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER WIDGET COMPONENT
 * Path: assets/js/newsletter/widget/newsletter.widget.js
 * Architecture: Non-innerHTML DOM Construction (XSS Shield)
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Safe DOM Construction, State Rendering, Accessibility & Events.
 */

export class NewsletterWidget {
    constructor(newsletterService) {
        this._service = newsletterService;
        this._container = null;
        this._formElement = null;
        this._inputElement = null;
        this._submitButtonElement = null;
        this._btnTextElement = null;
        this._btnSpinnerElement = null;
        this._feedbackElement = null;
        this._submitHandler = null;
        this._mounted = false;
    }

    mount(containerSelector) {
        if (this._mounted) return;

        this._container = typeof containerSelector === 'string' 
            ? document.querySelector(containerSelector) 
            : containerSelector;

        if (!this._container) return;

        this._renderSafeDOM();
        this._bindEvents();
        this._mounted = true;
    }

    _renderSafeDOM() {
        // Clear previous content safely
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'tc-newsletter-container';

        this._formElement = document.createElement('form');
        this._formElement.className = 'tc-newsletter-form';
        this._formElement.setAttribute('role', 'form');
        this._formElement.setAttribute('aria-label', 'Berlangganan Newsletter TopCare AI');
        this._formElement.noValidate = true;

        const inputGroup = document.createElement('div');
        inputGroup.className = 'tc-newsletter-input-group';

        this._inputElement = document.createElement('input');
        this._inputElement.type = 'email';
        this._inputElement.className = 'tc-newsletter-input';
        this._inputElement.placeholder = 'Masukkan email Anda';
        this._inputElement.setAttribute('aria-label', 'Alamat Email');
        this._inputElement.required = true;
        this._inputElement.maxLength = 254;
        this._inputElement.autocomplete = 'email';

        this._submitButtonElement = document.createElement('button');
        this._submitButtonElement.type = 'submit';
        this._submitButtonElement.className = 'tc-newsletter-btn';
        this._submitButtonElement.setAttribute('aria-label', 'Kirim Pendaftaran');

        this._btnTextElement = document.createElement('span');
        this._btnTextElement.className = 'tc-newsletter-btn-text';
        this._btnTextElement.textContent = 'Berlangganan';

        this._btnSpinnerElement = document.createElement('span');
        this._btnSpinnerElement.className = 'tc-newsletter-btn-spinner';
        this._btnSpinnerElement.setAttribute('aria-hidden', 'true');
        this._btnSpinnerElement.style.display = 'none';
        this._btnSpinnerElement.textContent = '⌛';

        this._submitButtonElement.appendChild(this._btnTextElement);
        this._submitButtonElement.appendChild(this._btnSpinnerElement);

        inputGroup.appendChild(this._inputElement);
        inputGroup.appendChild(this._submitButtonElement);

        this._feedbackElement = document.createElement('div');
        this._feedbackElement.className = 'tc-newsletter-feedback';
        this._feedbackElement.setAttribute('aria-live', 'polite');
        this._feedbackElement.setAttribute('role', 'status');

        this._formElement.appendChild(inputGroup);
        this._formElement.appendChild(this._feedbackElement);
        wrapper.appendChild(this._formElement);

        this._container.appendChild(wrapper);
    }

    _bindEvents() {
        if (!this._formElement) return;

        this._submitHandler = async (event) => {
            event.preventDefault();
            this._clearFeedback();

            const email = this._inputElement.value;
            this._setLoadingState(true);

            const result = await this._service.subscribe(email);

            this._setLoadingState(false);

            if (result.success) {
                this._showFeedback(result.message, 'success');
                this._inputElement.value = '';
            } else {
                this._showFeedback(result.message, 'error');
            }
        };

        this._formElement.addEventListener('submit', this._submitHandler);
    }

    _setLoadingState(isLoading) {
        if (!this._submitButtonElement || !this._inputElement) return;

        this._submitButtonElement.disabled = isLoading;
        this._inputElement.disabled = isLoading;

        if (isLoading) {
            if (this._btnTextElement) this._btnTextElement.style.display = 'none';
            if (this._btnSpinnerElement) this._btnSpinnerElement.style.display = 'inline-block';
        } else {
            if (this._btnTextElement) this._btnTextElement.style.display = 'inline-block';
            if (this._btnSpinnerElement) this._btnSpinnerElement.style.display = 'none';
        }
    }

    _showFeedback(message, type) {
        if (!this._feedbackElement) return;

        this._feedbackElement.textContent = message;
        this._feedbackElement.className = `tc-newsletter-feedback tc-newsletter-feedback--${type}`;
        this._feedbackElement.style.display = 'block';
    }

    _clearFeedback() {
        if (!this._feedbackElement) return;

        this._feedbackElement.textContent = '';
        this._feedbackElement.className = 'tc-newsletter-feedback';
        this._feedbackElement.style.display = 'none';
    }

    destroy() {
        if (this._formElement && this._submitHandler) {
            this._formElement.removeEventListener('submit', this._submitHandler);
        }

        if (this._container) {
            while (this._container.firstChild) {
                this._container.removeChild(this._container.firstChild);
            }
        }

        this._container = null;
        this._formElement = null;
        this._inputElement = null;
        this._submitButtonElement = null;
        this._btnTextElement = null;
        this._btnSpinnerElement = null;
        this._feedbackElement = null;
        this._submitHandler = null;
        this._mounted = false;
    }
}

export default NewsletterWidget;