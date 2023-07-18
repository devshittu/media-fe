import React from 'react'
import { Link } from '@/components/labs';
import { COPYRIGHT_TEXT } from '@/config/constants';

const Copyright = () => {
  return (
    
            <div className="flex flex-col-reverse justify-between py-5 border-t border-slate-300 dark:border-slate-700 lg:flex-row">
              <p className="text-sm">
                {COPYRIGHT_TEXT}
              </p>
              <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row text-sm">
                <li>
                  <Link
                    href="/faq"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    F.A.Q
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className=" transition-colors duration-300 hover:text-cyan-400"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
  )
}

export default Copyright