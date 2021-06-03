export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-2xl`;

    // ex v-icon:full
    if (binding.arg === 'full') {
      iconClass = binding.value;
    }

    // ex v-icon.right
    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }

    // ex v-icon.yellow
    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
}
