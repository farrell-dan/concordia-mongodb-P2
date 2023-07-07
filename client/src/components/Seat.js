import { useContext } from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import VisuallyHidden from '@reach/visually-hidden';
import seatImageSrc from '../assets/seat-available.svg';
import { getRowName, getSeatNum, encodeSeatId } from '../helpers';

import UnstyledButton from './UnstyledButton';
import { BookingContext } from './BookingContext';

const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
    const {
        actions: { beginBookingProcess },
    } = useContext(BookingContext);

    const rowName = getRowName(rowIndex);
    const seatNum = getSeatNum(seatIndex);

    const seatId = encodeSeatId(rowIndex, seatIndex);

    return (
        <StyledTippy content={`Row ${rowName}, Seat ${seatNum} – $${price}`}>
            <Wrapper
                disabled={status === 'unavailable'}
                onClick={() => {
                    beginBookingProcess({ seatId, price });
                }}
            >
                <VisuallyHidden>
                    Seat number {seatNum} in Row {rowName}
                </VisuallyHidden>
                <img src={seatImageSrc} alt='' style={{ width, height }} />
            </Wrapper>
        </StyledTippy>
    );
};

const StyledTippy = styled(Tippy)`
    background-color: black;
    border-radius: 3px;
`

const Wrapper = styled(UnstyledButton)`
    position: relative;

    &:disabled img {
        filter: grayscale(100%);
    }
`;

export default Seat;
