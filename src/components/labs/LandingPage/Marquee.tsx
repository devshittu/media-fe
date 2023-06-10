import { EyeIcon, EyeOffIcon, Icon } from '@/components/blocks/icons';
import { Button } from '@/components/button';
import React, { useState } from 'react';
export type MarqueeProps = {
    children: React.ReactNode;
    className?: string;
    hoverToPause?: boolean;
    loop?: boolean;
    speed?: number;
    scaleItems?: boolean;
    reverse?: boolean;
}
const MarqueeExamples = () => {
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);

  const handleToggleAnimation = () => {
    setAnimationEnabled(!animationEnabled);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold my-8">CSS Marquee Examples</h1>

      <section>
        <h2 className="text-xl font-semibold">Full-width (default)</h2>
        <Button onClick={() => handleToggleAnimation()}><Icon icon={animationEnabled?<EyeIcon />:<EyeOffIcon/>} /></Button>

        <div className="marquee flex gap-4 relative select-none overflow-hidden my-10 h-96x group">
          <ul aria-hidden="true" className={`marquee__content group-hover:paused motion-reduce:paused shrink-0 flex justify-around items-center gap-4 min-h-fit my-10 min-w-full  ${animationEnabled ? ' enable-animation animate-scroll ' : ''}`}>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>1</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>2</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>3</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>4</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>5</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>6</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>7</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>8</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>9</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>10</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>11</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>12</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>13</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>14</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>15</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>16</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>17</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>18</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>19</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>20</li>
          </ul>

          <ul aria-hidden="true" className={`marquee__content group-hover:paused motion-reduce:paused shrink-0 flex justify-around items-center gap-4 min-h-fit my-10 min-w-full  ${animationEnabled ? ' enable-animation animate-scroll ' : ''}`}>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>1</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>2</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>3</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>4</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>5</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center'>6</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>7</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>8</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>9</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>10</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>11</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>12</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>13</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>14</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>15</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>16</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>17</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>18</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>19</li>
            <li className='flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-75 transform dark:bg-slate-900 rounded shadow-2xl hover:scale-125 md:shadow-xl hover:shadow-2xl'>20</li>
          </ul>
        </div>
      </section>

      {/* <section>
        <h2 className="text-xl font-semibold">Reverse</h2>
        <input
          id="enable-animation-2"
          type="checkbox"
          checked={animationEnabled[1]}
          onChange={() => handleToggleAnimation(1)}
        />
        <label htmlFor="enable-animation-2">Enable animation</label>

        <div className="marquee marquee--reverse">
          <ul className={`marquee__content ${animationEnabled[1] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>

          <ul aria-hidden="true" className={`marquee__content ${animationEnabled[1] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Pause on hover</h2>
        <input
          id="enable-animation-3"
          type="checkbox"
          checked={animationEnabled[2]}
          onChange={() => handleToggleAnimation(2)}
        />
        <label htmlFor="enable-animation-3">Enable animation</label>

        <div className="marquee marquee--hover-pause">
          <ul className={`marquee__content ${animationEnabled[2] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>

          <ul aria-hidden="true" className={`marquee__content ${animationEnabled[2] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Fit content</h2>
        <input
          id="enable-animation-4"
          type="checkbox"
          checked={animationEnabled[3]}
          onChange={() => handleToggleAnimation(3)}
        />
        <label htmlFor="enable-animation-4">Enable animation</label>

        <div className="marquee marquee--fit-content">
          <ul className={`marquee__content ${animationEnabled[3] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>

          <ul aria-hidden="true" className={`marquee__content ${animationEnabled[3] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Fit content + position absolute :last-child</h2>
        <input
          id="enable-animation-5"
          type="checkbox"
          checked={animationEnabled[4]}
          onChange={() => handleToggleAnimation(4)}
        />
        <label htmlFor="enable-animation-5">Enable animation</label>

        <div className="marquee marquee--fit-content marquee--pos-absolute">
          <ul className={`marquee__content ${animationEnabled[4] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>

          <ul aria-hidden="true" className={`marquee__content ${animationEnabled[4] ? 'enable-animation' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </section> */}
    </div>
  );
};

export default MarqueeExamples;
