document.addEventListener('DOMContentLoaded', () => {
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
                });
                targetEl.appendChild(backdrop);
                targetEl.classList.add('show');
            }
        });
    });

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