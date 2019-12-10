export const ERRORS_DETECTED = 'ERRORS_DETECTED';

export const errorsDetected = (errors) => {
  return {
    type: ERRORS_DETECTED,
    errors
  };
};
