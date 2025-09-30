export function addToastStyles() {
    if (document.getElementById('toast-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      /* ========== BASE TOAST STYLES ========== */
      .toastify {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
                    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 400px;
        padding: 16px 20px;
        margin-bottom: 10px;
        color: #ffffff;
        background: rgba(51, 51, 51, 0.95);
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
        display: flex;
        align-items: center;
      }
      
      .toastify.on {
        opacity: 1;
        transform: translateX(0);
      }
      
      /* ========== TOAST TYPES ========== */
      .toast-success {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);
        border-color: rgba(16, 185, 129, 0.3);
      }
      
      .toast-error {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
        border-color: rgba(239, 68, 68, 0.3);
      }
      
      .toast-warning {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%);
        border-color: rgba(245, 158, 11, 0.3);
      }
      
      .toast-info {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
        border-color: rgba(59, 130, 246, 0.3);
      }
      
      /* ========== TOAST CONTENT ========== */
      .toastify-content {
        flex: 1;
        padding-right: 10px;
      }
      
      .toastify-close {
        background: none;
        border: none;
        color: inherit;
        opacity: 0.7;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        font-size: 18px;
        line-height: 1;
        transition: opacity 0.2s;
      }
      
      .toastify-close:hover {
        opacity: 1;
      }
      
      /* ========== FORM ERROR STATES ========== */
      .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
      
      .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: none; /* Initially hidden */
        font-weight: 500;
      }
      
      /* ========== LOADING STATES ========== */
      .loading {
        position: relative;
        pointer-events: none;
      }
      
      .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      /* ========== RESPONSIVE ADJUSTMENTS ========== */
      @media (max-width: 768px) {
        .toastify {
          top: 20px;
          right: 16px;
          left: 16px;
          min-width: auto;
          max-width: none;
          width: calc(100% - 32px);
          padding: 14px 16px;
          transform: translateY(-120%);
        }
        
        .toastify.on {
          transform: translateY(0);
        }
      }
      
      @media (max-width: 480px) {
        .toastify {
          top: 16px;
          right: 12px;
          left: 12px;
          width: calc(100% - 24px);
          padding: 12px 14px;
          font-size: 13px;
        }
        
        .error-message {
          font-size: 0.8rem;
        }
      }
      
      /* ========== ACCESSIBILITY ========== */
      .toastify:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
}