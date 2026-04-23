const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const forms = document.querySelectorAll("form");
const seoSections = document.querySelectorAll(".seo-content");
const seoKeywords = [
  "best multispeciality hospital in varanasi for surgery",
  "multispeciality hospital in varanasi with ambulance",
  "multispeciality hospital in varanasi for family care",
  "nabh accredited multispeciality hospital in varanasi",
  "multispeciality hospital in varanasi with icu",
  "24 hour multispeciality hospital in varanasi",
  "emergency multispeciality hospital in varanasi",
  "affordable multispeciality hospital in varanasi",
  "cashless multispeciality hospital in varanasi",
  "multispeciality hospital in varanasi near me",
  "multispeciality hospital in sigra varanasi",
  "multispeciality hospital in lanka varanasi",
  "multispeciality hospital in mahmoorganj varanasi",
  "multispeciality hospital in bhelupur varanasi",
  "multispeciality hospital in cantt varanasi",
  "multispeciality hospital in lahartara varanasi",
  "multispeciality hospital in chitaipur varanasi",
  "multispeciality hospital in shivpur varanasi",
  "best multispeciality hospital in varanasi",
  "top multispeciality hospital in varanasi",
  "private multispeciality hospital in varanasi",
  "super speciality hospital in varanasi",
  "multispeciality hospital in varanasi",
  "multispeciality hospital varanasi",
  "best hospital in varanasi",
  "private hospital in varanasi",
  "top hospital in varanasi",
  "cardiology hospital in varanasi",
  "orthopedic hospital in varanasi",
  "gynecology hospital in varanasi",
  "neurology hospital in varanasi",
  "gastro hospital in varanasi",
  "kidney hospital in varanasi",
  "cancer hospital in varanasi",
  "trauma hospital in varanasi",
  "maternity hospital in varanasi",
  "pediatric hospital in varanasi",
  "hospital in varanasi",
];

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");

    if (!button) {
      return;
    }

    const originalText = button.textContent;
    button.textContent = "Thank you";
    button.setAttribute("disabled", "true");

    window.setTimeout(() => {
      button.textContent = originalText;
      button.removeAttribute("disabled");
      form.reset();
    }, 1800);
  });
});

if (seoSections.length) {
  const keywordPattern = new RegExp(
    `\\b(${seoKeywords
      .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})\\b`,
    "gi"
  );

  seoSections.forEach((seoSection) => {
    const walker = document.createTreeWalker(seoSection, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      if (!keywordPattern.test(node.nodeValue)) {
        keywordPattern.lastIndex = 0;
        return;
      }

      keywordPattern.lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      node.nodeValue.replace(keywordPattern, (match, keyword, offset) => {
        fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));

        const mark = document.createElement("mark");
        mark.className = "seo-keyword";
        mark.textContent = match;
        fragment.append(mark);

        lastIndex = offset + match.length;
        return match;
      });

      fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex)));
      node.parentNode.replaceChild(fragment, node);
    });
  });
}
