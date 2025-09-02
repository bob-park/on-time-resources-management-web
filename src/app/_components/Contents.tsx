'use client';

import { useEffect, useRef, useState } from 'react';

import Header from '@/app/_components/Header';
import NavMenu from '@/app/_components/NavMenu';

import cx from 'classnames';
import { OverlayProvider } from 'overlay-kit';

const WINDOW_WIDTH_LG = 1_024;

export default function Contents({ children }: Readonly<{ children: React.ReactNode }>) {
  // ref
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  // state
  const [showNav, setShowNav] = useState<boolean>(true);

  // useEffect
  useEffect(() => {
    function handleWindowsResize() {
      const width = window.innerWidth;

      setShowNav(width >= WINDOW_WIDTH_LG);
    }

    window.addEventListener('resize', handleWindowsResize);

    return () => {
      window.removeEventListener('resize', handleWindowsResize);
    };
  }, []);

  useEffect(() => {
    if (!drawerToggleRef.current) {
      return;
    }

    drawerToggleRef.current.checked = showNav;
  }, [showNav]);

  return (
    <OverlayProvider>
      <div className="relative flex h-screen w-full flex-row items-center gap-5 overflow-y-auto p-2">
        {/* nav menu */}
        <div
          className={cx(
            'absolute top-2 left-4 hidden h-[calc(100vh-20px)] w-64 transition-all duration-300 lg:z-10 lg:block',
            !showNav && 'lg:-translate-x-72',
          )}
        >
          <NavMenu />
        </div>

        <div
          className={cx(
            'ml-5 h-full w-full min-w-[600px] overflow-y-auto transition-all duration-300',
            showNav ? 'lg:ml-72' : '',
          )}
        >
          <div className="relative flex w-full flex-col items-center gap-5">
            {/* headers */}
            <div className="sticky top-0 z-20 w-full pr-4">
              <Header showNav={showNav} onExtendClick={() => setShowNav(!showNav)} />
            </div>

            {/* contents */}
            <div className="w-full p-5">{children}</div>
          </div>
        </div>
      </div>

      {/* drawer nav menu  */}
      <div className="drawer lg:hidden">
        <input ref={drawerToggleRef} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content" />
        <div className="drawer-side z-20">
          <label
            aria-label="close sidebar"
            className="drawer-overlay !bg-gray-300/20"
            onClick={() => setShowNav(false)}
          />
          <div className="absolute top-2 left-4 h-[calc(100vh-20px)] w-64">
            <NavMenu shadow />
          </div>
        </div>
      </div>
    </OverlayProvider>
  );
}
