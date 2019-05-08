export default function downloadFile(url, name, accessToken) {
  const filename = name || url.substring(url.lastIndexOf('/') + 1).split('?')[0]

  return new Promise(function(resolve, reject) {
    // Get file name from url.
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function() {
      resolve(xhr)
    }
    xhr.onerror = reject
    xhr.open('GET', url)
    if (accessToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    }
    xhr.send()
  }).then(function(xhr) {
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(xhr.response) // xhr.response is a blob
    a.download = filename // Set the file name.
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    return xhr
  })
}
