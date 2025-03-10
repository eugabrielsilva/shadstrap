document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-ss-toggle="dialog"]').forEach(el => {
        el.addEventListener('click', () => {
            const targetEl = document.querySelector(el.getAttribute('data-ss-target'));
            if(targetEl) {
                targetEl.classList.add('show');
            }
        });
    });

    document.querySelectorAll('.dialog-backdrop').forEach(el => {
        el.addEventListener('click', () => {
            const targetEl = el.closest('.dialog');
            if(targetEl) {
                targetEl.classList.remove('show');
            }
        });
    });

    document.querySelectorAll('[data-ss-dismiss="dialog"]').forEach(el => {
        el.addEventListener('click', () => {
            const targetEl = el.closest('.dialog');
            if(targetEl) {
                targetEl.classList.remove('show');
            }
        });
    });

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
});