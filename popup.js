// 获取DOM元素
const historyList = document.getElementById('history-list');
const itemTemplate = document.getElementById('copy-item-template');

// 加载时获取并显示记录，初始化按钮状态
chrome.storage.local.get({copies: []}, (result) => {
  const clearBtn = document.getElementById('clear-all-btn');
  clearBtn.disabled = result.copies.length === 0;
  renderHistory(result.copies);
});

// 清除所有记录
document.getElementById('clear-all-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all records?')) {
    chrome.storage.local.set({ copies: [] }, () => {
      renderHistory([]);
    });
  }
});

function renderHistory(copies) {
  historyList.innerHTML = '';
  
  // 更新清除按钮状态
  const clearBtn = document.getElementById('clear-all-btn');
  clearBtn.disabled = copies.length === 0;
  
  if (copies.length === 0) {
    return; // 空状态提示由CSS处理
  }
  
  copies.forEach((copy, index) => {
    // 克隆模板内容
    const item = itemTemplate.content.cloneNode(true);
    
    // 填充内容
    item.querySelector('.copy-content').textContent = copy.content;
    item.querySelector('.copy-time').textContent = copy.time;
    
    // 设置URL
    const urlLink = item.querySelector('.copy-url');
    urlLink.textContent = new URL(copy.url).hostname;
    urlLink.href = copy.url;
    
    // 添加删除事件
    item.querySelector('.delete-btn').addEventListener('click', () => {
      deleteCopy(index);
    });
    
    historyList.insertBefore(item, historyList.firstChild);
  });
}

// 删除记录
function deleteCopy(index) {
  chrome.storage.local.get({copies: []}, (result) => {
    const copies = result.copies;
    copies.splice(index, 1);
    chrome.storage.local.set({copies: copies}, () => {
      renderHistory(copies);
    });
  });
}

// 监听存储变化以实时更新
chrome.storage.onChanged.addListener((changes) => {
  if (changes.copies) {
    const clearBtn = document.getElementById('clear-all-btn');
    clearBtn.disabled = changes.copies.newValue.length === 0;
    renderHistory(changes.copies.newValue);
  }
});
