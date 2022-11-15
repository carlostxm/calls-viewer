import { Call, CallsPage } from 'model';
import { getShortDate } from 'translators';

function updateCallInPage(call: Call, page: CallsPage): CallsPage {
  const key = getShortDate(new Date(call.createdAt));

  const currentCallIndex = page.callsByDate[key]?.findIndex(
    (c) => c.id === call.id
  );

  if (currentCallIndex == null || currentCallIndex === -1) {
    return page;
  }

  const currentCalls = page.callsByDate[key];

  const updatedCalls = currentCalls?.splice(currentCallIndex, 1, call) ?? [];

  console.log(currentCalls, updatedCalls);

  return {
    ...page,
    callsByDate: {
      ...page.callsByDate,
      [key]: updatedCalls,
    },
  };
}

export default updateCallInPage;
