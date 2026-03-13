// Global methods
window.shadstrap = {

    // Initialize dialogs
    initDialogs() {
        document.querySelectorAll('[data-ss-dialog]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-dialog');

                if(selector) {
                    window.shadstrap.showDialog(selector);
                }
            });
        });

        // Close dialog buttons
        document.querySelectorAll('[data-ss-dismiss="dialog"]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const targetEl = el.closest('.dialog');

                if(targetEl) {
                    window.shadstrap.closeDialog(null, targetEl);
                }
            });
        });
    },

    // Initialize accordions
    initAccordions() {
        document.querySelectorAll('[data-ss-accordion]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-accordion');
                const targetEl = document.querySelector(selector);

                if(targetEl) {
                    targetEl.classList.toggle('show');
                    el.classList.toggle('open');
                    targetEl.dispatchEvent(new CustomEvent('ss.accordion.toggle'));
                }
            });
        });
    },

    // Initialize sheets
    initSheets() {
        document.querySelectorAll('[data-ss-sheet]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-sheet');

                if(selector) {
                    window.shadstrap.openSheet(selector);
                }
            });
        });

        // Close sheet buttons
        document.querySelectorAll('[data-ss-dismiss="sheet"]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const targetEl = el.closest('.sheet');

                if(targetEl) {
                    window.shadstrap.closeSheet(null, targetEl);
                }
            });
        });
    },

    // Initialize dropdowns
    initDropdowns() {
        document.querySelectorAll('[data-ss-dropdown]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            const selector = el.getAttribute('data-ss-dropdown');
            const targetEl = document.querySelector(selector);

            if(targetEl) {
                targetEl.triggerEl = el;

                el.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(targetEl.classList.contains('show')) {
                        targetEl.classList.remove('show');
                        return;
                    }

                    window.shadstrap.closeDropdowns();
                    window.shadstrap.showDropdown(null, targetEl);
                });
            }
        });
    },

    // Initialize tabs
    initTabs() {
        document.querySelectorAll('[data-ss-tab]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-tab');
                const targetEl = document.querySelector(selector);

                if(targetEl) {
                    const parentEl = el.closest('.tabs');

                    if(parentEl) {
                        parentEl.querySelectorAll('.tab-content').forEach(tab => {
                            tab.classList.remove('show');
                        });

                        parentEl.querySelectorAll('.tab-trigger button').forEach(btn => {
                            btn.classList.remove('active');
                        });
                    }

                    el.classList.add('active');
                    targetEl.classList.add('show');
                    targetEl.dispatchEvent(new CustomEvent('ss.tab.show'));
                }
            });
        });
    },

    // Initialize copy buttons
    initCopyButtons() {
        document.querySelectorAll('[data-ss-copy]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-copy');
                const targetEl = document.querySelector(selector);

                if(targetEl) {
                    const originalHtml = el.innerHTML;

                    navigator.clipboard.writeText(targetEl.innerHTML);

                    el.innerHTML = '<i class="fas fa-check"></i>';

                    setTimeout(() => {
                        el.innerHTML = originalHtml;
                    }, 2000);
                }
            });
        });
    },

    // Initialize ranges
    initRanges() {
        document.querySelectorAll('.form input[type="range"]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('input', () => {
                const min = parseFloat(el.min || 0);
                const max = parseFloat(el.max || 100);
                const value = parseFloat(el.value);
                const percent = (max === min) ? 0 : ((value - min) / (max - min)) * 100;
                el.style.setProperty('--slider-value', `${percent}%`);
            });
        });
    },

    // Initialize tooltips
    initTooltips() {
        document.querySelectorAll('[data-ss-tooltip]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            const placement = el.getAttribute('data-ss-placement') || 'top';

            const tooltip = document.createElement('div');

            tooltip.className = `tooltip tooltip-${placement}`;
            tooltip.innerText = el.getAttribute('data-ss-tooltip');

            el.appendChild(tooltip);

            el.addEventListener('mouseover', () => {
                tooltip.classList.add('show');
            });

            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    },

    // Initialize drawers
    initDrawers() {
        document.querySelectorAll('[data-ss-drawer]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-drawer');

                if(selector) {
                    window.shadstrap.openDrawer(selector);
                }
            });
        });

        // Drawer close buttons
        document.querySelectorAll('[data-ss-dismiss="drawer"]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                const targetEl = el.closest('.drawer');

                if(targetEl) {
                    window.shadstrap.closeDrawer(null, targetEl);
                }
            });
        });

        // Drawer drag events
        document.querySelectorAll('.drawer:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            const drawerContent = el.querySelector('.drawer-content');

            if(drawerContent) {
                let startY = 0;
                let currentY = 0;
                let dragging = false;

                const onTouchStart = (e) => {
                    dragging = true;
                    drawerContent.classList.add('dragging');
                    startY = e.touches ? e.touches[0].clientY : e.clientY;
                };

                const onTouchMove = (e) => {
                    if(!dragging) return;

                    currentY = e.touches ? e.touches[0].clientY : e.clientY;

                    let deltaY = currentY - startY;

                    if(deltaY < 0) {
                        const resistance = Math.abs(deltaY) / 300;
                        deltaY = -Math.pow(resistance, 0.8) * 60;
                    }

                    drawerContent.style.setProperty('--drag-translate', `${deltaY}px`);
                };

                const onTouchEnd = () => {
                    if(!dragging) return;

                    const deltaY = currentY - startY;

                    dragging = false;

                    if(deltaY > 100) {
                        window.shadstrap.closeDrawer(null, el);
                    }

                    drawerContent.classList.remove('dragging');
                    drawerContent.style.setProperty('--drag-translate', `0px`);
                };

                drawerContent.addEventListener('mousedown', onTouchStart);
                drawerContent.addEventListener('mousemove', onTouchMove);
                drawerContent.addEventListener('mouseup', onTouchEnd);
                drawerContent.addEventListener('mouseleave', onTouchEnd);
                drawerContent.addEventListener('touchstart', onTouchStart);
                drawerContent.addEventListener('touchmove', onTouchMove);
                drawerContent.addEventListener('touchend', onTouchEnd);
            }
        });
    },

    // Initialize sidebars
    initSidebars() {
        document.querySelectorAll('[data-ss-sidebar]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', e => {
                e.preventDefault();

                const selector = el.getAttribute('data-ss-sidebar');

                if(selector) {
                    window.shadstrap.toggleSidebar(selector);
                }
            });
        });

        // Sidebar backdrops
        document.querySelectorAll('.sidebar-wrapper:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            const backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';

            backdrop.addEventListener('click', e => {
                e.preventDefault();
                window.shadstrap.toggleSidebar(null, el);
            });

            el.appendChild(backdrop);
        });
    },

    // Initialize toasts
    initToasts() {
        document.querySelectorAll('[data-ss-toast]:not(.ss-init)').forEach(el => {
            el.classList.add('ss-init');

            el.addEventListener('click', e => {
                e.preventDefault();

                const text = el.getAttribute('data-ss-toast');
                const type = el.getAttribute('data-ss-type') || 'default';
                const timeout = el.getAttribute('data-ss-timeout') || 3000;
                const dismiss = el.hasAttribute('data-ss-dismiss');

                window.shadstrap.showToast(text, type, timeout, dismiss);
            });
        });
    },

    // Show toast
    showToast(text, type = 'default', timeout = 3000, dismiss = false) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let html = '';

        if(type === 'error') {
            html += '<i class="fas fa-circle-xmark"></i>';
        } else if(type === 'success') {
            html += '<i class="fas fa-check-circle"></i>';
        }

        html += `<span class="toast-text">${text}</span>`;

        if(dismiss) {
            html += '<button type="button" class="toast-close"><i class="fa fa-times"></i></button>';
        }

        toast.innerHTML = html;

        document.body.appendChild(toast);

        if(dismiss) {
            toast.querySelector('.toast-close').addEventListener('click', e => {
                e.preventDefault();
                toast.classList.remove('show');

                setTimeout(() => {
                    toast.remove();
                }, 1000);
            });
        }

        setTimeout(() => {
            toast.classList.add('show');

            if(timeout > 0) {
                setTimeout(() => {
                    toast.classList.remove('show');

                    setTimeout(() => {
                        toast.remove();
                    }, 1000);
                }, timeout);
            }
        }, 0);
    },

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
        const dropdownRect = targetEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if(targetEl.classList.contains('top')) {
            targetEl.style.bottom = `${viewportHeight - triggerRect.top}px`;
            targetEl.style.left = `${triggerRect.left}px`;

            if(triggerRect.left + dropdownRect.width > viewportWidth) {
                targetEl.style.left = '';
                targetEl.style.right = `${viewportWidth - triggerRect.right}px`;
            }
        } else if(targetEl.classList.contains('right')) {
            targetEl.style.top = `${triggerRect.bottom}px`;
            targetEl.style.right = `${viewportWidth - triggerRect.right}px`;

            if(viewportWidth - triggerRect.right + dropdownRect.width > viewportWidth) {
                targetEl.style.right = '';
                targetEl.style.left = `${triggerRect.left}px`;
            }
        } else {
            targetEl.style.top = `${triggerRect.bottom}px`;
            targetEl.style.left = `${triggerRect.left}px`;

            if(triggerRect.left + dropdownRect.width > viewportWidth) {
                targetEl.style.left = '';
                targetEl.style.right = `${viewportWidth - triggerRect.right}px`;
            }
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