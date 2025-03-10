document.addEventListener('DOMContentLoaded', () => {

    // Dialog trigger buttons
    document.querySelectorAll('[data-ss-toggle="dialog"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
            if(targetEl) {
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
            }
        });
    });

    // Dialog close buttons
    document.querySelectorAll('[data-ss-dismiss="dialog"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = el.closest('.dialog');
            if(targetEl) {
                targetEl.classList.remove('show');
                const backdrop = targetEl.querySelector('.dialog-backdrop');
                if(backdrop) {
                    setTimeout(() => {
                        backdrop.remove();
                    }, 500);
                }
                document.body.classList.remove('no-scroll');
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
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
            if(targetEl) {
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
            }
        });
    });

    // Sheet close buttons
    document.querySelectorAll('[data-ss-dismiss="sheet"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = el.closest('.sheet');
            if(targetEl) {
                targetEl.classList.remove('show');
                const backdrop = targetEl.querySelector('.sheet-backdrop');
                if(backdrop) {
                    setTimeout(() => {
                        backdrop.remove();
                    }, 500);
                }
                document.body.classList.remove('no-scroll');
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
});