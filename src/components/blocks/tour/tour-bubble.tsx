import Popover from './popover';

type TourBubbleProps = {
  forElement?: string;
  open: boolean;
  placement?: string;
  onClose: () => void;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious: () => void;
  onNext: () => void;
  content: React.ReactNode;
};

const TourBubble: React.FC<TourBubbleProps> = (props) => {
  const element = props.forElement
    ? document.querySelector(props.forElement)
    : null;

  return element ? (
    <>
    <Popover strategy='fixed' placement='bottom'>
      <div
        className="TourBubble-container"
        open={props.open}
        anchorEl={element}
        placement={props.placement || 'bottom-start'}
      >
        <div className="TourBubble-close" onClick={props.onClose}>
          Close [X]
        </div>
        {props.content}
        <div className="TourBubble-controls">
          {props.previousLabel ? (
            <div
              className="TourBubble-control TourBubble-previous"
              onClick={props.onPrevious}
            >
              &lt; {props.previousLabel}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
          {props.nextLabel ? (
            <div
              className="TourBubble-control TourBubble-next"
              onClick={props.onNext}
            >
              {props.nextLabel} &gt;
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </div>
      </Popover>
    </>
  ) : null;
};

export default TourBubble;
