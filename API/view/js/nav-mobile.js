document.addEventListener("DOMContentLoaded", () => {
    const tabletBreakpoint = window.matchMedia("(max-width: 1024px)");

    document.querySelectorAll("header").forEach((header, index) => {
        const nav = header.querySelector("nav");
        if (!nav) {
            return;
        }

        const navId = nav.id || `site-nav-${index + 1}`;
        nav.id = navId;

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "menu-toggle";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", navId);
        toggle.setAttribute("aria-label", "Abrir menu de navegação");
        toggle.innerHTML = `
            <span class="menu-toggle-linha"></span>
            <span class="menu-toggle-linha"></span>
            <span class="menu-toggle-linha"></span>
        `;

        const closeMenu = () => {
            header.classList.remove("nav-aberta");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menu de navegação");
        };

        const openMenu = () => {
            header.classList.add("nav-aberta");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Fechar menu de navegação");
        };

        toggle.addEventListener("click", () => {
            if (header.classList.contains("nav-aberta")) {
                closeMenu();
                return;
            }

            openMenu();
        });

        nav.querySelectorAll("a, button").forEach((item) => {
            item.addEventListener("click", () => {
                if (tabletBreakpoint.matches) {
                    closeMenu();
                }
            });
        });

        tabletBreakpoint.addEventListener("change", (event) => {
            if (!event.matches) {
                closeMenu();
            }
        });

        header.insertBefore(toggle, nav);
    });
});
