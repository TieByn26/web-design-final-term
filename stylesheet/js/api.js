"use strict";

const api_key = "74b3b3e26fcceab5fa4c276cef35f0bc";
const imageBaseURL = "http://image.tmdb.org/t/p/";

/*
 Fetch data from a server using the url and passes
 The result in JSON data to a 'callback" function,
 along with an optional parameter if has 'optionalParam"
*/

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseURL, api_key, fetchDataFromServer };
