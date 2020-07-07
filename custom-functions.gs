/**
 * Returns specific metrics (CLS, FID or LCP) for an URL with the Chrome UX Report API
 *
 * @param {string} url The URL to test.
 * @param {string} metric The metric to return : "CLS", "FID" or "LCP".
 * @return The CLS, FID or LCP of the tested URL.
 * @customfunction
 */
function chromeUxReport(url, metric) {

  // Your API key
  var key = 'xxxXXXxxx';
  
  var data = {
    'origin' : url
  };
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };

  var url = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=' + key;

  var response = UrlFetchApp.fetch(url, options);
  
  var json = JSON.parse(response);
  
  if (metric == 'cls') {
    return Number(json.record.metrics.cumulative_layout_shift.percentiles['p75']);
  }
  
  else if (metric == 'fid') {
    return json.record.metrics.first_input_delay.percentiles['p75'];
  }
  
  else if (metric == 'lcp') {
    return json.record.metrics.largest_contentful_paint.percentiles['p75'];
  }
  else {
    return 'Something went wrong...';
  }
  
}
