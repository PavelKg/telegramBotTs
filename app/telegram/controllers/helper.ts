const descr = `
<code>Weeks: ${Math.round(Math.random() * 10 + 5)}</code>

<b>Teachers: Mark Twain, Albert Einstein</b>

<i>An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise.
Emphasis on financially-savvy leadership skills. 
Description of practices today and analysis of prospects for the future. 
Introduction to risk management and behavioral finance principles to understand the real-world functioning of securities, insurance, and banking industries. 
The ultimate goal of this course is using such industries effectively and towards a better society.</i>`

interface Modules {
  type: string
  title: string
  value: string
  rate: number
}

interface Sections {
  name: string
  modules?: Array<Modules>
}

interface CoursesTypeItem {
  title: string
  description: string
  sections?: Array<Sections>
}

interface CoursesType {
  list: Array<CoursesTypeItem>
}

export interface Courses {
  available_courses: CoursesType
  finished_courses: CoursesType
  current_courses: CoursesType
}

export const courses: Courses = {
  available_courses: {
    list: [
      {title: 'Financical Market', description: descr},
      {title: 'The Strategy of Content Marketing', description: descr},
      {title: 'Introduction to Psychology', description: descr}
    ]
  },
  finished_courses: {
    list: [
      {
        title: 'English Language',
        description: descr,
        sections: [
          {
            name: 'Week1',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/eng_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/eng_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          },
          {
            name: 'Week2',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/eng_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/eng_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          },
          {
            name: 'Week3',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/eng_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/eng_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          },
          {
            name: 'Week4',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/eng_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/eng_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          }
        ]
      },
      {
        title: 'Russian Language',
        description: descr,
        sections: [
          {
            name: 'Week1',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/ru_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/ru_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          },
          {
            name: 'Week2',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/ru_abc.m3u8',
                rate: 100
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/ru_abc.pdf',
                rate: 100
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 100}
            ]
          }
        ]
      }
    ]
  },
  current_courses: {
    list: [
      {
        title: 'Machine Learning',
        description: descr,
        sections: [
          {
            name: 'Week1',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 100},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/deep_learning.m3u8',
                rate: 20
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/deep_learning.pdf',
                rate: 0
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 0}
            ]
          },
          {
            name: 'Week2',
            modules: [
              {type: 'text', title: 'Intro', value: 'Introduction', rate: 0},
              {
                type: 'video',
                title: 'ABC',
                value: 'https://video.pepex.kg/nn.m3u8',
                rate: 0
              },
              {
                type: 'doc',
                title: 'Tenses',
                value: 'https://video.pepex.kg/nn.pdf',
                rate: 0
              },
              {type: 'test', title: 'Exam', value: 'quiz', rate: 0}
            ]
          }
        ]
      },
      {title: 'Mathematics', description: descr}
    ]
  }
}
