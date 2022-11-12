import { ApiCall } from 'api/model';
import { Call } from 'model';

function translateCallFromApi({
  id,
  created_at,
  is_archived,
  notes,
  from,
  to,
  duration,
  via,
  call_type,
  ...rest
}: ApiCall): Call {
  return {
    isArchived: is_archived,
    notes,
    id,
    createdAt: created_at,
    from,
    to,
    duration,
    via,
    callType: call_type,
    ...rest,
  };
}

export default translateCallFromApi;
