import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const getDropdownStyle = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      return {
        top: triggerRect.bottom + 8,
        left: triggerRect.left,
      };
    }

    return {};
  };

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          className="text-gray-700"
          onClick={toggleDropdown}
        >
          {trigger}
        </button>
        {isOpen &&
          createPortal(
            <div
              className="absolute bg-white p-4 shadow border rounded"
              style={getDropdownStyle()}
            >
              {content}
            </div>,
            document.body
          )}
      </div>
    </>
  );
};

export default Dropdown;
