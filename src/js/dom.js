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
});