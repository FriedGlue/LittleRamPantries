import IndexButtons from './components/IndexButton.tsx';
import InfoSection from './components/InfoSection.tsx';
import TestimonialGrid from './components/Testimonial.tsx';
import { SchoolConfig } from '../../types/types.tsx';

import joshThumbnail from '../../assets/pfp.jpg'
import percentVisual from '../../assets/35percentVisual.png'

import learningGardenLogo from '../../assets/learningGardenLogo.png'
import feedMoreLogo from '../../assets/feedMoreLogo.png'
import paceCenterLogo from '../../assets/paceCenterLogo.png'
import sousCasaLogo from '../../assets/SousCasaLogo.png'
import vcuDineLogo from '../../assets/vcuDineLogo.png'

function LandingPage({ schoolConfig }: { schoolConfig: SchoolConfig }) {
  const logos = [
    { src: vcuDineLogo, alt: 'VCU Dine Logo' },
    { src: feedMoreLogo, alt: 'Feed More Logo' },
    { src: paceCenterLogo, alt: 'Pace Center Logo' },
    { src: sousCasaLogo, alt: 'Sous Casa Logo' },
    { src: learningGardenLogo, alt: 'Learning Garden Logo' },
  ];

  const testimonials = [
    {
      thumbnail: joshThumbnail,
      text: "I'm super ADHD, so having the option to grab a quick snack between class is perfect because I usually forget mine.",
      author: '-Joshua Hayes, 2024 Alumni, Computer Science',
    },
    {
      thumbnail: joshThumbnail,
      text: "I'm super ADHD, so having the option to grab a quick snack between class is perfect because I usually forget mine.",
      author: '-Joshua Hayes, 2024 Alumni, Computer Science',
    },
    {
      thumbnail: joshThumbnail,
      text: "I'm super ADHD, so having the option to grab a quick snack between class is perfect because I usually forget mine.",
      author: '-Joshua Hayes, 2024 Alumni, Computer Science',
    },
    {
      thumbnail: joshThumbnail,
      text: "I'm super ADHD, so having the option to grab a quick snack between class is perfect because I usually forget mine.",
      author: '-Joshua Hayes, 2024 Alumni, Computer Science',
    },
  ];

    const infoSections: {
      title: string;
      subtitle: string;
      texts: string[];
      titlePosition: 'left' | 'right'; // Explicit type for titlePosition
    }[] = [
      {
        title: "What are they for?",
        subtitle: "Your first stop for a post class snack",
        texts: [
          "Access free food easily between classes, reducing hunger stress.",
          "Convenient snacks available for quick grabs while studying.",
          "Combat food insecurity with accessible pantry locations.",
          "College students are one of the most at-risk for food insecurity. (1)",
        ],
        titlePosition: "left",
      },
      {
        title: "Who are they for?",
        subtitle: "We believe food access is a human right",
        texts: [
          "Open to all students, ensuring no one goes hungry.",
          "Support for those balancing academics and tight budgets.",
          "Help us end the stigma of the 'broke college student eating ramen'.",
          "Providing essential items for daily living, beyond just food. ",
        ],
        titlePosition: "left",
      },
      {
        title: "What can I find in them?",
        subtitle: "Snacks, canned goods, hygiene products, and more!",
        texts: [
          "Wide variety of snacks to keep you energized throughout the day.",
          "Canned goods and non-perishable items for your pantry.",
          "Essential hygiene products to support your well-being.",
          "Nutritious ingredients to help you cook balanced meals.",
        ],
        titlePosition: "right",
      },
      {
        title: "What is food insecurity?",
        subtitle: "Understanding the challenges of accessing nutritious food",
        texts: [
          "Food insecurity means not having reliable access to enough nutritious food.",
          "Food insecurity can result from prioritizing rent over food, transportation issues, and lack of resources. (2)",
          "Food insecurity has been on the rise since the Covid-19 pandemic. (3)",
          "It can affect academic performance, health, and overall well-being.",
        ],
        titlePosition: "right",
      },
    ];
    
  
  return (
    <>
      {/* Hero Image and Text */}
      <div className="relative w-full pt-[35%] mb-5">
        <div className="absolute top-0 left-0 w-full h-full object-cover">
          <img
            src={schoolConfig.assets.landing_banner}
            alt="landing page banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-[rgba(250,250,250,0.9)] text-black p-4 md:p-6 rounded-md max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[60%] space-y-7 text-center">
              <h1 className="mb-[0.3rem] sm:text-2xl md:text-6xl lg:text-9xl">
                Little Ram Pantries
              </h1>
              <h1 className="mb-[0.3rem] sm:text-lg md:text-xl">
                Providing Free Food Access Across Both VCU Campuses
              </h1>
            </div>
          </div>
        </div>
      </div>
      <IndexButtons />

      {/* Pantry Page Breaker */}
      <div className=' flex justify-center gap-x-40'>
          <img
            src={schoolConfig.assets.transparentPantry}
            alt="landing page banner"
            className=""
          />
          <img
            src={schoolConfig.assets.transparentPantry}
            alt="landing page banner"
            className="hidden md:block"
          />
      </div>

      {/* Live Usage Number */}
      <div className="flex flex-col items-center">
        <div className="flex mt-36 justify-center text-center">
          <h3 className="font-bold text-3xl hidden lg:block">Thousands of students are already using Little Ram Pantries</h3>
          <h3 className="font-bold text-3xl block lg:hidden">
            Thousands of students are already
            <br />
            using Little Ram Pantries
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center m-16">
          <div className="flex flex-col items-center bg-slate-500 m-8 mt-2 p-8 rounded-md min-w-60">
            <h3 className="font-bold text-3xl mb-4">80</h3>
            <h4 className="font-bold text-2xl">This Semester</h4>
          </div>
          <div className="flex flex-col items-center bg-slate-500 m-8 mt-2 p-8 rounded-md min-w-60">
            <h3 className="font-bold text-3xl mb-4">80</h3>
            <h4 className="font-bold text-2xl">This Year</h4>
          </div>
          <div className="flex flex-col items-center bg-slate-500 m-8 mt-2 p-8 rounded-md min-w-60">
            <h3 className="font-bold text-3xl mb-4">80</h3>
            <h4 className="font-bold text-2xl">Since 2020</h4>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <IndexButtons />
      </div>

      {/* FAQ / Info Section */}
      <div>
      {infoSections.map((section, index) => (
        <InfoSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          texts={section.texts}
          titlePosition={section.titlePosition}
        />
      ))}
    </div>

      <div className='mt-36'>
        <IndexButtons />
      </div>
      
      {/* Testimonials */}
      <div className="flex flex-col items-center">
        <div className="flex mt-36 justify-center text-center">
          <h3 className="font-bold text-6xl">Students love using Little Ram Pantries</h3>
        </div>
        <TestimonialGrid testimonials={testimonials} />
      </div>

      <div className='mt-32'>
        <IndexButtons />
      </div>

      {/* Additional Information */}
      <div className="flex flex-col items-center mt-32 gap-y-12 justify-center text-center">
        <h3 className="font-bold text-6xl">Built for students</h3>
        <p className='text-lg max-w-prose'>
          Little Ram Pantries is a dedicated initiative aimed at combating food insecurity among VCU students. By clicking the "View The Pantries" button, you can explore the various pantry locations around the VCU campus and see real-time updates of their contents. Our pantries are stocked with a variety of snacks, canned goods, and essential hygiene products, ensuring that no student has to go without.
        </p>
        <p className='text-lg max-w-prose'>
          This project leverages cutting-edge technology; researchers use the images captured within the pantries to track and understand the patterns of food insecurity on campus. Additionally, a built-in AI algorithm analyzes these images before they are displayed on the site, providing valuable insights and helping us keep the pantries well-stocked. This proactive approach not only aids in managing the pantries more efficiently but also plays a crucial role in our ongoing efforts to address and mitigate food insecurity within the student community.
        </p>
        <img
          src={percentVisual}
          alt='35% of 100 visualized'
        />
        <p className='text-lg max-w-prose'>
          According to our research, over 35% of the VCU student body faces some form of food insecurity, highlighting a significant and often overlooked issue within our academic community. This staggering statistic underscores the critical need for accessible food resources on campus. Food insecurity can lead to detrimental effects on students' academic performance, mental health, and overall well-being. By addressing this issue head-on, initiatives like the Little Ram Pantries not only provide essential nourishment but also support students in achieving their educational goals and maintaining a healthier, more balanced lifestyle. (4, 5)
        </p>
      </div>

      <div className="flex flex-col items-center mt-32 gap-y-16 justify-center text-center">
        <h3 className="font-bold text-6xl">Ran by volunteers</h3>
        <h4 className='text-xl'>We rely on and are endlessly thankful for the volunteers who help keep the Pantries stocked</h4> 
      </div>

      <div className="flex flex-col items-center mt-36 gap-y-16 justify-center text-center">
        <h3 className="font-bold text-6xl">Supported by the community</h3>
        <div className="flex justify-center p-8 gap-16 flex-wrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-40 w-40 object-contain"
            />
          ))}
        </div>
      </div>

  </>
  );
}

export default LandingPage;
