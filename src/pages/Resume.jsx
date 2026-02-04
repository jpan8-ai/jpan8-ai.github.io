import { motion } from 'framer-motion'
import './Resume.css'

export default function Resume() {
  const experience = [
    {
      role: 'Staff Software Developer',
      company: 'RTX',
      period: 'Apr 2023 - Present',
      description: 'Led development of web applications using ReactJS and .NET, ensuring seamless user experience. Collaborated with AI team to integrate AI and AWS technologies into frontend applications. Developed REST API backend to support frontend applications and supported legacy web apps created with ASP.NET.',
    },
    {
      role: 'Principal Software Developer',
      company: 'Collins Aerospace',
      period: 'Nov 2019 - Apr 2023',
      description: 'Gathered software requirements and designed solutions for web and desktop applications using ASP.NET, SQL Server/Oracle databases, and .NET frameworks. Developed features in C#, C++, VB, JavaScript, and Java, while managing CI/CD pipelines with Jenkins and Azure DevOps.',
    },
    {
      role: 'Staff Software Engineer',
      company: 'UTC Aerospace Systems',
      period: 'Mar 2016 - Nov 2019',
      description: 'Guided team direction and decision-making for Windows and Mobile applications using .NET technologies. Developed web apps, WCF services, desktop apps, and UWP apps with C#, C++, and VB. Worked on Embedded software development with TI OMAP RTOS and Microsemi SmartFusion 2SOC FPGA board.',
    },
    {
      role: 'Senior Software Engineer',
      company: 'UTC Aerospace Systems',
      period: 'Jul 2012 - Mar 2016',
      description: 'Led small projects and mentored junior engineers. Explored new technologies and experimented with innovative approaches. Developed skills in project management, leadership, and technical expertise.',
    },
    {
      role: 'Software Engineer',
      company: 'Goodrich',
      period: 'Aug 2008 - Jul 2012',
      description: 'Collaborated with military and commercial customers to design, implement, and test updates to data analytics desktop applications for aircraft health data analysis. Utilized .NET technologies (C#, C++ .NET, VB.NET), Oracle, SQL Server, MySQL.',
    },
    {
      role: 'Support Analyst',
      company: 'EQ2, LLC',
      period: 'Aug 2008',
      description: 'Supported inventory reporting services for hospital equipment management using Microsoft Reporting Service and Crystal Reports. Collaborated with team members to troubleshoot and resolve technical issues.',
    },
  ]

  const education = [
    {
      degree: 'Master of Science - Computer Science',
      school: 'Johns Hopkins University',
      year: '2018',
    },
    {
      degree: 'Bachelor of Science - Computer Science',
      school: 'University of Vermont',
      year: '2007',
      minor: 'Minor in Applied Mathematics',
    },
  ]

  const skills = [
    { category: 'Web Development', items: ['ReactJS', 'HTML/CSS', 'Bootstrap', 'JavaScript', 'Node.js', 'C#', 'ASP.NET', 'WebAPI', 'WCF'] },
    { category: 'Desktop/Mobile', items: ['C#', 'C++', 'Java', 'VB.NET', 'WPF', 'UWP', 'Android'] },
    { category: 'Database', items: ['Oracle', 'SQL Server'] },
    { category: 'Tools & Platforms', items: ['Git', 'Jenkins', 'AWS', 'Docker', 'Azure DevOps', 'VMWare', 'Agile', 'SVN'] },
  ]

  return (
    <motion.main 
      className="resume page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Resume</h1>

      <section className="resume-section">
        <h2 className="subsection-title">Experience</h2>
        <div className="timeline">
          {experience.map((job, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content card-hover">
                <span className="timeline-period">{job.period}</span>
                <h3 className="timeline-role">{job.role}</h3>
                <p className="timeline-company">{job.company}</p>
                <p className="timeline-description">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2 className="subsection-title">Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card card-hover">
              <span className="edu-year">{edu.year}</span>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-school">{edu.school}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2 className="subsection-title">Skills</h2>
        <div className="skills-sections">
          {skills.map((skill, index) => (
            <div key={index} className="skill-category">
              <h3 className="skill-category-title">{skill.category}</h3>
              <div className="skill-tags">
                {skill.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="resume-actions">
        <a href="/resume.pdf" className="btn btn-primary" download>
          Download PDF
        </a>
      </div>
    </motion.main>
  )
}
