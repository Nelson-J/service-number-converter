document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const serviceNumberInput = document.getElementById('service-number');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const helpBtn = document.getElementById('help-btn');
    const helpTooltip = document.getElementById('help-tooltip');
    const errorMessage = document.getElementById('error-message');
    const resultSection = document.getElementById('result-section');
    const convertedNumber = document.getElementById('converted-number');

    // Constants for validation
    const PATTERNS = {
        DIGIT_FIRST: /^(\d{6})-([A-Z])$/,
        LETTER_FIRST: /^([A-Z])-(\d{6})$/,
        DIGIT_FIRST_NO_HYPHEN: /^(\d{6})([A-Z])$/,
        LETTER_FIRST_NO_HYPHEN: /^([A-Z])(\d{6})$/
    };

    /**
     * Formats a service number with spaces
     * @param {string} prefix - The prefix (0 or 1)
     * @param {string} digits - The 6 digits
     * @param {string} letter - The letter
     * @returns {string} - Formatted service number
     */
    function formatServiceNumber(prefix, digits, letter) {
        return `${prefix}${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}${letter}`;
    }

    /**
     * Validates and converts a service number
     * @param {string} input - The input service number
     * @returns {string|null} - Converted service number or null if invalid
     */
    function convertServiceNumber(input) {
        // Remove any spaces from input
        const value = input.replace(/\s/g, '');
        
        let match;
        
        // Try each pattern
        if ((match = value.match(PATTERNS.DIGIT_FIRST)) || 
            (match = value.match(PATTERNS.DIGIT_FIRST_NO_HYPHEN))) {
            // Case: Digits followed by letter (764210-U or 764210U)
            const [, digits, letter] = match;
            return formatServiceNumber('0', digits, letter);
            
        } else if ((match = value.match(PATTERNS.LETTER_FIRST)) || 
                   (match = value.match(PATTERNS.LETTER_FIRST_NO_HYPHEN))) {
            // Case: Letter followed by digits (U-764210 or U764210)
            const [, letter, digits] = match;
            return formatServiceNumber('1', digits, letter);
        }
        
        return null;
    }

    /**
     * Shows an error message
     */
    function showError() {
        errorMessage.classList.remove('hidden');
        resultSection.classList.add('hidden');
    }

    /**
     * Shows the conversion result
     * @param {string} result - The converted service number
     */
    function showResult(result) {
        convertedNumber.textContent = result;
        errorMessage.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    /**
     * Clears all input and output
     */
    function clearAll() {
        serviceNumberInput.value = '';
        errorMessage.classList.add('hidden');
        resultSection.classList.add('hidden');
        serviceNumberInput.focus();
    }

    // Event Listeners
    convertBtn.addEventListener('click', function() {
        const input = serviceNumberInput.value.trim();
        
        if (!input) {
            showError();
            return;
        }

        const result = convertServiceNumber(input);
        
        if (result) {
            showResult(result);
        } else {
            showError();
        }
    });

    clearBtn.addEventListener('click', clearAll);

    serviceNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertBtn.click();
        }
    });

    // Help tooltip functionality
    helpBtn.addEventListener('mouseenter', () => {
        helpTooltip.classList.remove('hidden');
    });

    helpBtn.addEventListener('mouseleave', () => {
        helpTooltip.classList.add('hidden');
    });

    // Input validation while typing (optional)
    serviceNumberInput.addEventListener('input', function() {
        if (errorMessage.classList.contains('hidden') === false) {
            errorMessage.classList.add('hidden');
        }
        if (resultSection.classList.contains('hidden') === false) {
            resultSection.classList.add('hidden');
        }
    });
});