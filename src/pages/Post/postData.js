const postData = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    category: "Technology",
    writer: "someone",
    subcategory: "Programming",
    body: "In this post, we explore the basics of React Hooks and how they can simplify In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fu In this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fuIn this post, we explore the basics of React Hooks and how they can simplify state management in fu state management in functional components. We cover useState, useEffect, and custom hooks.",
    views: 32,
    writer: "someone special",
    comments: [
      {
        userId: "user4",
        comment: "Great introduction! Looking forward to more advanced topics.",
        reply: [
          {
            userid: "user5",
            userName: "Admin",
            avatar: "avatar_url",
            replytext: "Thank you! We'll cover more advanced hooks in the next post."
          }
        ]
      },
      {
        userId: "user6",
        comment: "This helped me understand useEffect better. Thanks!",
        reply: []
      }
    ]
  },
  {
    id: 2,
    title: "Second Post",
    subTitle: "Exploring GraphQL with Apollo Client",
    category: "Technology",
    subcategory: "Web Development",
    body: "Learn how to integrate GraphQL with Apollo Client in your React applications. We cover queries, mutations, caching, and more.",
    views: 18,
    writer: "someone",
  
    comments: [
      {
        userId: "user9",
        comment: "Does Apollo Client support subscriptions?",
        reply: [
          {
            userid: "user10",
            userName: "Moderator",
            avatar: "avatar_url",
            replytext: "Yes, Apollo Client supports subscriptions for real-time data updates."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Third Post",
    subTitle: "Modern JavaScript: ES6 and Beyond",
    category: "Technology",
    subcategory: "JavaScript",
    body: "Explore the latest features of ECMAScript 6 (ES6) and newer JavaScript versions. We cover arrow functions, template literals, destructuring, and more.",
    views: 25,
    writer: "someone special",
    comments: [
      {
        userId: "user13",
        comment: "This post helped me understand destructuring better.",
        reply: []
      }
    ]
  },
  {
    id: 4,
    title: "Fourth Post",
    subTitle: "Getting Started with Node.js and Express",
    category: "Technology",
    subcategory: "Backend Development",
    body: "Learn how to build web applications using Node.js and Express. We cover routing, middleware, database integration, and more.",
    views: 20,
    writer: "someone special",
    comments: [
      {
        userId: "user16",
        comment: "Node.js is awesome for backend development!",
        reply: []
      }
    ]
  },
  {
    id: 5,
    title: "Fifth Post",
    subTitle: "Introduction to Data Structures and Algorithms",
    category: "Computer Science",
    subcategory: "Data Structures",
    body: "Explore fundamental data structures such as arrays, linked lists, stacks, queues, and their algorithms. Learn how to analyze algorithm complexity.",
    views: 15,
    writer: "someone special",
    comments: [
      {
        userId: "user19",
        comment: "Great introduction to data structures!",
        reply: []
      }
    ]
  },
  {
    id: 6,
    title: "Sixth Post",
    subTitle: "Deep Learning Fundamentals",
    category: "Technology",
    subcategory: "Artificial Intelligence",
    body: "Learn the basics of deep learning, neural networks, and their applications in artificial intelligence. We cover activation functions, backpropagation, and more.",
    views: 28,
    writer: "someone special",
    comments: [
      {
        userId: "user22",
        comment: "Interesting overview of deep learning techniques.",
        reply: []
      }
    ]
  },
  {
    id: 7,
    title: "Seventh Post",
    subTitle: "Introduction to Cryptocurrency",
    category: "Finance",
    subcategory: "Blockchain",
    body: "Explore the basics of cryptocurrency, blockchain technology, and how cryptocurrencies like Bitcoin and Ethereum work. Learn about mining, wallets, and security.",
    views: 23,
    writer: "someone special",
    comments: [
      {
        userId: "user25",
        comment: "Cryptocurrency is the future of finance!",
        reply: []
      }
    ]
  },
  {
    id: 8,
    title: "Eighth Post",
    subTitle: "Introduction to UX Design Principles",
    category: "Design",
    subcategory: "Blockchain",
    body: "Learn the fundamental principles of user experience (UX) design. We cover usability, accessibility, user research, and user interface (UI) design principles.",
    views: 17,
    writer: "someone special",
    comments: [
      {
        userId: "user28",
        comment: "UX design is crucial for creating user-friendly products.",
        reply: []
      }
    ]
  },
  {
    id: 9,
    title: "Ninth Post",
    subTitle: "Introduction to Climate Change",
    category: "Science",
    subcategory: "Environmental Science",
    body: "Explore the science behind climate change, its causes, impacts, and solutions. Learn about greenhouse gases, global warming, and climate policy.",
    views: 21,
    writer: "someone special",
    comments: [
      {
        userId: "user31",
        comment: "Climate change is a pressing issue that requires global action.",
        reply: []
      }
    ]
  },
  {
    id: 10,
    title: "Tenth Post",
    subTitle: "Introduction to Mobile App Development",
    category: "Technology",
    subcategory: "Mobile Development",
    body: "Learn the basics of mobile app development for iOS and Android platforms. We cover app architecture, UI/UX design for mobile, and app deployment.",
    views: 19,
    writer: "someone special",
    comments: [
      {
        userId: "user34",
        comment: "Mobile app development is exciting with the rapid growth of smartphone usage.",
        reply: []
      }
    ]
  },
  {
    id: 11,
    title: "Eleventh Post",
    subTitle: "Introduction to Machine Learning",
    category: "Technology",
    subcategory: "Machine Learning",
    body: "Explore the fundamentals of machine learning, algorithms, and applications in artificial intelligence. Learn about supervised, unsupervised, and reinforcement learning.",
    views: 22,
    writer: "someone special",
    comments: [
      {
        userId: "user37",
        comment: "Machine learning is revolutionizing various industries.",
        reply: []
      }
    ]
  },
  {
    id: 12,
    title: "Twelfth Post",
    subTitle: "Introduction to Financial Planning",
    category: "Finance",
    subcategory: "Personal Finance",
    body: "Learn the basics of financial planning, budgeting, savings, investments, and retirement planning. Understand financial goals and strategies for financial independence.",
    views: 16,
    writer: "someone special",
    comments: [
      {
        userId: "user40",
        comment: "Financial planning is essential for achieving long-term financial stability.",
        reply: []
      }
    ]
  },
  {
    id: 13,
    title: "Thirteenth Post",
    subTitle: "Introduction to Cybersecurity",
    category: "Technology",
    subcategory: "Cybersecurity",
    body: "Learn about cybersecurity threats, protection mechanisms, encryption, network security, and best practices to secure digital information and systems.",
    views: 24,

    comments: [
      {
        userId: "user43",
        comment: "Cybersecurity is crucial in the digital age to protect against cyber threats.",
        reply: []
      }
    ]
  },
  {
    id: 14,
    title: "Fourteenth Post",
    subTitle: "Introduction to Artificial Intelligence",
    category: "Technology",
    subcategory: "Artificial Intelligence",
    body: "Explore artificial intelligence (AI) concepts, algorithms, and applications in various domains. Learn about machine learning, deep learning, and AI ethics.",
    views: 27,
    writer: "someone special",
    comments: [
      {
        userId: "user46",
        comment: "Artificial intelligence has transformative potential in shaping the future.",
        reply: []
      }
    ]
  },
  {
    id: 15,
    title: "Fifteenth Post",
    subTitle: "Introduction to Cloud Computing",
    category: "Technology",
    subcategory: "Cloud Computing",
    body: "Learn about cloud computing services, deployment models, advantages, and challenges. Explore popular cloud platforms like AWS, Azure, and Google Cloud.",
    views: 26,
    writer: "someone special",
    comments: [
      {
        userId: "user49",
        comment: "Cloud computing offers scalability and flexibility for businesses.",
        reply: []
      }
    ]
  }
];

export default postData;
