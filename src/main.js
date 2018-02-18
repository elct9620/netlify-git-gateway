/* eslint-disable no-console */

import NetlifyIdentity from 'netlify-identity-widget';

function init() {
  NetlifyIdentity.init({
    container: '#netlify-modal',
  });

  document
    .getElementById('login')
    .addEventListener('click', () => { NetlifyIdentity.open(); });
}

document.addEventListener('DOMContentLoaded', init);
