export const productStatusComplete = {
  key: 'complete',
  title: 'Complete',
  value: 'complete',
}

export const productStatusIncomplete = {
  key: 'incomplete',
  title: 'Incomplete',
  value: 'incomplete',
};

export const productStatusPendingReview = {
  key: 'pendingReview',
  title: 'Pending Review',
  value: 'pending-review',
};

export function getProductStatusSelectOptions() {
  return [
    productStatusComplete,
    productStatusIncomplete,
    productStatusPendingReview,
  ].map(status => ({
    label: status.title,
    value: status.value,
  }));
 }
