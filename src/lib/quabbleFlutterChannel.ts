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
    eventOrJsonString: string,
    payload?: Record<string, unknown>
  ) {
    let actualEvent: string;
    let actualPayload: Record<string, unknown> = {};
    
    // Handle both old format (JSON string) and new format (event + payload)
    if (payload !== undefined) {
      // New format: sendToFlutter("event_name", {payload})
      actualEvent = eventOrJsonString;
      actualPayload = payload;
    } else {
      // Old format: sendToFlutter(JSON.stringify({event: "event_name", ...}))
      try {
        const parsed = JSON.parse(eventOrJsonString);
        actualEvent = parsed.event || eventOrJsonString;
        actualPayload = { ...parsed };
        delete actualPayload.event; // Remove event from payload since it's now separate
      } catch (e) {
        // If not valid JSON, treat as event name with empty payload
        actualEvent = eventOrJsonString;
        actualPayload = {};
      }
    }
    
    // Determine event type and create user-friendly console message
    let eventType = '';
    let emoji = '📡';
    
    if (actualEvent.startsWith('view_')) {
      eventType = 'VIEW';
      // Different emojis for different view types
      if (actualEvent.includes('screen') || actualEvent.includes('page')) {
        emoji = '📱';
      } else if (actualEvent.includes('modal') || actualEvent.includes('popup')) {
        emoji = '🔍';
      } else if (actualEvent.includes('chart') || actualEvent.includes('graph')) {
        emoji = '📊';
      } else if (actualEvent.includes('routine') || actualEvent.includes('workout')) {
        emoji = '🏃‍♂️';
      } else if (actualEvent.includes('onboard') || actualEvent.includes('intro')) {
        emoji = '🚀';
      } else {
        emoji = '👀';
      }
    } else if (actualEvent.startsWith('click_')) {
      eventType = 'CLICK';
      // Different emojis for different click types
      if (actualEvent.includes('button') || actualEvent.includes('btn')) {
        emoji = '🔘';
      } else if (actualEvent.includes('option') || actualEvent.includes('selection')) {
        emoji = '✨';
      } else if (actualEvent.includes('next') || actualEvent.includes('continue')) {
        emoji = '➡️';
      } else if (actualEvent.includes('back') || actualEvent.includes('previous')) {
        emoji = '⬅️';
      } else if (actualEvent.includes('close') || actualEvent.includes('dismiss')) {
        emoji = '❌';
      } else {
        emoji = '👆';
      }
    } else if (actualEvent.includes('complete')) {
      eventType = 'COMPLETE';
      if (actualEvent.includes('onboard')) {
        emoji = '🎉';
      } else if (actualEvent.includes('signin') || actualEvent.includes('login')) {
        emoji = '🔐';
      } else if (actualEvent.includes('routine') || actualEvent.includes('workout')) {
        emoji = '💪';
      } else {
        emoji = '✅';
      }
    } else if (actualEvent.includes('error')) {
      eventType = 'ERROR';
      if (actualEvent.includes('network') || actualEvent.includes('api')) {
        emoji = '🌐';
      } else if (actualEvent.includes('signin') || actualEvent.includes('auth')) {
        emoji = '🚫';
      } else {
        emoji = '❌';
      }
    } else if (actualEvent.includes('start') || actualEvent.includes('begin')) {
      eventType = 'START';
      emoji = '🏁';
    } else if (actualEvent.includes('submit') || actualEvent.includes('send')) {
      eventType = 'SUBMIT';
      emoji = '📤';
    } else if (actualEvent.includes('load') || actualEvent.includes('fetch')) {
      eventType = 'LOAD';
      emoji = '⏳';
    } else if (actualEvent.includes('success')) {
      eventType = 'SUCCESS';
      emoji = '🎯';
    } else {
      eventType = 'EVENT';
      emoji = '📡';
    }
    
    // Clean event name for display (remove prefixes and underscores)
    const cleanEventName = actualEvent
      .replace(/^(view_|click_)/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    console.log(`${emoji} [${eventType}] ${cleanEventName}`, actualPayload);
    const channel = window.QuabbleFlutterChannel;
    if (channel && typeof channel.postMessage === 'function') {
      channel.postMessage(JSON.stringify({ event: actualEvent, ...actualPayload }));
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