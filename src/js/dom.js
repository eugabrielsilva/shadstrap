// DOM Listeners
document.addEventListener('DOMContentLoaded', () => {

    // Initialize dialogs
    window.shadstrap.initDialogs();

    // Initialize accordions
    window.shadstrap.initAccordions();

    // Initialize sheets
    window.shadstrap.initSheets();

    // Initialize dropdowns
    window.shadstrap.initDropdowns();

    // Initialize tabs
    window.shadstrap.initTabs();

    // Initialize copy buttons
    window.shadstrap.initCopyButtons();

    // Initialize ranges
    window.shadstrap.initRanges();

    // Initialize tooltips
    window.shadstrap.initTooltips();

    // Initialize drawers
    window.shadstrap.initDrawers();

    // Initialize sidebars
    window.shadstrap.initSidebars();

    // Close elements on Escape key
    window.addEventListener('keydown', (event) => {
        if(event.key !== 'Escape') return;

        document.querySelectorAll('.dialog.show:not(.dialog-alert)').forEach(el => {
            window.shadstrap.closeDialog(null, el);
        });

        document.querySelectorAll('.drawer.show').forEach(el => {
            window.shadstrap.closeDrawer(null, el);
        });

        document.querySelectorAll('.sheet.show').forEach(el => {
            window.shadstrap.closeSheet(null, el);
        });

        window.shadstrap.closeDropdowns();
    });

    // Reposition fixed elements on scroll
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            window.shadstrap.showDropdown(null, menu);
        });
    }, true);

    // Reposition fixed elements on screen resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            window.shadstrap.showDropdown(null, menu);
        });
    }, true);

    // Close dropdowns on clicking outside
    document.addEventListener('click', e => {
        if(!e.target.closest('.dropdown')) {
            window.shadstrap.closeDropdowns();
        }
    });
});