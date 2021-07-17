import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  callback: Function,
  isVisible: boolean,
  title?: string,
  maxWidth?: number,
};

const duration = 0.085;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

export const Modal: React.FC<Props> = ({ callback, isVisible, children, title, maxWidth }) => {
  return (
    <AnimatePresence>
      {isVisible &&
        <motion.div
          key="modal"
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, .3)'}}
            className="fixed w-screen h-screen top-0 left-1/2 transform -translate-x-1/2 z-10"
            onClick={() => callback(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              className="bg-primary-100 rounded-xl shadow-lg m-3 md:m-6 overflow-hidden"
              style={{ maxWidth: maxWidth ? `${maxWidth}px` : '900px', width: '95vw',  }}
            >
              <div className="overflow-y-auto px-5 py-7 md:px-10 text-primary-900" style={{ maxHeight: '600px' }}>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <span className="text-tiny uppercase">{title}</span>
                  </div>
                  <div>
                    <VscClose size={25} className="cursor-pointer" onClick={() => callback()}/>
                  </div>
                </div>
                <div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

