// Global methods
window.shadstrap = {

    // Open dialog
    showDialog(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        const backdrop = document.createElement('div');
        backdrop.className = 'dialog-backdrop';
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            targetEl.classList.remove('show');
            setTimeout(() => {
                backdrop.remove();
            }, 500);
            document.body.classList.remove('no-scroll');
        });
        targetEl.appendChild(backdrop);
        targetEl.classList.add('show');
        document.body.classList.add('no-scroll');
    },

    // Close dialog
    closeDialog(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        targetEl.classList.remove('show');
        const backdrop = targetEl.querySelector('.dialog-backdrop');
        if(backdrop) {
            setTimeout(() => {
                backdrop.remove();
            }, 500);
        }
        document.body.classList.remove('no-scroll');
    },

    // Open sheet
    openSheet(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        const backdrop = document.createElement('div');
        backdrop.className = 'sheet-backdrop';
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            targetEl.classList.remove('show');
            setTimeout(() => {
                backdrop.remove();
            }, 500);
            document.body.classList.remove('no-scroll');
        });
        targetEl.appendChild(backdrop);
        targetEl.classList.add('show');
        document.body.classList.add('no-scroll');
    },

    // Close sheet
    closeSheet(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        targetEl.classList.remove('show');
        const backdrop = targetEl.querySelector('.sheet-backdrop');
        if(backdrop) {
            setTimeout(() => {
                backdrop.remove();
            }, 500);
        }
        document.body.classList.remove('no-scroll');
    }

}