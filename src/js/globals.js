// Global methods
window.shadstrap = {

    // Show dropdown
    showDropdown(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);
        if(!targetEl.triggerEl) throw new Error(`${selector} element trigger was not found`);

        targetEl.style.top = '';
        targetEl.style.bottom = '';
        targetEl.style.left = '';
        targetEl.style.right = '';
        targetEl.classList.add('show');

        const triggerRect = targetEl.triggerEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if(targetEl.classList.contains('top')) {
            targetEl.style.bottom = `${viewportHeight - triggerRect.top}px`;
            targetEl.style.left = `${triggerRect.left}px`;
        } else if(targetEl.classList.contains('right')) {
            targetEl.style.top = `${triggerRect.bottom}px`;
            targetEl.style.right = `${viewportWidth - triggerRect.right}px`;
        } else {
            targetEl.style.top = `${triggerRect.bottom}px`;
            targetEl.style.left = `${triggerRect.left}px`;
        }

        targetEl.dispatchEvent(new CustomEvent('ss.dropdown.show'));
    },

    // Close all dropdowns
    closeDropdowns() {
        document.querySelectorAll('.dropdown .dropdown-menu.show').forEach(el => {
            el.classList.remove('show');
            el.dispatchEvent(new CustomEvent('ss.dropdown.close'));
        });
    },

    // Open dialog
    showDialog(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        const backdrop = document.createElement('div');
        backdrop.className = 'dialog-backdrop';
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            window.shadstrap.closeDialog(null, targetEl);
        });
        targetEl.appendChild(backdrop);
        targetEl.classList.add('show');
        document.body.classList.add('no-scroll');
        targetEl.dispatchEvent(new CustomEvent('ss.dialog.show'));
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
        targetEl.dispatchEvent(new CustomEvent('ss.dialog.close'));
    },

    // Open sheet
    openSheet(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        const backdrop = document.createElement('div');
        backdrop.className = 'sheet-backdrop';
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            window.shadstrap.closeSheet(null, targetEl);
        });
        targetEl.appendChild(backdrop);
        targetEl.classList.add('show');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            backdrop.classList.add('show');
        }, 0);
        targetEl.dispatchEvent(new CustomEvent('ss.sheet.open'));
    },

    // Close sheet
    closeSheet(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        targetEl.classList.remove('show');
        const backdrop = targetEl.querySelector('.sheet-backdrop');
        if(backdrop) {
            backdrop.classList.remove('show');
            setTimeout(() => {
                backdrop.remove();
            }, 250);
        }
        document.body.classList.remove('no-scroll');
        targetEl.dispatchEvent(new CustomEvent('ss.sheet.close'));
    },

    // Open drawer
    openDrawer(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        const backdrop = document.createElement('div');
        backdrop.className = 'drawer-backdrop';
        backdrop.addEventListener('click', (e) => {
            e.preventDefault();
            window.shadstrap.closeDrawer(null, targetEl);
        });
        targetEl.appendChild(backdrop);
        targetEl.classList.add('show');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            backdrop.classList.add('show');
        }, 0);
        targetEl.dispatchEvent(new CustomEvent('ss.drawer.open'));
    },

    // Close drawer
    closeDrawer(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);

        targetEl.classList.remove('show');
        const backdrop = targetEl.querySelector('.drawer-backdrop');
        if(backdrop) {
            backdrop.classList.remove('show');
            setTimeout(() => {
                backdrop.remove();
            }, 250);
        }
        document.body.classList.remove('no-scroll');
        targetEl.dispatchEvent(new CustomEvent('ss.drawer.close'));
    },

    // Toggle sidebar
    toggleSidebar(selector, targetEl = null) {
        if(!targetEl && selector) targetEl = document.querySelector(selector);
        if(!targetEl) throw new Error(`${selector} element was not found`);
        targetEl.classList.toggle('show');
        targetEl.dispatchEvent(new CustomEvent('ss.sidebar.toggle'));
    },
}