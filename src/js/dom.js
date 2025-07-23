// DOM Listeners
document.addEventListener('DOMContentLoaded', () => {

    // Dialog trigger buttons
    document.querySelectorAll('[data-ss-dialog]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-dialog');
            if(selector) {
                window.shadstrap.showDialog(selector);
            }
        });
    });

    // Dialog close buttons
    document.querySelectorAll('[data-ss-dismiss="dialog"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = el.closest('.dialog');
            if(targetEl) {
                window.shadstrap.closeDialog(null, targetEl);
            }
        });
    });

    // Accordion triggers
    document.querySelectorAll('[data-ss-accordion]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-accordion'));
            if(targetEl) {
                targetEl.classList.toggle('show');
                el.classList.toggle('open');
            }
        });
    });

    // Sheet trigger buttons
    document.querySelectorAll('[data-ss-sheet]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-sheet');
            if(selector) {
                window.shadstrap.openSheet(selector);
            }
        });
    });

    // Sheet close buttons
    document.querySelectorAll('[data-ss-dismiss="sheet"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = el.closest('.sheet');
            if(targetEl) {
                window.shadstrap.closeSheet(null, targetEl);
            }
        });
    });

    // Tab toggler buttons
    document.querySelectorAll('[data-ss-tab]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-tab'));
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
            }
        });
    });

    // Dropdown triggers
    document.querySelectorAll('[data-ss-dropdown]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-dropdown'));
            if(targetEl) {
                if(!targetEl.classList.contains('show')) {
                    window.shadstrap.closeDropdowns();
                }
                targetEl.classList.toggle('show');
            }
        })
    });

    // Close dropdowns by clicking outside
    document.addEventListener('click', e => {
        const isDropdown = e.target.closest('.dropdown');
        const isToggle = e.target.closest('[data-ss-dropdown]');
        if(!isDropdown && !isToggle) {
            window.shadstrap.closeDropdowns();
        }
    });

    // Copy code buttons
    document.querySelectorAll('[data-ss-copy]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-copy'));
            if(targetEl) {
                navigator.clipboard.writeText(targetEl.innerHTML);
                el.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    el.innerHTML = '<i class="far fa-clipboard"></i>';
                }, 2000);
            }
        });
    });

    // Slider ranges
    document.querySelectorAll('.form input[type="range"]').forEach(el => {
        el.addEventListener('input', () => {
            const min = parseFloat(el.min || 0);
            const max = parseFloat(el.max || 100);
            const value = parseFloat(el.value);
            const percent = (max === min) ? 0 : ((value - min) / (max - min)) * 100;
            el.style.setProperty('--slider-value', `${percent}%`);
        });
    });

    // Tooltips
    document.querySelectorAll('[data-ss-tooltip]').forEach(el => {
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

    // Drawer trigger buttons
    document.querySelectorAll('[data-ss-drawer]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-drawer');
            if(selector) {
                window.shadstrap.openDrawer(selector);
            }
        });
    });

    // Drawer close buttons
    document.querySelectorAll('[data-ss-dismiss="drawer"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = el.closest('.drawer');
            if(targetEl) {
                window.shadstrap.closeDrawer(null, targetEl);
            }
        });
    });

    // Drawer drag events
    document.querySelectorAll('.drawer').forEach(el => {
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

    // Sidebar backdrops
    document.querySelectorAll('.sidebar-wrapper').forEach(el => {
        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.addEventListener('click', e => {
            e.preventDefault();
            window.shadstrap.toggleSidebar(null, el);
        });
        el.appendChild(backdrop);
    });

    // Sidebar togglers
    document.querySelectorAll('[data-ss-sidebar]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-sidebar');
            if(selector) {
                window.shadstrap.toggleSidebar(selector);
            }
        });
    });
});