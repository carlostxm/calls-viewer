import { Call, CallsPage } from 'model';
import { getShortDate } from 'translators';

/**
 * Replaces the element at the index from the call list given returning a new list instance
 * @param call: List of elements to replace
 * @param index: Position in the call list of the element to replace
 * @param call: Element to add to the list at the index position
 * @returns A new list with the element at the index position replaced by the call element given
 */
function replaceElementAtIndex(
  calls: Call[],
  index: number,
  call: Call
): Call[] {
  if (!calls?.length) {
    return calls;
  }

  const callsCopy = [...calls];
  callsCopy.splice(index, 1, call);

  return callsCopy;
}

function updateCallInPage(call: Call, page: CallsPage): CallsPage {
  const key = getShortDate(new Date(call.createdAt));

  const currentCallIndex = page.callsByDate[key]?.findIndex(
    (c) => c.id === call.id
  );

  if (currentCallIndex == null || currentCallIndex === -1) {
    return page;
  }

  const updatedCalls = replaceElementAtIndex(
    page.callsByDate[key],
    currentCallIndex,
    call
  );

  return {
    ...page,
    callsByDate: {
      ...page.callsByDate,
      [key]: updatedCalls,
    },
  };
}

export default updateCallInPage;
