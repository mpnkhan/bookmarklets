(()=>{

const ariaAttrs = [
  /* ---- Global ---- */
  'aria-atomic',
  'aria-busy',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-description',
  'aria-details',
  'aria-disabled',
  'aria-dropeffect',        // deprecated but included
  'aria-errormessage',
  'aria-flowto',
  'aria-grabbed',           // deprecated but included
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-live',
  'aria-owns',
  'aria-relevant',
  'aria-roledescription',

  /* ---- Widget ---- */
  'aria-autocomplete',
  'aria-checked',
  'aria-expanded',
  'aria-level',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-placeholder',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-selected',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',

  /* ---- Relationships ---- */
  'aria-activedescendant',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-posinset',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-setsize',

  /* ---- Accessibility API (newer) ---- */
  'aria-braillelabel',
  'aria-brailleroledescription',

  /* ---- Role ---- */
  'role'
];

  /* ---- toggle off ---- */
  const existing = document.querySelectorAll('.closeSpan');
  if (existing.length) {
    existing.forEach(e => e.remove());
    document.querySelectorAll('.ariaOutline')
      .forEach(e => e.classList.remove('ariaOutline'));
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    .ariaOutline { outline: 2px solid orange; padding: 2px; }
  `;
  document.head.appendChild(style);

  const selector = ariaAttrs.map(a => `[${a}]`).join(',');

  document.querySelectorAll(selector).forEach(el => {

    /* exclude inputs */
    if (
      el.matches('input[type="hidden"], input[type="button"], input[type="submit"], input[type="reset"]')
    ) {
      return;
    }

    el.classList.add('ariaOutline');

    ariaAttrs.forEach(attr => {
      if (el.hasAttribute(attr)) {
        el.insertAdjacentHTML(
          'afterend',
          '<span class="closeSpan" ' +
          'style="color:black;font-weight:bold;font-family:sans-serif;font-size:small;' +
          'background-color:yellow;margin:0 2px;padding:2px;speak:literal-punctuation;">' +
          attr + '="' + el.getAttribute(attr) + '"' +
          '</span>'
        );
      }
    });
  });
    
})();