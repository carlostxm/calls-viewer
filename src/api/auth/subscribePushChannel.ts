import { ApiCall } from 'api/model';
import { Call, User } from 'model';
import Pusher from 'pusher-js';
import { translateCallFromApi } from 'translators';
import { PUSHER_CONFIG } from './config';

function handleChannelEvent(
  callback: (call: Call) => void
): (node: ApiCall) => void {
  return function (node: ApiCall) {
    const call = translateCallFromApi(node);
    callback(call);
  };
}

function subscribePushChannel(
  { accessToken }: User,
  callback: (call: Call) => void
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

  channel.bind('update-call', handleChannelEvent(callback));
}

export default subscribePushChannel;
