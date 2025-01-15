// 监听网页的copy事件
document.addEventListener('copy', (event) => {
  const selection = window.getSelection().toString();
  if (!selection) {
    console.log('No selection found');
    return;
  }

  console.log('Copy detected:', selection);
  
  // 发送消息给background script
  chrome.runtime.sendMessage({
    type: 'copy',
    content: selection,
    time: new Date().toLocaleString(),
    url: window.location.href
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Message failed:', chrome.runtime.lastError);
    } else {
      console.log('Message sent successfully');
    }
  });
});
