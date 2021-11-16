import axios from 'axios';
import { FCM_SERVER_TOKEN } from "../config";

class Notifications {
    async adminNotify(title, message, data) {
        // if (!title || !body || !fcmToken) return;
        try {
            axios.post('https://fcm.googleapis.com/fcm/send',
                {
                    notification: {
                        body: message,
                        title: title
                    },
                    priority: 'high',
                    data: {
                        data,
                        click_action: "FLUTTER_NOTIFICATION_CLICK",
                        sound: "default",
                    },
                    to: '/topics/notification',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `key=${FCM_SERVER_TOKEN}`,
                    }
                }
            );
            
        } catch (e) {
            console.log("error push notification");
            console.log(e);
        }
    }

}

export default new Notifications();