import { User } from 'model';
import Pusher from 'pusher-js';
import { PUSHER_CONFIG } from './config';

function subscribePushChannel(
  { accessToken }: User,
  callback: (data: any) => void
) {
  const pusher = new Pusher(PUSHER_CONFIG.appKey, {
    authEndpoint: PUSHER_CONFIG.appAuthEndpoint,
    cluster: PUSHER_CONFIG.appCluster,
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const channel = pusher.subscribe('private-aircall');

  channel.bind('update-call', callback);
}

export default subscribePushChannel;
