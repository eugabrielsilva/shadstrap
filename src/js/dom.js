// DOM Listeners
document.addEventListener('DOMContentLoaded', () => {

    // Dialog trigger buttons
    document.querySelectorAll('[data-ss-toggle="dialog"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-target');
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
    document.querySelectorAll('[data-ss-toggle="accordion"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
            if(targetEl) {
                targetEl.classList.toggle('show');
                el.classList.toggle('open');
            }
        });
    });

    // Sheet trigger buttons
    document.querySelectorAll('[data-ss-toggle="sheet"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const selector = el.getAttribute('data-ss-target');
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
    document.querySelectorAll('[data-ss-toggle="tab"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
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
    document.querySelectorAll('[data-ss-toggle="dropdown"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
            if(targetEl) {
                targetEl.classList.toggle('show');
            }
        })
    });
});