import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';

import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';

import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';

import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import muking from 'assets/mukin.jpg';
import sampleServer from 'assets/server-sample.jpg';
import hmsPreview from 'assets/hms-preview.png';
import cicd from 'assets/cicd.png';
import algoVE from 'assets/algo-ve-preview.png';
import blockchain from 'assets/blockchain.png';
import algoVE2 from 'assets/algoVE2.png';
import stockDash from 'assets/stock-dashboard.png';
import stockDash2 from 'assets/stockDash2.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ["Private Server", "Lua Scripting", "Configuration", "Premium", "Security"];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="MU Online Developer"
        description="Design portfolio of John Panotes — DevByToast Company that offers MU Online private server configuration and develperments."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Servers Designed to Represent Your Vision"
        description="Customizing Your MU Online Private Server with Professionalism and Attention to Detail for an Extraordinary Gameplay Experience"
        buttonText="View project"
        buttonLink="#"
        model={{
          type: 'laptop',
          alt: 'Displaying the home page of the website.',
          textures: [
            {
              srcSet: [sampleServer, sampleServer],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Fully Customizable Game Events Powered by Lua Scripting"
        description="Build Dynamic Game Events That Attract Players and Unlock a New Standard of Gameplay"
        buttonText="View website"
        buttonLink="#"
        model={{
          type: 'laptop2',
          alt: 'landing page',
          textures: [
            {
              srcSet: [muking],
              placeholder: gamestackTexturePlaceholder,
            },
          ],
        }}
      />
      
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
