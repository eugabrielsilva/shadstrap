document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-toggle="dialog"]').forEach(el => {
        el.addEventListener('click', () => {
            const targetEl = document.querySelector(el.getAttribute('data-target'));
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

    document.querySelectorAll('[data-dismiss="dialog"]').forEach(el => {
        el.addEventListener('click', () => {
            const targetEl = el.closest('.dialog');
            if(targetEl) {
                targetEl.classList.remove('show');
            }
        });
    });
});