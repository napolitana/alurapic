import Vue from "vue";

Vue.directive("transform", {
  bind(el, binding, vnode) {
    let current = 0;
    let incremento = binding.value || 0;
    let efeito;

    el.addEventListener("dblclick", function() {
      if (!binding.arg || binding.arg == "rotate") {
        current += incremento;
        efeito = `rotate(${current}deg)`;
      }

      this.style.transform = efeito;
      if (binding.modifiers.animate) this.style.transition = "transform 0.5s";
    });

    el.addEventListener("mouseover", function() {
      if (binding.arg == "scale") {
        this.style.transform = `scale(${incremento})`;
        this.parentNode.style.overflow = "hidden";
      }

      if (binding.modifiers.animate) this.style.transition = "transform 0.5s";
    });

    el.addEventListener("mouseout", function() {
      if (binding.arg == "scale") {
        this.style.transform = `scale(1)`;
        this.parentNode.style.overflow = "hidden";
      }

      if (binding.modifiers.animate) this.style.transition = "transform 0.5s";
    });
  }
});
