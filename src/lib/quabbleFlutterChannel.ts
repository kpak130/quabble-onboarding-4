// quabbleChannel.ts
export interface QuabbleFlutterChannel {
    postMessage: (msg: string) => void;
  }
  
  declare global {
    interface Window {
      QuabbleFlutterChannel?: QuabbleFlutterChannel;
      // Global functions for Flutter to call back to web
      onSigninSuccess?: (userData: any) => void;
      onSigninError?: (error: string) => void;
    }
  }
  
  export function sendToFlutter(
    event: string,
    payload: Record<string, unknown> = {}
  ) {
    // Determine event type and create user-friendly console message
    let eventType = '';
    let emoji = '📡';
    
    if (event.startsWith('view_')) {
      eventType = 'VIEW';
      emoji = '👀';
    } else if (event.startsWith('click_')) {
      eventType = 'CLICK';
      emoji = '👆';
    } else if (event.includes('complete')) {
      eventType = 'COMPLETE';
      emoji = '✅';
    } else if (event.includes('error')) {
      eventType = 'ERROR';
      emoji = '❌';
    } else {
      eventType = 'EVENT';
      emoji = '📡';
    }
    
    // Clean event name for display (remove prefixes and underscores)
    const cleanEventName = event
      .replace(/^(view_|click_)/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    console.log(`${emoji} [${eventType}] ${cleanEventName}`, payload);
    const channel = window.QuabbleFlutterChannel;
    if (channel && typeof channel.postMessage === 'function') {
      channel.postMessage(JSON.stringify({ event, ...payload }));
    } else {
      // console.log('[QuabbleFlutterChannel] Channel not found—probably in browser');
    }
  }

  // Setup global functions for Flutter to call back to web
  export function setupSigninCallbacks(
    onSuccess: (userData: any) => void,
    onError: (error: string) => void
  ) {
    window.onSigninSuccess = onSuccess;
    window.onSigninError = onError;
  }

  // Clean up global functions
  export function cleanupSigninCallbacks() {
    delete window.onSigninSuccess;
    delete window.onSigninError;
  }

  /*
  Flutter should call these global functions:

  Success:
  webViewController.runJavaScript('''
    if (window.onSigninSuccess) {
      window.onSigninSuccess(${jsonEncode(userData)});
    }
  ''');

  Error:
  webViewController.runJavaScript('''
    if (window.onSigninError) {
      window.onSigninError("Error message");
    }
  ''');
  */