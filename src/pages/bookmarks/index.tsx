import { BoxIcon, EyeIcon, FlagIcon, HomeIcon, Icon, KeyIcon, MehIcon, SunIcon, TvIcon, ZapIcon } from '@/components/illustrations';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import Aside from './try';

type Section = {
  name: string;
  icon: JSX.Element;
  // ref?: React.RefObject<HTMLDivElement> | null;
  ref?: any | null;
  content: string;
};


const sectionsSetup: Section[] = [
  {
    name: 'section1',
    icon: <HomeIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section2',
    icon: <EyeIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section3',
    icon: <KeyIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section4',
    icon: <MehIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section5',
    icon: <TvIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section6',
    icon: <SunIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section7',
    icon: <BoxIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section8',
    icon: <ZapIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    name: 'section9',
    icon: <FlagIcon />,
    ref: null,
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
];

type DragState = {
  isDragging: boolean;
  startX: number;
  delta: number;
};

const useDragExpander = ({ min, max }: { min: number; max: number }) => {
  const dragState = useRef<DragState>({
    isDragging: false,
    startX: 0,
    delta: 0,
  });
 
  const onDragMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  if ('clientX' in e) {
    dragState.current.startX = e.clientX;
  } else if (e.touches && e.touches.length > 0) {
    dragState.current.startX = e.touches[0]?.clientX;
  }
  dragState.current.isDragging = true;
};

const onDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  if (!dragState.current.isDragging) return;

  let clientX: number | undefined;
  if ('clientX' in e) {
    clientX = e.clientX;
  } else if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0]?.clientX;
  }

  const delta = (clientX! as number) - dragState.current.startX;
  dragState.current.delta = Math.max(min, Math.min(max, delta));
};
  const limitDragRange = (value: number) => Math.max(min, Math.min(max, value));

  return { onDragMouseDown, onDragMove, dragState: dragState.current, limitDragRange };
};


const getActiveSection = ({ sections, parent }: { sections: Section[]; parent: React.RefObject<HTMLDivElement> }) => {
  const parentRect = parent.current?.getBoundingClientRect();
  const sectionIdx = sections.findIndex((s) => {
    const node = s.ref?.current;
    if (!node || !parentRect) return false;
    const { top, height } = node.getBoundingClientRect();
    return top >= parentRect.top && top + height <= parentRect.top + parentRect.height;
  });

  return sections[sectionIdx] || sections[0];
};

type SectionProps = {
  name: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
};

const Section = React.forwardRef<HTMLDivElement, SectionProps>(({ name, icon, isActive, onClick }, ref) => (

  <section className={`p-4 mb-8 border-t-2 border-primary ${isActive ? 'bg-gray-100' : 'bg-white'}`} ref={ref}>
    <header className="sticky top-0 p-1 mb-1 bg-gradient-to-top from-transparent to-white text-capitalize text-gray-500 font-medium transition duration-100">
      <Icon icon={icon} className="w-5" /> {name}
    </header>
    <div className="text-xl text-gray-700">{sectionsSetup.find((s) => s.name === name)?.content}</div>
    <button
      className={`mt-2 text-sm text-gray-600 font-medium ${isActive ? 'text-primary' : ''}`}
      onClick={onClick}
    >
      {isActive ? 'Active' : 'Activate'}
    </button>
  </section>
));
Section.displayName = 'Section';


const Bookmark: React.FC = () => {
  const parent = useRef<HTMLDivElement>(null);
  const activeSection = useRef<Section | undefined>();
  const [sections, setSections] = useState<Section[]>(sectionsSetup || []);


  // const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([])

  const { onDragMouseDown, onDragMove, dragState, limitDragRange } = useDragExpander({
    min: -100,
    max: 100,
  });
  const handleSectionClick = useCallback(
    (section: Section) => () => {
        console.log('section',section, 'activeSection.current', activeSection.current);
      if (activeSection.current === section) return;
      activeSection.current = section;
      scrollToSection(section);
    },
    []
  );

  const scrollToSection = (section: Section) => {
    const container = parent.current;
    console.log('scrollToSection:container:// ', container);
    const activeSectionRef = section.ref?.current;
    if (!container || !activeSectionRef) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = activeSectionRef.getBoundingClientRect();
    container.scrollTop += activeRect.top - containerRect.top;
  };

  useEffect(() => {
    activeSection.current = getActiveSection({ sections: sectionsSetup, parent });
  }, []);

    useEffect(() => {
       sectionRefs.current = sectionRefs.current.slice(0, sections.length);
       console.log('sectionRefs.current :// ', sectionRefs.current);
       console.log('sectionsSetup:// ', sections);
    }, [sections]);

  return (
    <div className="h-screen bg-blue-200 text-4xl">
      {/* <Aside data={sectionsSetup} /> */}
      <div
        ref={parent}
        className="h-full flex"
        role="presentation"
        onMouseDown={onDragMouseDown}
        onMouseUp={() => {
          dragState.isDragging = false;
        }}
        onMouseMove={(e) => {
          onDragMove(e);
          const { delta } = dragState;
          parent.current!.style.setProperty('--delta', `${limitDragRange(delta)}`);
        }}
        onTouchStart={onDragMouseDown}
        onTouchEnd={() => {
          dragState.isDragging = false;
        }}
        onTouchMove={(e) => {
          onDragMove(e.touches[0]);
          const { delta } = dragState;
          parent.current!.style.setProperty('--delta', `${limitDragRange(delta)}`);
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div
          className="flex-none h-full bg-white shadow-lg rounded-l overflow-hidden"
          style={{
            width: `calc(20% + ${limitDragRange(dragState.delta)}px)`,
            minWidth: '300px',
          }}
        >
          <nav className="h-full bg-blue-300 border-r border-l border-white shadow border-gray-400">
            {sections.map((section) => (
              <button
                key={section.name}
                className={`w-full px-2 py-3 text-2xl font-semibold text-gray-700 hover:bg-blue-400 hover:text-white focus:outline-none ${
                  section === activeSection.current ? 'bg-blue-400 text-white' : ''
                }`}
                onClick={handleSectionClick(section)}
              >
                <Icon icon={section.icon} className='w-8' />
              </button>
            ))}
          </nav>
        </div>
        <div
          className="flex-auto bg-white p-8 shadow-lg rounded-r overflow-auto"
          style={{ marginLeft: '.5rem' }}
        >
          {sections.map((section, index) => (
            <Section
              key={section.name}
              name={section.name}
              icon={section.icon}
              isActive={section === activeSection.current}
              onClick={handleSectionClick(section)}
              ref={el =>  {
                // section.ref?.current = el;
                console.log('el:// ', el, 'sectionRefs.current :// ', sectionRefs.current,);
                return sectionRefs.current[index] = el}
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;


// Path: src/pages/bookmarks/index.tsx

