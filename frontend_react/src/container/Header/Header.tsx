import { useContext, useRef } from 'react';
import { AppWrap } from '../../wrapper/index';
import { motion } from 'framer-motion';

import './Header.scss';
import { images } from '../../constants';
import { GlobalContext } from '../../context/GlobalContext';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => {
  const context = useContext(GlobalContext);
  const profilePicRef = useRef<HTMLImageElement | null>(null);

  // useEffect(() => {
  //   // if (!profilePicRef.current) return;
  //
  //   const isLoading =
  //     profilePicRef.current?.complete &&
  //     profilePicRef.current?.naturalHeight !== 0;
  //
  //   console.log(isLoading);
  //   return () => {
  //     profilePicRef.current = null;
  //   };
  // }, [profilePicRef]);

  const onLoadProfilePic = () => {
    console.log('profile image loaded');
    if (!context) return;
    context.setAppLoading(false);
  };
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className={'app__header-info'}
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Todor</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">Fullstack Developer</p>
            <p className="p-text">React, Typescript, C#</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={'app__header-img'}
      >
        <img
          src={images.profile}
          alt="profile_bg"
          ref={profilePicRef}
          onLoad={onLoadProfilePic}
        />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt={'profile_circle'}
          className={'overlay_circle'}
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className={'app__header-circles'}
      >
        {[images.react, images.typescript, images.c_sharp].map(
          (circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle} alt="circle" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
