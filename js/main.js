

function refreshToIndex() {
  if ( document.refreshForm.visited.value != '') {
    window.location.pathname = 'index.html';
  }
}

function checkRefresh() {
  document.body.addEventListener('onunload', refreshToIndex);
}

checkRefresh();
















