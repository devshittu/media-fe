import { useEffect, useState } from 'react';
import TourBubble from './tour-bubble';
import { TourPopperType } from './tour-popper';

type TourSequenceItem = {
  forElement: string;
  text: string;
  placement?: string;
};

type TourSequenceProps = {
  sequence?: TourSequenceItem[];
  open: boolean;
  onClose: () => void;
  type?: TourPopperType;
};

function isVisible(element: HTMLElement | null): boolean {
  return !!(
    element?.offsetWidth ||
    element?.offsetHeight ||
    (element?.getClientRects && element.getClientRects().length)
  );
}

const TourSequence: React.FC<TourSequenceProps> = (props) => {
  const [position, setPosition] = useState(0);
  const [sequence, setSequence] = useState<TourSequenceItem[] | null>(null);

  useEffect(() => {
    if (props.sequence) {
      const filter = props.sequence.filter((item) => {
        if (!item.forElement) {
          return false;
        }
        const element = document.querySelector(item.forElement) as HTMLElement;
        return element && isVisible(element);
      });
      setSequence(filter);
    } else {
      setSequence(null);
    }
  }, [props.sequence, props.open]);

  const data = sequence && sequence[position];

  useEffect(() => {
    setPosition(0);
  }, [props.open]);

  const onNext = () => {
    setPosition((p) => {
      if (p === (sequence?.length || 0) - 1) {
        props.onClose && props.onClose();
      }
      return p + 1;
    });
  };

  const onPrevious = () => {
    setPosition((p) => {
      if (p === 0) {
        props.onClose && props.onClose();
      }
      return p - 1;
    });
  };

  return (
    <div className="TourSequence-container">
      {data && (
        <TourBubble
          open={props.open}
          forElement={data.forElement}
          placement={data.placement}
          onClose={props.onClose}
          type={props.type}
          previousLabel={position > 0 ? 'Previous' : undefined}
          nextLabel={position < (sequence?.length || 0) - 1 ? 'Next' : 'Finish'}
          onPrevious={onPrevious}
          onNext={onNext}
          content={data.text}
        />
      )}
    </div>
  );
};

export default TourSequence;

//Path: src/components/blocks/tour/tour-sequence.tsx
