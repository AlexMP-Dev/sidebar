document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.toggle-button');
    const collapsibles = document.querySelectorAll('.collapsible');
    const content = document.querySelector('.content');
    const mobileToggle = document.querySelector('.mobile-toggle-button');
    const desktopToggle = document.querySelector('.desktop-toggle');

    if(toggleButton != null) {
        toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('closed');
        content.style.marginLeft = sidebar.classList.contains('closed') ? '60px' : '250px';
    });
    }
    
    mobileToggle.addEventListener('click', function() {
        document.querySelector('.overlay').classList.toggle('active');
        sidebar.style.width = '250px';
    });

    desktopToggle.addEventListener('click', function() {
        if (sidebar.classList.contains('closed')) {
            sidebar.classList.remove('closed')
        }else{
            sidebar.classList.add('closed')
        }
    });

    document.querySelector('.overlay').addEventListener('click', function() {
        this.classList.remove('active');
        sidebar.removeAttribute('style');
    });

    /*sidebar.addEventListener('mouseenter', function() {
        if (sidebar.classList.contains('closed')) {
            sidebar.classList.add('hover');
            setTimeout(() => {
                sidebar.classList.add('content-visible');
            }, 100);
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        sidebar.classList.remove('hover', 'content-visible');
    });*/

    collapsibles.forEach(collapsible => {
        const trigger = collapsible.querySelector('.collapsible-trigger');
        const content = collapsible.querySelector('.collapsible-content');
        
        trigger.addEventListener('click', function() {
            if (!sidebar.classList.contains('closed') || sidebar.classList.contains('hover')) {
                collapsibles.forEach(otherCollapsible => {
                    if (otherCollapsible !== collapsible && otherCollapsible.classList.contains('open')) {
                        otherCollapsible.classList.remove('open');
                        otherCollapsible.querySelector('.collapsible-content').style.maxHeight = '0px';
                    }
                });
                
                collapsible.classList.toggle('open');
                
                if (collapsible.classList.contains('open')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = '0px';
                }
            }
        });
    });

    function handleResize() {
        const screenWidth = window.innerWidth;
    
        if (screenWidth <= 450) {
            console.log("Estás en un dispositivo móvil");
            sidebar.classList.remove('closed');
        } else {
            console.log("Estás en un dispositivo de escritorio");
            
        }
    }
    
    // Escuchar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);
    
    // Llamar a la función inicialmente para verificar el ancho de la pantalla al cargar la página
    handleResize();
});