import {createContext, useReducer, useCallback} from 'react';

export const BookingContext = createContext();

const initialState = {
  status: 'idle',
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'begin-booking-process': {
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }

    case 'cancel-booking-process': {
      return {
        ...state,
        status: 'idle',
        selectedSeatId: null,
        price: null,
      };
    }

    case 'purchase-ticket-request': {
      return {
        ...state,
        error: null,
        status: 'awaiting-response',
      };
    }

    case 'purchase-ticket-failure': {
      return {
        ...state,
        status: 'error',
        error: action.message,
      };
    }

    case 'purchase-ticket-success': {
      return {
        ...state,
        status: 'purchased',
        selectedSeatId: null,
        price: null,
        error: null,
      };
    }

    case 'clear-snackbar': {
      return {
        ...state,
        status: 'idle',
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = useCallback(
    ({ seatId, price }) =>
      dispatch({ type: 'begin-booking-process', seatId, price }),
    [dispatch]
  );

  const cancelBookingProcess = useCallback(
    () => dispatch({ type: 'cancel-booking-process' }),
    [dispatch]
  );

  const purchaseTicketRequest = useCallback(
    () => dispatch({ type: 'purchase-ticket-request' }),
    [dispatch]
  );
  const purchaseTicketSuccess = useCallback(
    () => dispatch({ type: 'purchase-ticket-success' }),
    [dispatch]
  );
  const purchaseTicketFailure = useCallback(
    message => dispatch({ type: 'purchase-ticket-failure', message }),
    [dispatch]
  );
  const clearSnackbar = useCallback(
    () => dispatch({ type: 'clear-snackbar' }),
    [dispatch]
  );

  return (
    <BookingContext.Provider
      value={{
        ...state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
          clearSnackbar,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
