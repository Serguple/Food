function tabs(tabsSelector, parentSelector, contentSelector, active) {
    const tabsParent = document.querySelector(parentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(contentSelector);

    function hideContent(element) {
        element.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach(item => {
            item.classList.remove(active);
        });
    }

    function showTabsContent(i) {
        tabContent[i].classList.remove("hide");
        tabContent[i].classList.add("show", "fade");
        tabs[i].classList.add(active);
    }

    hideContent(tabContent);
    showTabsContent(0);

    tabsParent.addEventListener("click", e => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.replace(/\./, ''))) {

            tabs.forEach((item, i) => {
                if (item == target) {
                    hideContent(tabContent);
                    showTabsContent(i);
                }
            })
        }        
    });
}

export default tabs;