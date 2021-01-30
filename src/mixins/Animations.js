export default {
  methods: {
    animateCSS(element, animation, prefix = "animate__") {
      new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd() {
          node.classList.remove(`${prefix}animated`, animationName);
          resolve("Animation ended");
        }

        node.addEventListener("animationend", handleAnimationEnd, {
          once: true
        });
      });
    },

    getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }
  }
}
