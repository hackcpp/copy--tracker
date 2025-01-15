// 监听来自content script的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  
  if (message.type === 'copy') {
    console.log('Processing copy message');
    
    // 获取现有记录
    chrome.storage.local.get({copies: []}, (result) => {
      console.log('Current storage:', result);
      
      const copies = result.copies;
      
      // 添加新记录
      copies.unshift({
        content: message.content,
        time: message.time,
        url: message.url
      });

      // 保存更新后的记录
      chrome.storage.local.set({copies: copies}, () => {
        // 确保存储完成
        console.log('Copy saved:', message);
        sendResponse({status: 'success'});
      });
    });
    return true; // 保持消息通道打开
  }
  
  console.warn('Unknown message type:', message.type);
  return false;
});
