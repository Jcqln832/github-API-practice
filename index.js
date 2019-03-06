'use strict';

function displayResults(responseJson){
  console.log(responseJson);
  // if there are previous results, remove them
  $('li').remove();
    responseJson.forEach(function(item){
       $('#results-list').append(
      `<li>
        <h3>${item.name}</h3>
        <p><a href="${item.url}">${item.url}</a></p>
      </li>`
       )
    });
}

function queryGithub(query) {
  const url = `https://api.github.com/users/${query}/repos`;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#js-error-message').empty();
    const userName = $('#js-search-term').val();
    queryGithub(userName);
  });
}

$(watchForm);