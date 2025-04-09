export const content = {
  siteInfo: {
    title: "Dave Melkonian",
    subtitle: "Digital Experience Designer",
    description: "Dave Melkonian  |  Digital Professional",
    scrollText: "Scroll to explore",
  },

  navigation: {
    menuAriaLabels: {
      open: "Open menu",
      close: "Close menu",
    },
    links: [
      { id: "work", text: "Work" },
      { id: "current-projects", text: "Current Projects" },
      { id: "testimonials", text: "Testimonials" },
      { id: "career", text: "Career" },
      { id: "design-system", text: "Design System" },
    ],
    social: {
      linkedin: {
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/davemelk/",
      },
      dribbble: {
        text: "Dribbble",
        url: "https://dribbble.com/davemelk100",
      },
    },
  },

  work: {
    title: "Selected Work",
    projects: [
      {
        title: "Mushroom Tour Cards",
        description: "Card design for a mushroom tour app.",
        image: "/img/shroom-cards.png",
        alt: "Card design for a mushroom tour app.",
        categories: "Mobile App, UI/UX Design, Photography",
      },
      {
        title: "Hex Code Pop Art",
        categories: "Graphic Design, CSS",
        image:
          "https://cdn.dribbble.com/userupload/42714493/file/original-c195fc10c35f0cdfae246c54e244e472.png?resize=1024x494&vertical=center",
        alt: "Hex Code Pop Art",
      },
      {
        title: "Podcast Logo",
        categories: "Branding, Logo Design",
        image:
          "https://cdn.dribbble.com/userupload/17831184/file/original-58f76528d319cca00f6fd3d5579a02f8.png?resize=1600x1173&vertical=center",
        alt: "Podcast Logo",
      },
      {
        title: "Vintage Contact Form",
        categories: "UI Design, Graphic Design",
        image:
          "https://cdn.dribbble.com/userupload/31524484/file/original-d64db8a660e52bc317659dd5968e4a43.jpg?resize=1905x901&vertical=center",
        alt: "Vintage Contact Form",
      },
      {
        title: "Custom Iconography",
        categories: "UI Design, Iconography",
        image:
          "https://cdn.dribbble.com/userupload/4492872/file/original-4528bbe53b68a12baa096844b5e7615b.png?resize=1500x1200&vertical=center",
        alt: "Custom Iconography",
      },
      {
        title: "Mobile App Design",
        categories: "UI/UX Design, Mobile",
        image:
          "https://cdn.dribbble.com/userupload/4492918/file/original-79c96b613cd96c876349064f868b72bc.png?resize=950x885&vertical=center",
        alt: "Mobile App Design",
      },
      {
        title: "Use Case",
        categories: "UX Design, Documentation",
        image:
          "https://cdn.dribbble.com/userupload/4492832/file/original-792939a527da43ac1873b0d0e5efad6b.png?resize=1600x649&vertical=center",
        alt: "Use Case",
      },
    ],
  },

  testimonials: {
    title: "What People Say",
    items: [
      {
        quote:
          "Dave's expertise spans usability, accessibility, and Agile methodologies, making him a seamless and proactive contributor within cross-functional teams and an effective collaborator with leadership. His unique blend of design and technical skills allows him to create visually engaging, user-friendly experiences that meet and often exceed client expectations.",
        author: "Brian Singer",
        role: "CTO/CIO, Angels of Care Pediatric Home Health",
      },
      {
        quote:
          "Dave and I worked on several projects together during our time at Propio, and in every case Dave produced creative, high quality, and well thought out prototypes and solutions to the UI/UX problems at hand, regularly surprising and impressing the teams and users with whom he was working...",
        author: "Jud Cole",
        role: "Vice President and Executive Technology Professional",
      },
      {
        quote:
          "Dave is one of the best design and user experience professionals I have worked with. He takes a pragmatic and user focused approach to design, ensuring the linkage between an idea and the resulting experience are complementary and consistent. He is approachable and mature, while also being very creative. While at we were both at Dewpoint we worked on multiple shared client engagements, and I always looked forward to having Dave on the team.",
        author: "Christopher Weiss",
        role: "Chief Technology Officer at Powerley",
      },
      {
        quote:
          "Dave and I teamed up on a 3D imaging software project, and he really brought his A-game. He pulled together an awesome plan with everything from user research and detailed workflows to testing plans, wireframes, and full graphic comps. He was extremely efficient, detail oriented, and made sure we had every design artifact ready for the dev team. Working with him was a pleasure, start to finish!",
        author: "Sam Sesti",
        role: "CEO at Cloudlab",
      },
    ],
  },

  career: {
    title: "Career Journey",
    positions: [
      {
        title: "Senior Product Designer",
        company: "Powerley",
        period: "January 2025 - Present",
        description:
          "Leading design system initiatives and dashboard redesigns. Creating engaging user experiences through thoughtful onboarding flows and real-time interactions.",
      },
      {
        title: "Principal UX Designer",
        company: "Propio Language Services",
        period: "July 2023 - November 2024",
        description:
          "Improved video call accessibility to 98% and developed live transcription features. Created design systems and led EHR integration projects with comprehensive documentation.",
      },
      {
        title: "Senior UX Designer",
        company: "Dewpoint",
        period: "May 2016 – July 2023",
        description:
          "Led UX strategy for 3D software, established accessibility standards, and built component libraries. Managed Agile teams and developed iterative design methodologies.",
      },
      {
        title: "Manager of Application Delivery",
        company: "Meridian Health Plan",
        period: "June 2015 – May 2016",
        description:
          "Managed a web team of 20 across numerous project tracks. Built a user experience discipline and implemented Agile Scrum framework. Created strategy for user experience and interface design while providing strategic direction for mobile and web development.",
      },
      {
        title: "Software Development Manager",
        company: "Optum / United Healthcare Group (UHG)",
        period: "October 2011 – June 2015",
        description:
          "Led Federal Exchange (HealthCare.gov) UI/UX assessment and accessibility initiatives. Managed global team of 30 across multiple locations including Manila, New Delhi, and Hyderabad. Created responsive design framework using HTML/CSS/AngularJS and implemented Adobe Experience Manager CMS solutions.",
      },
    ],
  },
} as const;
